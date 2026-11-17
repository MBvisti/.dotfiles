// Every agent at a glance: one column per state, with the cards that need attention first.

import { View, div, image, svg } from "gpui-kit";
import { h_flex, v_flex, ScrollHandle } from "gpui-base";
import { instrumentHeader, panelGrid } from "./retro-ui.js";
import { agents, checking, closeOverlay, exec, focused, home, layout, nextCommand, openOverlay, panes, run, setShared, shared, spaces, terminals, theme } from "herdr";

const COLUMNS = [
  { key: "blocked", label: "Needs you" },
  { key: "working", label: "Working" },
  { key: "done", label: "Done" },
  { key: "idle", label: "Idle" },
];
const SORTS = [
  { id: "recent", label: "Recent" },
  { id: "az", label: "A–Z" },
];
const FILTERS = [
  { id: "all", label: "All" },
  { id: "machine", label: "Machine" },
  { id: "project", label: "Project" },
];
const STATUS_ACTION = { blocked: "needs you", working: "working", done: "finished", idle: "idle" };
const DEFAULT_ROWS = 3;
const ROW_PX = 90;
// Header rows, column heading and footer, and the activity trail.
const BASE_PX = 170;
const FOOTER_PX = 18;
const HEADER_PX = 66;
const TRAIL_PX = 22;
const HISTORY_MAX = 12;
// Run on the repo's machine; return only numstat, never file contents.
const UNTRACKED_STATS = `
root=$(git rev-parse --show-toplevel) || exit 1
cd -- "$root" || exit 1
while IFS= read -r -d '' file; do
  case "/$file" in
    */.env|*/.env.*|*/.ssh/*|*/.gnupg/*|*/credentials*|*/token*|*/secrets*|*/id_rsa*|*/id_ed25519*|*.pem|*.key|*.p12|*.pfx) continue ;;
  esac
  [ -f "$file" ] && [ ! -L "$file" ] || continue
  git --no-optional-locks diff --no-index --numstat --no-ext-diff --no-textconv -- /dev/null "$file"
done < <(git ls-files --others --exclude-standard -z)
exit 0
`;

function sortSetting() {
  return shared("thelab.overview.sort") === "az" ? "az" : "recent";
}

function filterSetting() {
  const mode = shared("thelab.overview.filter");
  return mode === "machine" || mode === "project" ? mode : "all";
}

function heightFor(rows) {
  return BASE_PX + rows * ROW_PX;
}

function rowsFor(height) {
  return Math.max(0, Math.floor((height - BASE_PX + 8) / ROW_PX));
}

