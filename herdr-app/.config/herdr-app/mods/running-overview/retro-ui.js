// Retro instrument details for the cockpit overview, kept apart from the live layout.

import { div } from "gpui-kit";
import { h_flex } from "gpui-base";

// The same Braille spinner the overview uses today, animated natively.
const WORKING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const STATE_LABEL = {
  blocked: "Needs you",
  working: "Working",
  done: "Done",
  idle: "Idle",
};

function whole(value) {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function indicator(status, total, t) {
  const active = total > 0;
  const accent = t[status] ?? t.dim;
  const spin = active && (status === "working" || status === "blocked");
  return div()
    .relative()
    .flex_none()
    .w(18)
    .h(22)
    .flex()
    .items_center()
    .justify_center()
    .when(status === "blocked" && active, (el) => el.child(
      // A slow, faint native pulse: a radar sweep, not a countdown or progress.
      div()
        .absolute()
        .inset_0()
        .flex()
        .items_center()
        .justify_center()
        .child(div()
          .size(18)
          .rounded(9)
          .border(1)
          .border_color(accent)
          .opacity(0.22)
          .loop("opacity", { from: 0.22, to: 0.03, period: 5200, easing: "ease-out" })),
    ))
    .child(spin
      ? div().text_size(13).text_color(accent).frames(WORKING_FRAMES, 90)
      : div().size(5).bg(accent).opacity(active ? 1 : 0.5));
}

// A 48px instrument strip: neutral rules, corner ticks, a status label,
// and the two-digit count. It carries no pointer handlers, so clicks
// pass through to the cards beneath it.
export function instrumentHeader({ status, label, count, t }) {
  const total = whole(count);
  const title = String(label || STATE_LABEL[status] || status || "").toUpperCase();
  return h_flex()
    .relative()
    .flex_none()
    .w_full()
    .h(48)
    .px(10)
    .gap(10)
    .items_center()
    .border_t(1)
    .border_b(1)
    .border_color(t.border)
    .font_family("Geist Mono")
    .child(div().absolute().left(0).top(0).w(5).h(5)
      .border_t(1).border_l(1).border_color(t.muted))
    .child(div().absolute().right(0).top(0).w(5).h(5)
      .border_t(1).border_r(1).border_color(t.muted))
    .child(indicator(status, total, t))
    .child(div().flex_1().min_w(0).truncate().text_size(11).font_medium().text_color(t.foreground).child(title))
    .child(div().flex_none().text_size(11).text_color(t.muted).child(String(total).padStart(2, "0")));
}

// A clipped, noninteractive 4px inset rule for the whole panel.
// Render it first inside a relative root so cards and text paint over it.
export function panelGrid({ width, height, t }) {
  const w = whole(width);
  const h = whole(height);
  const root = div().absolute().inset_0().overflow_hidden();
  if (w < 10 || h < 10) return root;
  const innerW = w - 8;
  const innerH = h - 8;
  return root.child(div()
    .absolute()
    .left(4)
    .top(4)
    .w(innerW)
    .h(innerH)
    .opacity(0.025)
    .child(div().absolute().inset_0().border(1).border_color(t.foreground)));
}
