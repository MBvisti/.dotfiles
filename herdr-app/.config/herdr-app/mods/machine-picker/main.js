// Go to any tab, grouped by machine, then space. A centered dialog
// (mod.json overlay) with search across machine names, spaces, tabs and
// their agents. Every space stays visible. Type to filter, ↑/↓ and Enter
// to go, ctrl+d to close a tab, Esc to leave.

import { View, div, svg } from "gpui-kit";
import { v_flex, h_flex, InputState, Input } from "gpui-base";
import { agents, spaces, terminals, panes, run, theme, settings, props, closeOverlay, shared, setShared } from "herdr";

const MARK = { ansi6: "#22a99a", ansi3: "#e3814f", ansi4: "#5b8def", ansi5: "#8b7cf6", ansi2: "#3fae6a", ansi1: "#d9649a" };

// Space colors, kept by space id in shared "space.colors": a theme
// color name ("ansi6") or a picked #rrggbb. A space seen without one gets
// the theme color fewest spaces use, once; every mod does the same in the
// same order, so they agree, and adding or renaming spaces moves nothing.
const PROJECT_COLORS = ["ansi6", "ansi3", "ansi4", "ansi5", "ansi2", "ansi1"];
function spaceColors() {
  const ids = new Set(spaces().map((p) => p.id));
  const kept = Object.fromEntries(Object.entries(shared("space.colors") ?? {}).filter(([id]) => ids.has(id)));
  let changed = Object.keys(kept).length !== Object.keys(shared("space.colors") ?? {}).length;
  for (const p of spaces()) {
    if (kept[p.id] || p.name === "~") continue;
    const uses = (c) => Object.values(kept).filter((v) => v === c).length;
    kept[p.id] = PROJECT_COLORS.reduce((best, c) => (uses(c) < uses(best) ? c : best));
    changed = true;
  }
  if (changed) setShared("space.colors", kept);
  return kept;
}
function spaceColor(t, p) {
  if (p.name === "~") return t.dim;
  const c = spaceColors()[p.id] ?? PROJECT_COLORS[0];
  return c.startsWith("#") ? c : (MARK[c] ?? t[c]);
}

export default class Picker extends View {
  init(_props, cx) {
    this.filter = "";
    this.input = InputState.new({ placeholder: "Search machines, spaces, tabs, agents…" });
    this.input.on("change", (_e, cx) => {
      this.filter = this.input.value();
      this.at = 0;
      this.scroll = 0;
      cx.notify();
    });
    this.input.on("submit", (_e, cx) => this.go(this.pickable()[this.at], cx));
    this.input.focus();
    cx.timer.after(600, () => this.input.focus());
    this.at = null;
    this.scroll = 0;
    this.handle = cx.focus_handle();
  }

  close() {
    closeOverlay(props().overlay);
  }

  current() {
    const w = spaces().find((p) => p.active);
    const ctx = w?.tabs.find((c) => c.active);
    return { w, ctx, machine: w?.machine ?? null };
  }

  pickable() {
    return this.rows().filter((r) => r.kind !== "head" && r.kind !== "machine");
  }

  rows() {
    const f = this.filter.trim().toLowerCase();
    const all = agents();
    const ps = panes();
    const live = terminals().filter((x) => x.state === "live");
    const teamOf = (addrs) => {
      let n = 0;
      const walk = (a) => live.filter((x) => x.parent === a).forEach((k) => (n++, walk(k.address)));
      addrs.forEach(walk);
      return n;
    };
    const hit = (...parts) => !f || parts.join(" ").toLowerCase().includes(f);
    const groups = new Map();
    for (const w of spaces()) {
      const m = w.machine ?? null;
      if (!groups.has(m)) groups.set(m, []);
      groups.get(m).push(w);
    }
    const out = [];
    for (const [m, ws] of groups) {
      const label = m ?? "This computer";
      const machineHit = hit(label, m ?? "local", m ? "" : "here");
      const shown = [];
      for (const w of ws) {
        const spaceHit = machineHit || hit(label, m ?? "local", m ? "" : "here", w.name, w.folder, w.branch);
        const ctxs = w.tabs
          .map((ctx) => {
            const mine = all.filter((a) => a.tab === ctx.id);
            const cwds = ps.filter((p) => p.tab === ctx.id && p.cwd).map((p) => p.cwd);
            return { w, ctx, mine, team: teamOf(mine.map((a) => a.address)), cwds };
          })
          .filter((c) => spaceHit || hit(label, w.name, c.ctx.name,
            ...c.mine.flatMap((a) => [a.program?.name ?? "agent", a.app ?? "", a.title ?? "", a.status ?? ""]),
            c.ctx.status ?? "", ...c.cwds));
        if (!f || spaceHit || ctxs.length) shown.push({ w, ctxs });
      }
      if (!f || machineHit || shown.length) {
        out.push({ kind: "machine", machine: m, label, count: shown.length });
        for (const p of shown) {
          out.push({ kind: "head", w: p.w, shown: p.ctxs.length });
          for (const c of p.ctxs) out.push({ kind: "ctx", ...c });
        }
      }
    }
    return out;
  }

