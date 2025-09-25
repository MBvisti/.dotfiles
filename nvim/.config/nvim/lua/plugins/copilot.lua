return {
  "github/copilot.vim",
  config = function()
    vim.keymap.set('i', '<C-s>', '<Plug>(copilot-suggest)', { silent = true })
    vim.keymap.set('i', '<TAB>', 'copilot#Accept("<TAB>")', { silent = true, expr = true, script = true, replace_keycodes = false })
  end,
}
