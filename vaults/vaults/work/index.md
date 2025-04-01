---
id: index
aliases: []
tags: []
---

# Work index

Consider building a OSS analytics platform with Grafto but using sqlite

<!--toc:start-->
- [Work Index](#work-index)
  - [Knowledge Database](./knowledge-database/index.md)
  - [Projects](./projects/index.md)
  - [Daily Thoughts](./thoughts/index.md)
<!--toc:end-->

- https://www.za-zu.com/blog/playbook
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags#example-generating-financial-reports
- https://refactoringenglish.com/chapters/rules-for-software-tutorials/

**Not on new setup**
main screen: 189c x 50r
main screen (new): 160c x 45
main screen (new new): 161c x 47

zoom editor 9x

right screen: 41c x 50r
bottom: 230c x 9r
Increase size 2x

~(ubuntu) 25 left clicks on audio input (settings)~
(ubuntu) 30 right clicks on audio input (from zero) in settings

obs with iphone cam:
`flatpak run --filesystem=/run/usbmuxd:ro com.obsproject.Studio`

disable super "hold and release" to see overview in ubuntu
- gsettings set org.gnome.mutter overlay-key ""
- gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us')]"
- gsettings set org.gnome.desktop.input-sources xkb-options "['grp:alt_shift_toggle']"

check: [wallhaven](https://wallhaven.cc) for wallpapers

Use capital T to search tabs in browser (with vimium)!

worktree:
https://bryanenglish.io/git-worktrees/
https://github.com/ThePrimeagen/git-worktree.nvim

[Situational Awareness](https://situational-awareness.ai/)
[SSE](https://packagemain.tech/p/implementing-server-sent-events-in-go)
[CSRF/CORS](https://smagin.fyi/posts/cross-site-requests/)
[Setup Davinci Install](https://www.reddit.com/r/davinciresolve/comments/1fj02pg/davinci_resolve_19_works_on_linux_with_amd_gpu/)
[Changes to Davinci](https://www.reddit.com/r/davinciresolve/comments/1d7cr2w/optresolvebinresolve_symbol_lookup_error/)

--------------------------------------------------------
                VIM MOVES OF THE WEEK

        - `<leader>s/` | telescope_live_grep_open_files
        
                Telescope Undo
        **(i)nsert**
        - [`<cr>`] | require(`telescope-undo.actions`).yank_additions,
        - [`<S-cr>`] | require(`telescope-undo.actions`).yank_deletions,
        - [`<C-cr>`] | require(`telescope-undo.actions`).restore,
        - -- alternative defaults, for users whose terminals do questionable things with modified <cr>
        - [`<C-y>`] | require(`telescope-undo.actions`).yank_deletions,
        - [`<C-r>`] | require(`telescope-undo.actions`).restore,
        
        **(n)ormal**
        - [`y`] | require(`telescope-undo.actions`).yank_additions,
        - [`Y`] | require(`telescope-undo.actions`).yank_deletions,
        - [`u`] | require(`telescope-undo.actions`).restore,
        
                MAKING KEYWORD WORK

        - `setxkbmap -layout us`
        - `setxkbmap -option 'grp:alt_shift_toggle'`
        - `xset r rate 260 40`

--------------------------------------------------------

## Ideas
- Electricity tracker + integration
- Danish weapon licitation tracker
- Something mental health + articles
- competition/price tracker (optic)