  go(r, cx) {
    if (!r) return;
    this.close();
    if (r.kind === "ctx") run("tab.select", { id: r.ctx.id });
  }

  glyph(t, st) {
    if (st === "working") return svg("mods/workspace-chrome/spinner.svg").size(12).flex_none().text_color(t.working).spin(900);
    return div().w(12).flex_none().text_color(t[st] ?? t.dim).child(st === "idle" ? "○" : st ? "●" : "·");
  }

  render() {
    const t = theme();
    const rows = this.rows();
    const current = this.current();
    const currentTabId = current.ctx?.id;
    const pickable = rows.filter((r) => r.kind !== "head" && r.kind !== "machine");
    // Opens on where you are.
    if (this.at === null) {
      const i = pickable.findIndex((r) => r.kind === "ctx" && r.ctx.id === currentTabId);
      this.at = i >= 0 ? i : 0;
    }
    this.at = Math.max(0, Math.min(this.at ?? 0, pickable.length - 1));
    const sel = pickable[this.at];
    // One continuous strip: each row (and the group title before it) at a fixed
    // y. Scrolling moves the strip only as far as it takes to keep the selected
    // row in view, so the arrows can't run the selection off the list.
    const H = { machine: 30, head: 30, new: 34, ctx: 32, space: 34 };
    const tops = [];
    let y = 0;
    rows.forEach((r) => { tops.push(y); y += H[r.kind] ?? 32; });
    const total = y;
    const height = Math.min(500, this.listHeight ?? 500);
    const fixed = total > height;
    const maxScroll = Math.max(0, total - height);
    this.scroll = Math.max(0, Math.min(this.scroll, maxScroll));
    const si = rows.indexOf(sel);
    if (si >= 0) {
      if (tops[si] < this.scroll) this.scroll = tops[si];
      if (tops[si] + (H[sel.kind] ?? 32) > this.scroll + height) this.scroll = tops[si] + (H[sel.kind] ?? 32) - height;
    }
    const place = (el, i) =>
      fixed
        ? el.absolute().left(0).right(0).top(tops[i] - this.scroll).bottom(height - (tops[i] + (H[rows[i].kind] ?? 32) - this.scroll))
        : el;
    const visible = (i) => !fixed || (tops[i] + (H[rows[i].kind] ?? 32) > this.scroll && tops[i] < this.scroll + height);
    const pill = (label, fg, bg) => div().flex_none().px(5).py(1).rounded(0).text_size(9.5).font_semibold().text_color(fg).bg(bg).child(label);
    const curMachine = current.machine ?? "This computer";

    const row = (r) => {
      if (r.kind === "machine") {
        const here = r.machine === current.machine;
        return h_flex()
          .px(10)
          .h(H.machine)
          .gap(7)
          .items_center()
          .border_t(1)
          .border_color(t.border)
          .text_size(11)
          .font_semibold()
          .text_color(t.dim)
          .child(svg(`mods/workspace-chrome/${r.machine ? "server" : "monitor"}.svg`).size(13).flex_none().text_color(t.dim))
          .child(div().truncate().child(r.label))
          .when(here, (el) => el.child(pill("Active", t.ansi2, t.raised)))
          .child(div().flex_1())
          .child(div().text_size(10).font_normal().text_color(t.dim).child(`${r.count} ${r.count === 1 ? "space" : "spaces"}`));
      }
      if (r.kind === "head") {
        const here = r.w.id === current.w?.id;
        return h_flex()
          .px(10)
          .h(H.head)
          .gap(8)
          .items_center()
          .text_size(11)
          .font_semibold()
          .text_color(here ? t.foreground : t.muted)
          .child(h_flex().size(18).rounded(0).bg(spaceColor(t, r.w)).items_center().justify_center().text_size(10.5).font_bold().text_color("#ffffff").child([...r.w.name][0]?.toUpperCase() ?? "?"))
          .child(div().truncate().child(r.w.name))
          .when(r.w.status === "blocked", (el) => el.child(div().flex_none().text_size(10.5).font_normal().text_color(t.blocked).child("needs you")))
          .when(r.w.status === "done", (el) => el.child(div().flex_none().text_size(10.5).font_normal().text_color(t.done).child("finished")))
          .child(div().flex_1())
          .child(div().text_size(10).font_normal().text_color(t.dim).child(`${r.shown} ${r.shown === 1 ? "tab" : "tabs"}`));
      }
      const on = r === sel;
      if (r.kind === "new" || r.kind === "space") {
        const label = r.kind === "new" ? "new tab" : r.machine ? `new space on ${r.machine}` : "new space";
        return h_flex()
          .id(r.kind === "new" ? "pk-new" : `pk-space-${r.machine ?? "here"}`)
          .mx(4)
          .when(r.kind === "new", (el) => el.mt(4))
          .px(10)
          .h(32)
          .items_center()
          .rounded(0)
          .gap(8)
          .text_color(t.muted)
          .cursor_pointer()
          .when(on, (el) => el.bg(t.hover))
          .hover((s) => s.bg(t.hover))
          .on_click(() => this.go(r))
          .child(div().w(12).child("+"))
          .child(label);
      }
      const who = r.mine.map((a) => a.program?.name ?? "agent").join(" · ");
      const here = r.ctx.id === currentTabId;
      return h_flex()
        .id(`pk-${r.ctx.id}`)
        .mx(4)
        .pl(34)
        .pr(10)
        .h(H.ctx)
        .rounded(0)
        .gap(9)
        .items_center()
        .cursor_pointer()
        .when(on, (el) => el.bg(t.hover))
        .hover((s) => s.bg(t.hover))
        .on_click(() => this.go(r))
        .child(this.glyph(t, r.ctx.status))
        .child(div().flex_1().truncate().text_color(t.foreground).when(here, (d) => d.font_semibold()).child(r.ctx.name))
        .when(r.ctx.settled, (el) => el.child(pill("settled", t.muted, t.raised)))
        .when(r.ctx.status === "blocked", (el) => el.child(div().text_size(11).text_color(t.blocked).child("needs you")))
        .when(r.ctx.status === "done", (el) => el.child(div().text_size(11).text_color(t.done).child("finished")))
        .child(div().text_size(11).text_color(t.dim).child(who + (r.team ? `  +${r.team}` : "")));
    };

    return v_flex()
      .id("machine-picker")
      .track_focus(this.handle)
      .w_full()
      .min_h(0)
      .p(18)
      .gap(10)
      .bg(t.popover)
      .border_1()
      .border_color(t.border)
      .text_size(13)
      .on_key_down((e, cx) => {
        const k = e.key;
        if (k === "escape") return this.close();
        if (!pickable.length) return;
        if (k === "down") this.at = (this.at + 1) % pickable.length;
        else if (k === "up") this.at = (this.at + pickable.length - 1) % pickable.length;
        else if (k === "d" && e.modifiers.control) {
          if (sel?.kind === "ctx") {
            this.close();
            run("tab.close", { id: sel.ctx.id });
          }
        } else return;
        cx.stop_propagation();
        cx.notify();
      })
      .child(h_flex().items_center().child(div().flex_1().text_size(15).font_semibold().text_color(t.foreground).child("Go to…")).child(div().id("picker-esc").px(6).py(2).rounded(0).text_size(11).text_color(t.dim).cursor_pointer().hover((s) => s.bg(t.hover).text_color(t.foreground)).on_click(() => this.close()).child("Esc")))
      .child(
        h_flex().gap(6).items_center().text_size(11).min_h(16)
          .child(svg(`mods/workspace-chrome/${current.machine ? "server" : "monitor"}.svg`).size(12).flex_none().text_color(t.muted))
          .child(div().truncate().text_color(t.muted).child(curMachine))
          .child(div().text_color(t.dim).child("›"))
          .child(div().truncate().text_color(t.muted).child(current.w?.name ?? "—"))
          .child(div().text_color(t.dim).child("›"))
          .child(div().truncate().font_semibold().text_color(t.foreground).child(current.ctx?.name ?? "—")),
      )
      .child(
        h_flex().h(36).flex_none().px(10).gap(8).items_center().rounded(0).border_1().border_color(t.accent).bg(t.background)
          .child(svg("mods/workspace-chrome/search.svg").size(15).text_color(t.dim))
          .child(Input.new(this.input).flex_1().h_full().text_size(12.8).text_color(t.foreground)),
      )
      .when(!pickable.length, (el) => el.child(div().px(10).py(16).text_color(t.muted).child("No matching tabs")))
      .child(
        v_flex()
          .id("pk-list")
          .on_size_change((size, cx) => {
            this.listHeight = size.height / settings().zoom;
            cx.notify();
          })
          .h(Math.min(500, total))
          .min_h(0)
          .mb(6)
          .when(fixed, (el) =>
            el.overflow_hidden().on_scroll_wheel((e, cx) => {
              this.scroll = Math.max(0, Math.min(this.scroll - e.delta.y, maxScroll));
              // The selection follows the wheel, so the next frame doesn't scroll back to it.
              while (this.at < pickable.length - 1 && tops[rows.indexOf(pickable[this.at])] < this.scroll) this.at++;
              while (this.at > 0 && tops[rows.indexOf(pickable[this.at])] + (H[pickable[this.at].kind] ?? 32) > this.scroll + height) this.at--;
              cx.notify();
            }))
          .children(rows.map((r, i) => (visible(i) ? place(row(r), i) : null)).filter(Boolean)),
      );
  }
}