function observedAge(since) {
  const minutes = Math.max(0, Math.floor((Date.now() - since) / 60000));
  if (minutes < 1) return "<1m observed";
  if (minutes < 60) return `${minutes}m observed`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h observed`;
  return `${Math.floor(minutes / 1440)}d observed`;
}

function trailAge(since) {
  const minutes = Math.max(0, Math.floor((Date.now() - since) / 60000));
  if (minutes < 1) return "<1m";
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
  return `${Math.floor(minutes / 1440)}d`;
}

function shortPath(path) {
  const at = home();
  if (!at || !path) return path || "";
  if (path === at) return "~";
  if (path.startsWith(`${at}/`) || path.startsWith(`${at}\\`)) return `~${path.slice(at.length)}`;
  return path;
}

function gitContext(agent, allPanes, allSpaces, allTerminals) {
  const space = allSpaces.find((s) => s.id === agent.space);
  const cwd = allPanes.find((p) => p.terminal === agent.address)?.cwd
    || allTerminals.find((t) => t.address === agent.address)?.cwd
    || null;
  if (!cwd) return null;
  const on = space?.machine ?? (agent.address.includes("/") ? agent.address.split("/")[0] : null);
  return { cwd, on, key: JSON.stringify([on, cwd]) };
}

// The active terminal's folder when one is focused, else a live folder in the shown tab.
function activeContext(allPanes, allSpaces) {
  const space = allSpaces.find((s) => s.active) ?? null;
  const current = focused();
  const tab = space?.tabs.find((item) => item.active) ?? null;
  const pane = allPanes.find((p) => p.pane === current?.pane)
    ?? allPanes.find((p) => p.focused)
    ?? allPanes.find((p) => p.tab === tab?.id && p.terminal);
  const cwd = current?.cwd || pane?.cwd || space?.folder || (space && !space.machine ? home() : null) || null;
  const on = current?.terminal
    ? (current.terminal.includes("/") ? current.terminal.split("/")[0] : null)
    : space?.machine ?? null;
  if (!cwd) return { cwd: null, on, key: null, space };
  return { cwd, on, key: JSON.stringify([on, cwd]), space };
}

function agentMachine(agent, spaceById) {
  const space = spaceById.get(agent.space);
  if (space) return space.machine;
  return agent.address.includes("/") ? agent.address.split("/")[0] : null;
}

function machineLabel(machine) {
  return machine ?? "Local";
}

function iconFor(program, size, fallback) {
  if (!program?.icon) return null;
  return program.tint
    ? svg(program.icon).size(size).text_color(program.color ?? fallback)
    : image(program.icon).w(size).h(size);
}

// The tab's name, and the agent's own title when it adds something to it.
function titleFor(agent, tab) {
  const named = tab?.named ? tab.name : null;
  const title = (agent.title ?? "").trim();
  if (named && title && title !== named) return `${named} \u00b7 ${title}`;
  return named || title || agent.tab_name || agent.address;
}

export default class RunningOverview extends View {
  init(_props, cx) {
    this.handle = cx.focus_handle();
    this.scrolls = new Map(COLUMNS.map((column) => [column.key, ScrollHandle.new()]));
    this.height = heightFor(DEFAULT_ROWS);
    this.width = 1200;
    this.gitStats = new Map();
    this.gitRoots = new Map();
    this.gitErrors = new Set();
    this.gitBusy = false;
    this.rootRequests = new Set();
    this.positions = new Map();
    this.arriving = new Set();
    this.motionVersions = new Map();
    this.navGroups = new Map(COLUMNS.map((column) => [column.key, []]));
    this.keyboard = false;
    this.selectionActive = false;
    this.selectionFlash = false;
    this.modifierNav = false;
    this.selected = null;
    this.returnPane = null;
    this.returnTerminal = null;
    this.lastFocusedAgent = shared("thelab.overview.focused") ?? null;
    this.paneIds = new Set(panes().map((pane) => pane.pane));
    this.history = [];
    this.pulses = new Map();
    this.pulseSeq = 0;
    this.known = new Set();
    try {
      this.observed = JSON.parse(localStorage.getItem("observed") ?? "{}");
    } catch {
      this.observed = {};
    }
    if (!this.observed || typeof this.observed !== "object" || Array.isArray(this.observed)) this.observed = {};
    if (checking()) return;
    cx.timer.every(60000, (cx) => cx.notify());
    cx.timer.every(10000, (cx) => this.refreshGit(cx));
    this.refreshGit(cx);
    cx.spawn(async (cx) => {
      for (;;) {
        const command = await nextCommand();
        const direction = { left: [-1, 0], down: [0, 1], up: [0, -1], right: [1, 0] }[command];
        if (direction) {
          this.navigateAgent(...direction, cx);
          continue;
        }
        if (command === "activate") {
          this.activateSelected(cx);
          continue;
        }
        if (command === "preview-unfocus") {
          this.restoreFocus(this.previewReturn);
          cx.notify();
          continue;
        }
        if (command === "focus") {
          this.enterKeyboard(cx);
          continue;
        }
        if (command === "preview-toggle" && this.previewOverlay) {
          this.closePreview();
          cx.notify();
          continue;
        }
        if (command === "peek" || command === "preview-toggle") {
          const agent = ((this.selectionActive || (this.keyboard && this.handle.is_focused())) ? this.selectedAgent() : null)
            ?? agents().find((item) => item.focused) ?? this.selectedAgent()
            ?? agents().find((item) => item.address === this.lastFocusedAgent);
          if (agent) this.peek(agent.address);
          continue;
        }
        if (command === "preview-closed") {
          this.previewOverlay = null;
          const target = this.previewReturn;
          this.previewReturn = null;
          if (!target) continue;
          this.keyboard = Boolean(target?.keyboard);
          if (this.keyboard) this.handle.focus();
          else this.restoreFocus(target);
          cx.notify();
          continue;
        }
        if (command !== "grow" && command !== "shrink") continue;
        const rows = rowsFor(this.height);
        const target = heightFor(Math.max(0, rows + (command === "grow" ? 1 : -1)));
        run("layout.resize", {
          id: "running-overview",
          px: Math.min(784, Math.max(heightFor(1), target)),
        });
      }
    });
  }

  refreshGit(cx, includeActive = filterSetting() === "project") {
    if (this.gitBusy) return;
    if (layout()?.children?.find((node) => node.id === "running-overview")?.hidden) return;
    const allPanes = panes();
    const allSpaces = spaces();
    const allTerminals = terminals();
    const contexts = new Map();
    for (const agent of agents()) {
      const context = gitContext(agent, allPanes, allSpaces, allTerminals);
      if (context) contexts.set(context.key, context);
    }
    if (includeActive) {
      const active = activeContext(allPanes, allSpaces);
      if (active?.key) contexts.set(active.key, active);
    }
    this.gitBusy = true;
    cx.spawn(async (cx) => {
      try {
        const entries = await Promise.all([...contexts.values()].map(async ({ cwd, on, key }) => {
          let root;
          try {
            const top = await exec("git", ["rev-parse", "--show-toplevel"], { cwd, on, timeout: 8000 });
            root = top.code === 0 ? top.stdout.trim() || null
              : /not a git repository/i.test(top.stderr ?? "") ? null : undefined;
            if (!root) return [key, { root, stats: null }];
            const read = async (args) => exec("git", [
              "--no-optional-locks", "-c", "core.fsmonitor=false",
              "diff", "--numstat", "--no-ext-diff", "--no-textconv", "--no-renames", ...args,
            ], { cwd, on, timeout: 8000 });
            let results = [await read(["HEAD"])];
            // A new repository has no HEAD yet.
            if (results[0].code !== 0) results = await Promise.all([read(["--cached"]), read([])]);
            if (results.some((result) => result.code !== 0)) return [key, { root, stats: null }];
            const untracked = await exec("bash", ["-c", UNTRACKED_STATS], { cwd, on, timeout: 8000 });
            if (untracked.code !== 0) return [key, { root, stats: null }];
            results.push(untracked);
            let added = 0, deleted = 0;
            for (const result of results) {
              for (const line of result.stdout.split("\n")) {
                const match = /^(\d+)\t(\d+)\t/.exec(line);
                if (match) { added += Number(match[1]); deleted += Number(match[2]); }
              }
            }
            return [key, { root, stats: { added, deleted } }];
          } catch {
            // Stats failure must not discard a successfully discovered project.
            return [key, { root, stats: null }];
          }
        }));
        for (const [key, value] of entries) {
          if (value.root !== undefined) {
            this.gitRoots.set(key, value.root);
            this.gitErrors.delete(key);
            this.rootRequests.delete(key);
          } else {
            this.gitRoots.delete(key);
            this.gitErrors.add(key);
          }
          this.gitStats.set(key, value.stats);
        }
        cx.notify();
      } finally {
        this.gitBusy = false;
      }
    });
  }

  requestProjectRoot(cx, key) {
    if (this.rootRequests.has(key)) return;
    this.rootRequests.add(key);
    cx.timer.after(40, (cx) => {
      this.refreshGit(cx, true);
    });
  }

  setSort(id) {
    setShared("thelab.overview.sort", id);
  }

  setFilter(id, cx) {
    if (filterSetting() === id) return;
    this.selectionActive = false;
    setShared("thelab.overview.filter", id);
    if (id === "project" && !checking()) this.refreshGit(cx, true);
  }

  enterKeyboard(cx) {
    const current = focused();
    if (!this.keyboard || current?.pane) {
      const pane = current?.pane ?? panes().find((item) => item.focused)?.pane ?? null;
      this.returnPane = pane;
      this.returnTerminal = current?.terminal
        ?? panes().find((item) => item.focused)?.terminal
        ?? this.returnTerminal;
      this.selected = agents().find((agent) => agent.focused)?.address
        ?? this.lastFocusedAgent ?? this.selected;
    }
    this.keyboard = true;
    this.handle.focus();
    this.scrollSelected();
    cx.notify();
  }

  leaveKeyboard(cx) {
    const pane = this.returnPane;
    const terminal = this.returnTerminal;
    const selected = this.selectedAgent()?.address ?? null;
    this.keyboard = false;
    this.returnPane = null;
    this.returnTerminal = null;
    this.restoreFocus({ pane, terminal: terminal ?? selected });
    cx.stop_propagation();
    cx.notify();
  }

  restoreFocus(target) {
    const allPanes = panes();
    if (target?.pane && allPanes.some((pane) => pane.pane === target.pane)) {
      run("pane.focus", { pane: target.pane });
    } else if (target?.terminal && terminals().some((terminal) => terminal.address === target.terminal)) {
      run("pane.focus", { terminal: target.terminal });
    } else {
      const fallback = allPanes.find((pane) => pane.focused && pane.terminal)
        ?? allPanes.find((pane) => pane.terminal);
      if (fallback) run("pane.focus", { pane: fallback.pane });
      else this.handle.release();
    }
  }

  selectedAgent() {
    for (const column of COLUMNS) {
      const agent = (this.navGroups.get(column.key) ?? []).find((item) => item.address === this.selected);
      if (agent) return agent;
    }
    return null;
  }

  locateSelected() {
    for (let col = 0; col < COLUMNS.length; col++) {
      const items = this.navGroups.get(COLUMNS[col].key) ?? [];
      const index = items.findIndex((agent) => agent.address === this.selected);
      if (index >= 0) return { col, index };
    }
    return null;
  }

  selectAt(col, index) {
    const agent = this.navGroups.get(COLUMNS[col].key)?.[index];
    if (!agent) return;
    this.selected = agent.address;
    this.scrolls.get(COLUMNS[col].key)?.scroll_to_item(index);
  }

  scrollSelected() {
    const at = this.locateSelected();
    if (at) this.scrolls.get(COLUMNS[at.col].key)?.scroll_to_item(at.index);
  }

  moveSelection(dx, dy) {
    const at = this.locateSelected();
    if (!at) {
      for (let col = 0; col < COLUMNS.length; col++) {
        if ((this.navGroups.get(COLUMNS[col].key) ?? []).length) {
          this.selectAt(col, 0);
          return;
        }
      }
      return;
    }
    if (dy) {
      const items = this.navGroups.get(COLUMNS[at.col].key) ?? [];
      const next = at.index + dy;
      if (next >= 0 && next < items.length) this.selectAt(at.col, next);
      return;
    }
    let col = at.col + dx;
    while (col >= 0 && col < COLUMNS.length) {
      const items = this.navGroups.get(COLUMNS[col].key) ?? [];
      if (items.length) {
        this.selectAt(col, Math.min(at.index, items.length - 1));
        return;
      }
      col += dx;
    }
  }

  navigateAgent(dx, dy, cx) {
    if (!this.modifierNav) {
      const current = focused();
      this.returnPane = current?.pane;
      this.returnTerminal = current?.terminal;
      this.modifierNav = true;
      this.handle.focus();
    }
    if (!this.selectionActive || !this.selectedAgent()) {
      this.selected = agents().find((agent) => agent.focused)?.address ?? this.lastFocusedAgent;
    }
    this.selectionActive = true;
    this.keyboard = false;
    this.moveSelection(dx, dy);
    this.scrollSelected();
    this.selectionFlash = true;
    cx.notify();
  }

  endNavigation(cx) {
    if (!this.modifierNav) return;
    this.modifierNav = false;
    this.selectionFlash = false;
    this.restoreFocus({ pane: this.returnPane, terminal: this.returnTerminal });
    this.returnPane = null;
    this.returnTerminal = null;
    cx.notify();
  }

  pulseAgent(address, cx) {
    const seq = ++this.pulseSeq;
    this.pulses.set(address, { seq, active: false });
    cx.timer.after(24, (cx) => {
      if (this.pulses.get(address)?.seq !== seq) return;
      this.pulses.set(address, { seq, active: true });
      cx.notify();
    });
    cx.timer.after(224, (cx) => {
      if (this.pulses.get(address)?.seq !== seq) return;
      this.pulses.delete(address);
      cx.notify();
    });
  }

  peek(address) {
    if (!terminals().some((terminal) => terminal.address === address)) return;
    const t = theme();
    if (this.modifierNav) {
      this.modifierNav = false;
      this.selectionFlash = false;
      this.restoreFocus({ pane: this.returnPane, terminal: this.returnTerminal });
      this.returnPane = null;
      this.returnTerminal = null;
    }
    if (this.previewOverlay) closeOverlay(this.previewOverlay);
    const current = focused();
    this.previewReturn = {
      keyboard: this.keyboard && this.handle.is_focused(),
      pane: current?.pane,
      terminal: current?.terminal,
    };
    this.previewOverlay = openOverlay({
      kind: "window",
      key: "cockpit-preview",
      frame: "none",
      width: 0.8,
      height: 0.7,
      layout: {
        id: "cockpit-preview",
        type: "column",
        background: t.surface,
        border: { width: 1, color: t.border },
        children: [
          {
            id: "cockpit-preview-header",
            type: "block",
            size: { px: 34 },
            content: { mod: "cockpit-preview", props: { terminal: address } },
          },
          { id: "cockpit-preview-terminal", type: "block", content: { terminal: address } },
        ],
      },
    });
  }

  closePreview() {
    if (this.previewOverlay) closeOverlay(this.previewOverlay);
    this.previewOverlay = null;
    const target = this.previewReturn;
    this.previewReturn = null;
    if (target) this.restoreFocus(target);
  }

  activateSelected(cx) {
    const agent = this.selectedAgent();
    if (!this.selectionActive || !agent || !agents().some((item) => item.address === agent.address)) return;
    this.modifierNav = false;
    this.selectionFlash = false;
    this.selectionActive = false;
    this.keyboard = false;
    this.returnPane = null;
    this.returnTerminal = null;
    run("agent.focus", { terminal: agent.address });
    cx.notify();
  }

  key(event, cx) {
    if (this.modifierNav && event.key === "enter") {
      this.activateSelected(cx);
      cx.stop_propagation();
      return;
    }
    if (this.modifierNav && event.key === "escape") {
      this.endNavigation(cx);
      cx.stop_propagation();
      return;
    }
    if (!this.keyboard) return;
    const k = event.key;
    if (k === "escape") {
      this.leaveKeyboard(cx);
      return;
    }
    if (event.modifiers.control || event.modifiers.alt || event.modifiers.platform) return;
    if (k === "enter") {
      const agent = this.selectedAgent();
      if (agent && agents().some((item) => item.address === agent.address)) {
        this.keyboard = false;
        this.returnPane = null;
        this.returnTerminal = null;
        run("agent.focus", { terminal: agent.address });
      }
      cx.stop_propagation();
      cx.notify();
      return;
    }
    if (k === "space") {
      const agent = this.selectedAgent();
      if (agent && !event.is_held) this.peek(agent.address);
      cx.stop_propagation();
      return;
    }
    let dx = 0, dy = 0;
    if (k === "h") dx = -1;
    else if (k === "l") dx = 1;
    else if (k === "k") dy = -1;
    else if (k === "j") dy = 1;
    if (!dx && !dy) return;
    this.moveSelection(dx, dy);
    cx.stop_propagation();
    cx.notify();
  }

  render(cx) {
    const t = theme();
    let keyboardActive = this.keyboard && this.handle.is_focused();
    const rows = rowsFor(this.height);
    const sort = sortSetting();
    const filter = filterSetting();
    const now = Date.now();
    const all = agents();
    const transitions = [];
    let changed = false;
    for (const agent of all) {
      const previous = this.observed[agent.address];
      const known = this.known.has(agent.address);
      this.known.add(agent.address);
      if (previous?.status === agent.status && Number.isFinite(previous.since)) continue;
      if (known && previous && previous.status !== agent.status
        && !(previous.status === "done" && agent.status === "idle")) {
        transitions.push(agent);
        if (agent.status === "blocked" && !checking()) this.pulseAgent(agent.address, cx);
      }
      this.observed[agent.address] = { status: agent.status, since: now };
      changed = true;
    }
    if (transitions.length) {
      this.history = [
        ...transitions.map((agent) => ({
          address: agent.address,
          name: agent.program?.name ?? agent.app ?? agent.address,
          status: agent.status,
          at: now,
        })),
        ...this.history,
      ].slice(0, HISTORY_MAX);
    }
    if (changed && !checking()) localStorage.setItem("observed", JSON.stringify(this.observed));

    const allSpaces = spaces();
    const allPanes = panes();
    const allTerminals = terminals();
    const activeTab = allSpaces.find((space) => space.active)?.tabs.find((tab) => tab.active)?.id;
    const newSplit = allPanes.find((pane) => pane.tab === activeTab && pane.terminal && !this.paneIds.has(pane.pane));
    this.paneIds = new Set(allPanes.map((pane) => pane.pane));
    if (newSplit && (keyboardActive || this.previewOverlay) && !checking()) {
      this.keyboard = false;
      keyboardActive = false;
      this.returnPane = null;
      this.returnTerminal = null;
      this.previewReturn = null;
      if (this.previewOverlay) closeOverlay(this.previewOverlay);
      this.previewOverlay = null;
      cx.timer.after(0, () => run("pane.focus", { pane: newSplit.pane }));
    }
    const focusedAgent = all.find((agent) => agent.focused);
    if (focusedAgent && focusedAgent.address !== this.lastFocusedAgent) {
      this.lastFocusedAgent = focusedAgent.address;
      this.selectionActive = false;
    }
    if (!all.some((agent) => agent.address === this.lastFocusedAgent)) {
      this.lastFocusedAgent = all.find((agent) => agent.tab === activeTab)?.address ?? null;
    }
    if (!checking() && shared("thelab.overview.focused") !== this.lastFocusedAgent) {
      setShared("thelab.overview.focused", this.lastFocusedAgent);
    }
    const spaceById = new Map(allSpaces.map((s) => [s.id, s]));
    const tabById = new Map(allSpaces.flatMap((s) => s.tabs).map((tab) => [tab.id, tab]));
    const active = activeContext(allPanes, allSpaces);
    const activeSpace = active.space;
    const activeRootKnown = Boolean(active.key) && this.gitRoots.has(active.key);
    const activeRoot = activeRootKnown ? this.gitRoots.get(active.key) : undefined;
    const projectReady = filter === "project" && typeof activeRoot === "string";
    const projectFallback = filter === "project" && activeRootKnown && activeRoot === null && Boolean(activeSpace);
    const projectUnavailable = filter === "project" && !active.key;
    const projectError = filter === "project" && Boolean(active.key) && this.gitErrors.has(active.key);
    const projectLoading = filter === "project" && Boolean(active.key) && !activeRootKnown && !projectError;
    if (projectLoading && !checking()) this.requestProjectRoot(cx, active.key);

    const matches = (agent) => {
      if (filter === "machine") {
        if (!activeSpace) return false;
        return agentMachine(agent, spaceById) === (activeSpace.machine ?? null);
      }
      if (filter === "project") {
        if (projectUnavailable) return false;
        if (projectFallback) return Boolean(activeSpace) && agent.space === activeSpace.id;
        if (!projectReady) return false;
        if (agentMachine(agent, spaceById) !== (active.on ?? null)) return false;
        const context = gitContext(agent, allPanes, allSpaces, allTerminals);
        return Boolean(context) && this.gitRoots.get(context.key) === activeRoot;
      }
      return true;
    };
    const filtered = all.filter(matches);
    const groups = new Map(COLUMNS.map((c) => [c.key, []]));
    for (const agent of filtered) (groups.get(agent.status) ?? groups.get("idle")).push(agent);

    const cmp = sort === "az"
      ? (x, y) => (x.program?.name ?? "").localeCompare(y.program?.name ?? "") || x.address.localeCompare(y.address)
      : (x, y) => (y.seq ?? 0) - (x.seq ?? 0) || x.address.localeCompare(y.address);
    for (const items of groups.values()) items.sort(cmp);
    this.navGroups = groups;

    let selectedAt = this.locateSelected();
    if (keyboardActive && !selectedAt) {
      for (let col = 0; col < COLUMNS.length; col++) {
        const items = groups.get(COLUMNS[col].key) ?? [];
        if (items.length) {
          this.selected = items[0].address;
          selectedAt = { col, index: 0 };
          break;
        }
      }
    }
    if (keyboardActive && selectedAt && !checking()) {
      const target = selectedAt;
      cx.timer.after(24, () => {
        this.scrolls.get(COLUMNS[target.col].key)?.scroll_to_item(target.index);
      });
    }

    const positions = new Map();
    const moved = new Map();
    for (const [status, items] of groups) {
      items.forEach((agent, index) => {
        const position = `${status}:${index}`;
        positions.set(agent.address, position);
        if (!this.positions.has(agent.address) || this.positions.get(agent.address) === position) return;
        const version = (this.motionVersions.get(agent.address) ?? 0) + 1;
        this.motionVersions.set(agent.address, version);
        this.arriving.add(agent.address);
        moved.set(agent.address, version);
      });
    }
    this.positions = positions;
    if (moved.size && !checking()) {
      // Establish the arrival pose once; native transitions animate the settle.
      cx.timer.after(24, (cx) => {
        for (const [address, version] of moved) {
          if (this.motionVersions.get(address) === version) this.arriving.delete(address);
        }
        cx.notify();
      });
    }

    const contextLabel = (() => {
      if (filter === "all") return "";
      if (filter === "machine") {
        return activeSpace ? `MACHINE \u00b7 ${machineLabel(activeSpace.machine)}` : "MACHINE \u00b7 NO ACTIVE SPACE";
      }
      if (projectUnavailable) return "PROJECT \u00b7 NEEDS A CURRENT FOLDER";
      if (projectError) return "PROJECT \u00b7 UNAVAILABLE";
      if (projectLoading) return "PROJECT \u00b7 RESOLVING\u2026";
      if (projectFallback) return `SPACE \u00b7 ${active.on ? `${active.on}/` : ""}${activeSpace?.name ?? "current"} \u00b7 NO REPO`;
      return typeof activeRoot === "string"
        ? `PROJECT \u00b7 ${active.on ? `${active.on}:` : ""}${shortPath(activeRoot)}`
        : "PROJECT \u00b7 NO ACTIVE SPACE";
    })();
    const emptyLabel = projectError ? "Project unavailable \u00b7 retrying periodically"
      : filter === "project" && projectLoading
      ? "Resolving project\u2026"
      : filter === "project" && projectUnavailable
        ? "Project needs a current folder"
        : filter === "project" && projectFallback
          ? "No agents in this space"
          : "No agents";

    const segment = (id, label, active, onSelect) => div()
      .id(id)
      .flex_none()
      .h(22)
      .px(9)
      .rounded(0)
      .flex()
      .items_center()
      .text_size(11)
      .cursor_pointer()
      .when(active, (el) => el.bg(t.solid).text_color(t.solid_foreground))
      .when(!active, (el) => el.bg(t.raised).text_color(t.muted).hover((h) => h.bg(t.selected).text_color(t.foreground)))
      .on_click(onSelect)
      .child(label);

    const filterControl = h_flex()
      .flex_none()
      .h(26)
      .p(2)
      .gap(2)
      .rounded(0)
      .bg(t.surface)
      .border(1)
      .border_color(t.border)
      .children(FILTERS.map((f) => segment(
        `ov-filter-${f.id}`,
        f.id === "project" && projectFallback ? "Space" : f.label,
        filter === f.id,
        (_event, cx) => this.setFilter(f.id, cx),
      )));

    const sortControl = h_flex()
      .flex_none()
      .h(26)
      .p(2)
      .gap(2)
      .rounded(0)
      .bg(t.surface)
      .border(1)
      .border_color(t.border)
      .children(SORTS.map((s) => segment(
        `ov-sort-${s.id}`,
        s.label,
        sort === s.id,
        () => this.setSort(s.id),
      )));

    const card = (agent) => {
      const space = spaceById.get(agent.space);
      const tab = tabById.get(agent.tab);
      const machine = machineLabel(agentMachine(agent, spaceById));
      const name = agent.program?.name ?? agent.app ?? agent.address;
      const picture = iconFor(agent.program, 14, t.foreground);
      const context = gitContext(agent, allPanes, allSpaces, allTerminals);
      const stats = context ? this.gitStats.get(context.key) : null;
      const selected = (keyboardActive || (this.selectionActive && this.selectionFlash)) && this.selected === agent.address;
      const dimmed = Boolean(this.lastFocusedAgent) && agent.address !== this.lastFocusedAgent && !selected;
      return v_flex()
        .id(`ov-card-${agent.address}-${this.motionVersions.get(agent.address) ?? 0}`)
        .relative()
        .top(this.arriving.has(agent.address) ? 6 : 0)
        .transition("top", { duration: 140, easing: "ease-out" })
        .transition("opacity", { duration: 140, easing: "ease-out" })
        .flex_none()
        .w_full()
        .h(84)
        .px(12)
        .py(8)
        .gap(5)
        .rounded(0)
        .bg(t.raised)
        .border(1)
        .border_color(t.border)
        .opacity(this.arriving.has(agent.address) ? 0.2 : dimmed ? 0.55 : 1)
        .cursor_pointer()
        .hover((h) => h.bg(t.hover).border_color(t.input).opacity(1))
        .on_click((_event, cx) => {
          if (!agents().some((item) => item.address === agent.address)) return;
          this.selected = agent.address;
          this.selectionActive = false;
          this.keyboard = false;
          this.returnPane = null;
          this.returnTerminal = null;
          cx.notify();
          run("agent.focus", { terminal: agent.address });
        })
        .child(div()
          .id(`ov-attention-${agent.address}`)
          .absolute()
          .inset_0()
          .bg(t.blocked)
          .opacity(agent.status === "blocked" && this.pulses.get(agent.address)?.active ? 0.13 : 0)
          .transition("opacity", { duration: 180, easing: "ease-out" }))
        .child(div().absolute().left(0).top(0).bottom(0).w(3).bg(t[agent.status] ?? t.dim))
        .child(div().id(`ov-selection-${agent.address}`).absolute().inset_0()
          .border(1).border_color(t.muted).opacity(selected ? 0.7 : 0)
          .transition("opacity", { duration: 180, easing: "ease-out" }))
        .child(h_flex().flex_none().w_full().gap(6).items_center()
          .child(div()
            .flex_none()
            .size(14)
            .rounded(0)
            .flex()
            .items_center()
            .justify_center()
            .when(Boolean(picture), (el) => el.child(picture)))
          .child(div().flex_1().min_w(0).truncate().text_size(11).text_color(t.muted).child(name))
          .child(div()
            .id(`ov-peek-${agent.address}`)
            .flex_none()
            .h(15)
            .px(4)
            .border(1)
            .border_color(t.border)
            .flex()
            .items_center()
            .text_size(9)
            .text_color(t.dim)
            .cursor_pointer()
            .hover((h) => h.bg(t.hover).text_color(t.foreground))
            .on_mouse_down("left", (_event, cx) => cx.stop_propagation())
            .on_click((_event, cx) => {
              cx.stop_propagation();
              this.peek(agent.address);
            })
            .child("peek"))
          .child(div().flex_none().max_w(96).truncate().text_size(10.2).text_color(t.dim).child(agent.address)))
        .child(h_flex().flex_none().w_full().min_w(0).gap(8).items_center()
          .child(div().flex_1().min_w(0).truncate().text_size(13).text_color(t.foreground).child(titleFor(agent, tab)))
          .when(Boolean(stats?.added || stats?.deleted), (el) => el.child(
            h_flex().flex_none().gap(6).text_size(11)
              .when(Boolean(stats?.added), (row) => row.child(div().text_color(t.ansi2).child(`+${stats.added}`)))
              .when(Boolean(stats?.deleted), (row) => row.child(div().text_color(t.ansi1).child(`−${stats.deleted}`))),
          )))
        .child(h_flex().flex_none().w_full().gap(4).text_size(11).items_center()
          .child(div().flex_none().px(4).bg(t.selected).border(1).border_color(t.input).text_size(10.2).text_color(t.foreground).child(machine))
          .child(div().flex_shrink(1).min_w(0).truncate().px(4).bg(t.selected).border(1).border_color(t.input).text_size(10.2).text_color(t.foreground).child(space?.name ?? agent.space_name))
          .child(div().flex_1())
          .child(div().flex_none().text_size(10.2).text_color(t.dim).child(observedAge(this.observed[agent.address].since))));
    };

    const column = (c) => {
      const items = groups.get(c.key) ?? [];
      const hidden = Math.max(0, items.length - rows);
      return v_flex()
        .id(`ov-col-${c.key}`)
        .flex_1()
        .min_w(0)
        .h_full()
        .overflow_hidden()
        .rounded(0)
        .child(instrumentHeader({ status: c.key, label: c.label, count: items.length, t }).mb(12))
        .child(v_flex()
          .id(`ov-list-${c.key}`)
          .flex_1()
          .min_h(0)
          .gap(8)
          .overflow_y_scrollbar()
          .track_scroll(this.scrolls.get(c.key))
          .when(items.length === 0, (el) => el
            .items_center()
            .justify_center()
            .child(div().text_size(11).text_color(t.dim).child(emptyLabel)))
          .children(items.map(card)))
        .child(h_flex()
          .flex_none()
          .h(FOOTER_PX)
          .items_center()
          .when(hidden > 0, (el) => el.child(div().text_size(10).text_color(t.dim).child(`${hidden} more`))));
    };

    const activity = h_flex()
      .flex_none()
      .h(TRAIL_PX)
      .gap(12)
      .items_center()
      .border_t(1)
      .border_color(t.border)
      .child(div().flex_none().text_size(9).text_color(t.dim).child("RECENT"))
      .child(this.history.length
        ? h_flex().flex_1().min_w(0).gap(12).items_center().overflow_hidden()
          .children(this.history.slice(0, 3).map((event, index) => h_flex()
            .id(`ov-trail-${index}-${event.at}`)
            .flex_shrink(1)
            .min_w(0)
            .px(3)
            .gap(5)
            .items_center()
            .cursor_pointer()
            .hover((h) => h.bg(t.hover))
            .on_click(() => {
              if (agents().some((agent) => agent.address === event.address)) {
                this.peek(event.address);
              }
            })
            .child(div().flex_none().size(5).bg(t[event.status] ?? t.dim))
            .child(div().min_w(0).truncate().text_size(9.5).text_color(t.muted)
              .child(`${event.name} ${STATUS_ACTION[event.status] ?? event.status}`))
            .child(div().flex_none().text_size(9).text_color(t.dim).child(trailAge(event.at)))))
        : div());

    return v_flex()
      .id("overview-root")
      .track_focus(this.handle)
      .on_key_down((event, cx) => this.key(event, cx))
      .on_modifiers_changed((event, cx) => {
        if (!event.modifiers.control || !event.modifiers.shift) this.endNavigation(cx);
      })
      .on_size_change((size, cx) => {
        if (this.height !== size.height || this.width !== size.width) {
          this.height = size.height;
          this.width = size.width;
          cx.notify();
        }
      })
      .size_full()
      .relative()
      .min_h(0)
      .bg(t.chrome)
      .border(1)
      .border_color(t.border)
      .px(12)
      .text_size(13)
      .child(panelGrid({ width: this.width, height: this.height, t }))
      .child(v_flex()
        .flex_none()
        .h(HEADER_PX)
        .py(8)
        .gap(6)
        .child(h_flex()
          .flex_none()
          .h(18)
          .items_center()
          .child(div()
            .flex_none()
            .font_family("Geist Mono")
            .text_size(10.5)
            .text_color(t.muted)
            .child(`COCKPIT // ${String(filtered.length).padStart(2, "0")} UNITS ONLINE`))
          .child(div()
            .flex_1()
            .min_w(0)
            .truncate()
            .text_right()
            .text_size(9.5)
            .text_color(t.dim)
            .child(contextLabel)))
        .child(h_flex()
          .flex_none()
          .h(26)
          .gap(8)
          .items_center()
          .child(filterControl)
          .child(div().flex_1())
          .child(sortControl)))
      .child(h_flex()
        .flex_1()
        .min_h(0)
        .gap(12)
        .children(COLUMNS.map(column)))
      .when(this.history.length > 0, (el) => el.child(activity));
  }
}
