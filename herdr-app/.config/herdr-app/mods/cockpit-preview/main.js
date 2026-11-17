import { View, div } from "gpui-kit";
import { h_flex } from "gpui-base";
import { checking, closeOverlay, nextCommand, props, run, theme } from "herdr";

export default class CockpitPreview extends View {
  init(_props, cx) {
    this.handle = cx.focus_handle();
    if (checking()) return;
    cx.timer.after(40, (cx) => {
      this.handle.focus();
      cx.notify();
    });
    cx.spawn(async (cx) => {
      for (;;) {
        const command = await nextCommand();
        if (command === "close") {
          this.closePreview();
        } else if (command === "focus-toggle") {
          if (this.handle.is_focused()) {
            this.handle.release();
            run("running-overview.preview-unfocus");
          } else this.handle.focus();
          cx.notify();
        }
      }
    });
  }

  closePreview() {
    closeOverlay(props().overlay);
    run("running-overview.preview-closed");
  }

  render() {
    const t = theme();
    return h_flex()
      .id("cockpit-preview-controls")
      .track_focus(this.handle)
      .on_key_down((event, cx) => {
        if (event.key !== "escape") return;
        cx.stop_propagation();
        this.closePreview();
      })
      .size_full().px(12).gap(8).items_center()
      .bg(t.surface).border_b(1).border_color(this.handle.is_focused() ? t.muted : t.border).text_size(11).text_color(t.muted)
      .child(div().flex_1().truncate().font_family("Geist Mono").child(`PREVIEW // ${props()?.terminal ?? ""}`))
      .child(div().id("cockpit-preview-close").px(8).cursor_pointer()
        .on_mouse_down("left", (_event, cx) => cx.stop_propagation())
        .hover((el) => el.bg(t.hover).text_color(t.foreground))
        .on_click(() => this.closePreview()).child("×"));
  }
}
