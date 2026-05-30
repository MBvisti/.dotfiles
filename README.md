# dotfiles

## Hyprland setup

### Packages

```
sudo pacman -S \
  hyprland \
  waybar \
  wofi \
  foot \
  grim slurp satty hyprpicker \
  wl-clipboard wl-clip-persist \
  mako \
  hyprlock \
  jq
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
| `Super + Space` | App launcher (wofi) |
| `Super + F` | File manager (yazi) |
| `Super + T` | Toggle floating |
| `Super + Shift + F` | Fullscreen |
| `Super + H/J/K/L` | Move focus |
| `Super + Shift + H/J/K/L` | Move window |
| `Super + C` | Copy |
| `Super + V` | Paste |
| `Super + X` | Cut |
| `Super + 1-5` | Switch workspace |
| `Super + Shift + 1-5` | Move window to workspace |

### Screenshot modes

- `screenshot` — smart (auto-detect region/window/fullscreen)
- `screenshot region` — freehand region
- `screenshot windows` — pre-defined window rectangles
- `screenshot fullscreen` — current monitor

### Power menu

Click the ⏻ icon in Waybar or run `powermenu` for Lock/Reboot/Power Off.
