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
  jq \
  yazi ffmpeg 7zip poppler fd ripgrep fzf zoxide resvg imagemagick \
  neovim \
  impala bluetui wiremix pamixer \
  tofi \
  brave-bin \
  starship \
  docker docker-compose lazydocker

yay -S 1password
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

### Waybar modules

Click the icons in the bar to manage system settings (omarchy-style TUIs):

| Icon | Click action | Program |
|------|-------------|---------|
| Network (WiFi/Ethernet) | Open network manager | `impala` |
| Bluetooth | Open bluetooth manager | `bluetui` |
| Sound | Open audio mixer | `wiremix` |
| Brightness | Scroll to adjust | `brightnessctl` |
| Battery | — | — |
| Clock | — | — |
| Power (⏻) | Open power menu | `tofi` (Lock/Suspend/Reboot/Shutdown/Logout) |

### Local binaries (`local-bin/`)

| Script | Purpose |
|--------|---------|
| `powermenu` | tofi-based power menu (lock, suspend, reboot, shutdown, logout) |
| `launch-tui` | Launch a TUI in foot terminal, or focus existing window |
| `launch-wifi` | Launch impala (wifi TUI) |
| `launch-bluetooth` | Launch bluetui (bluetooth TUI) |
| `launch-audio` | Launch wiremix (audio mixer TUI) |
| `wifi-menu` | Quick tofi-based wifi network picker |
| `bluetooth-menu` | Quick tofi-based bluetooth device picker |
| `screenshot` | Screenshot tool (smart / region / windows / fullscreen) |
