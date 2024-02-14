-- M = Alt or Option, so this means <Alt+a>
vim.keymap.set('i', "<M-CR>", "copilot#Accept('<CR>')", {
    expr = true,
    replace_keycodes = false
})

vim.keymap.set('i', "<M-]>", "<Plug>(copilot-next)")

vim.keymap.set('i', "<M-[>", "<Plug>(copilot-previous)")

vim.keymap.set('i', "<M-a>", "<Plug>(copilot-accept-word)")

vim.keymap.set('i', "<M-/>", "<Plug>(copilot-suggest)")

vim.g.copilot_no_tab_map = true
