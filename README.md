# dotfiles

## Hyprland setup

### Packages

```
sudo pacman -S \
  hyprland \
  waybar \
  foot \
  grim slurp satty hyprpicker \
  wl-clipboard wl-clip-persist \
  mako \
  hyprlock \
  jq

yay -S tofi
```

### Keybindings

| Key | Action |
|---|---|
| `Super + Return` | Terminal (foot) |
| `Super + Shift + Return` | Browser (brave) |
| `Super + Q` | Close window |
| `Super + M` | Exit Hyprland |
| `Super + P` | Screenshot (smart mode) |
| `Super + Escape` | Lock screen |
| `Super + Space` | App launcher (tofi) |
| `Super + F` | File manager (yazi) |
| `Super + T` | Toggle floating |
| `Super + Shift + F` | Fullscreen |
| `Super + H/J/K/L` | Move focus |
| `Super + Shift + H/J/K/L` | Move window |
| `Super + -` / `Super + =` | Decrease / Increase width |
| `Super + Shift + -` / `Super + Shift + =` | Decrease / Increase height |
| `Super + C` | Copy |
| `Super + V` | Paste |
| `Super + X` | Cut |
| `Super + 1-0` | Switch workspace (1-10) |
| `Super + Shift + 1-0` | Move window to workspace (1-10) |

### Screenshot modes

- `screenshot` — smart (auto-detect region/window/fullscreen)
- `screenshot region` — freehand region
- `screenshot windows` — pre-defined window rectangles
- `screenshot fullscreen` — current monitor

### Power menu

Click the ⏻ icon in Waybar or run `powermenu` for Lock/Reboot/Power Off.
