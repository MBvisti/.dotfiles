// Every agent at a glance: one column per state, with the cards that need attention first.

import { View, div, image, svg } from "gpui-kit";
import { h_flex, v_flex } from "gpui-base";
import { agents, checking, exec, layout, nextCommand, panes, run, setShared, shared, spaces, theme } from "herdr";

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
const DEFAULT_ROWS = 3;
const ROW_PX = 90;
const BASE_PX = 92;
const FOOTER_PX = 18;
const WORKING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function workingIndicator(id, color) {
  return div().id(id).flex_none().w(12).h(16).text_size(13)
    .text_color(color).frames(WORKING_FRAMES, 90);
}

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

function heightFor(rows) {
  return BASE_PX + rows * ROW_PX;
}

function observedAge(since) {
  const minutes = Math.max(0, Math.floor((Date.now() - since) / 60000));
  if (minutes < 1) return "<1m observed";
  if (minutes < 60) return `${minutes}m observed`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h observed`;
  return `${Math.floor(minutes / 1440)}d observed`;
}

function gitContext(agent, allPanes, allSpaces) {
  const space = allSpaces.find((s) => s.id === agent.space);
  const cwd = allPanes.find((p) => p.terminal === agent.address)?.cwd || space?.folder;
  if (!cwd) return null;
  const on = space?.machine ?? null;
  return { cwd, on, key: JSON.stringify([on, cwd]) };
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
    this.height = heightFor(DEFAULT_ROWS);
    this.gitStats = new Map();
    this.positions = new Map();
    this.arriving = new Set();
    this.motionVersions = new Map();
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
        const delta = command === "grow" ? ROW_PX : command === "shrink" ? -ROW_PX : 0;
        if (delta) run("layout.resize", {
          id: "running-overview",
          px: Math.min(784, Math.max(154, this.height + delta)),
        });
      }
    });
  }

  refreshGit(cx) {
    if (this.gitBusy || layout()?.children?.find((node) => node.id === "running-overview")?.hidden) return;
    const allPanes = panes();
    const allSpaces = spaces();
    const contexts = new Map();
    for (const agent of agents()) {
      const context = gitContext(agent, allPanes, allSpaces);
      if (context) contexts.set(context.key, context);
    }
    this.gitBusy = true;
    cx.spawn(async (cx) => {
      try {
        const entries = await Promise.all([...contexts.values()].map(async ({ cwd, on, key }) => {
          try {
            const read = async (args) => exec("git", [
              "--no-optional-locks", "-c", "core.fsmonitor=false",
              "diff", "--numstat", "--no-ext-diff", "--no-textconv", "--no-renames", ...args,
            ], { cwd, on, timeout: 8000 });
            let results = [await read(["HEAD"])];
            // A new repository has no HEAD yet.
            if (results[0].code !== 0) results = await Promise.all([read(["--cached"]), read([])]);
            if (results.some((result) => result.code !== 0)) return [key, null];
            const untracked = await exec("bash", ["-c", UNTRACKED_STATS], { cwd, on, timeout: 8000 });
            if (untracked.code !== 0) return [key, null];
            results.push(untracked);
            let added = 0, deleted = 0;
            for (const result of results) {
              for (const line of result.stdout.split("\n")) {
                const match = /^(\d+)\t(\d+)\t/.exec(line);
                if (match) { added += Number(match[1]); deleted += Number(match[2]); }
              }
            }
            return [key, { added, deleted }];
          } catch {
            return [key, null];
          }
        }));
        this.gitStats = new Map(entries);
        cx.notify();
      } finally {
        this.gitBusy = false;
      }
    });
  }

  setSort(id) {
    setShared("thelab.overview.sort", id);
  }

  render(cx) {
    const t = theme();
    const rows = Math.max(0, Math.floor((this.height - 82) / 92));
    const sort = sortSetting();
    const all = agents();
    let changed = false;
    for (const agent of all) {
      const previous = this.observed[agent.address];
      if (previous?.status === agent.status && Number.isFinite(previous.since)) continue;
      this.observed[agent.address] = { status: agent.status, since: Date.now() };
      changed = true;
    }
    if (changed && !checking()) localStorage.setItem("observed", JSON.stringify(this.observed));
    const allSpaces = spaces();
    const allPanes = panes();
    const spaceById = new Map(allSpaces.map((s) => [s.id, s]));
    const tabById = new Map(allSpaces.flatMap((s) => s.tabs).map((tab) => [tab.id, tab]));
    const groups = new Map(COLUMNS.map((c) => [c.key, []]));
    for (const agent of all) (groups.get(agent.status) ?? groups.get("idle")).push(agent);

    const cmp = sort === "az"
      ? (x, y) => (x.program?.name ?? "").localeCompare(y.program?.name ?? "") || x.address.localeCompare(y.address)
      : (x, y) => (y.seq ?? 0) - (x.seq ?? 0) || x.address.localeCompare(y.address);
    for (const items of groups.values()) items.sort(cmp);

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

    const segment = (s) => div()
      .id(`ov-sort-${s.id}`)
      .flex_none()
      .h(22)
      .px(9)
      .rounded(0)
      .flex()
      .items_center()
      .text_size(11)
      .cursor_pointer()
      .when(sort === s.id, (el) => el.bg(t.solid).text_color(t.solid_foreground))
      .when(sort !== s.id, (el) => el.bg(t.raised).text_color(t.muted).hover((h) => h.bg(t.selected).text_color(t.foreground)))
      .on_click(() => this.setSort(s.id))
      .child(s.label);

    const sortControl = h_flex()
      .flex_none()
      .h(26)
      .p(2)
      .gap(2)
      .rounded(0)
      .bg(t.surface)
      .border(1)
      .border_color(t.border)
      .children(SORTS.map((s) => segment(s)));

    const card = (agent) => {
      const space = spaceById.get(agent.space);
      const tab = tabById.get(agent.tab);
      const machine = space?.machine
        ?? (agent.address.includes("/") ? agent.address.split("/")[0] : "Local");
      const name = agent.program?.name ?? agent.app ?? agent.address;
      const picture = iconFor(agent.program, 14, t.foreground);
      const context = gitContext(agent, allPanes, allSpaces);
      const stats = context ? this.gitStats.get(context.key) : null;
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
        .opacity(this.arriving.has(agent.address) ? 0.2 : all.some((item) => item.focused) && !agent.focused ? 0.55 : 1)
        .cursor_pointer()
        .hover((h) => h.bg(t.hover).border_color(t.input).opacity(1))
        .on_click(() => run("agent.focus", { terminal: agent.address }))
        .child(div().absolute().left(0).top(0).bottom(0).w(3).bg(t[agent.status] ?? t.dim))
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
        .child(h_flex()
          .flex_none()
          .h(24)
          .mb(8)
          .gap(6)
          .items_center()
          .child((c.key === "working" || c.key === "blocked") && items.length > 0
            ? workingIndicator(`ov-${c.key}-header`, t[c.key])
            : div().size(7).flex_none().rounded(4).bg(t[c.key] ?? t.dim))
          .child(div().flex_1().min_w(0).truncate().text_size(11).font_semibold().text_color(t.foreground).child(c.label))
          .child(div()
            .flex_none()
            .h(16)
            .px(5)
            .rounded(0)
            .bg(t.raised)
            .flex()
            .items_center()
            .text_size(10)
            .text_color(t.muted)
            .child(String(items.length))))
        .child(v_flex()
          .id(`ov-list-${c.key}`)
          .flex_1()
          .min_h(0)
          .gap(8)
          .overflow_y_scrollbar()
          .when(items.length === 0, (el) => el
            .items_center()
            .justify_center()
            .child(div().text_size(11).text_color(t.dim).child("No agents")))
          .children(items.map(card)))
        .child(h_flex()
          .flex_none()
          .h(FOOTER_PX)
          .items_center()
          .when(hidden > 0, (el) => el.child(div().text_size(10).text_color(t.dim).child(`${hidden} more`))));
    };

    return v_flex()
      .id("overview-root")
      .on_size_change((size, cx) => {
        if (this.height !== size.height) {
          this.height = size.height;
          cx.notify();
        }
      })
      .size_full()
      .min_h(0)
      .bg(t.chrome)
      .border(1)
      .border_color(t.border)
      .px(12)
      .text_size(13)
      .child(h_flex()
        .flex_none()
        .h(38)
        .gap(8)
        .items_center()
        .child(div().text_size(12.5).font_semibold().text_color(t.foreground).child("Cockpit"))
        .child(div().text_size(11).text_color(t.dim).child(`${all.length} agent${all.length === 1 ? "" : "s"}`))
        .child(div().flex_1())
        .child(sortControl))
      .child(h_flex()
        .flex_1()
        .min_h(0)
        .gap(12)
        .children(COLUMNS.map(column)));
  }
}
