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

## Herdr app

The `herdr-app` Stow package contains the `thelab` layout, custom search
palette, pane headers, desktop notifications, keybindings, and settings.
Shipped mods/layouts, generated type files, screenshots, and machine/session
state are intentionally not tracked.

Install Herdr, GNU Stow, the JetBrainsMono Nerd Font, and `notify-send`
(`libnotify` on Arch), with a running desktop notification service. Then:

```sh
cd ~/.dotfiles
mkdir -p ~/.config/herdr-app
stow --no-folding --target="$HOME" herdr-app
herdr-app do layout.switch '{"name":"thelab"}'
```

Back up and move aside any existing files that Stow reports as conflicts.
Do not replace the whole config directory: Herdr writes its own runtime files
there. `--no-folding` keeps those generated files out of this repository.
Machines and active sessions remain local; add remote machines on each computer.
Desktop notifications respect the system's Do Not Disturb setting.

Git and Stow both exclude Herdr's generated files. When adding a personal
layout or mod, add its name to the allowlists in `herdr-app/.gitignore` and
`herdr-app/.stow-local-ignore`. Personal themes are included automatically;
the two bundled themes are excluded.

If `~/.config/herdr-app` is already a symlink to this repository, the app
will write runtime files here despite the ignore rules. Close Herdr before
migrating that directory to a real directory. Back up its entire contents
(including ignored files), remove only the directory symlink, restore the
backup to `~/.config/herdr-app`, and move aside the tracked personal files
there before running the `stow --no-folding` command above. Keep the backup
until the app has reopened successfully. Do not delete the runtime files.

OpenCode's terminal-derived theme and hidden tab bar are configured separately
in `opencode/.config/opencode/cli.json`; install that package too for the same
appearance.

## OpenCode

Global config, agents and instructions live in `opencode/.config/opencode/`.

### Setup on a new machine

```
curl -fsSL https://opencode.ai/install | bash
mkdir -p ~/.config/opencode
cp -r opencode/.config/opencode/. ~/.config/opencode/
```

Config reloads on its own; run `/reload` in OpenCode to force it. Plugins in `opencode.jsonc` install on first start.

### What's here

| Path | Purpose |
|------|---------|
| `opencode.jsonc` | Default model, `build` override, disabled `plan`, `git push` approval, plugins |
| `AGENTS.md` | Global instructions: Conventional Commits, branch names, squash-merge |
| `agents/` | `planner`, `orchestrator`, `QA` (primary); `worker`, `reviewer`, `researcher`, `scout`, `oracle` (subagents) |
| `plugins/tmpdir/` | Sets `TMPDIR`/`GOTMPDIR` to `~/.cache/opencode/tmp` for shell commands, since `/tmp` is RAM-backed |
| `cli.json` | Terminal theme |

### Notes

- Agents need the Anthropic, OpenAI and `opencode-go` providers connected. `worker` can switch to GPT-6.1 Terra (see its comment).
- `QA.md` and `tmpdir` use `/home/mbv/.cache/opencode/tmp`. Change that path if the username differs.
- Not tracked on purpose: `service.json` (contains a password), `node_modules`, `package*.json`, the Plannotator `commands/`, and the Orca `tui.json` and plugin. Those are generated by their own installers.
