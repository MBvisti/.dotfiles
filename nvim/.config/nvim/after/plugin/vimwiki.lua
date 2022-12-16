-- Vimwiki
-- vim.keymap.set('n', '<leader>cc', vim.cmd.VimwikiToggleListItem, { noremap = true, silent = true})

vim.cmd [[
    let g:vimwiki_list = [{'path': '~/vimwiki/', 'syntax': 'markdown', 'ext': '.md'}]
    au FileType vimwiki setlocal shiftwidth=6 tabstop=6 noexpandtab
]]

-- vimwiki
vim.cmd('filetype plugin on')
vim.cmd('syntax on')
-- vim.cmd('filetype plugin indent on')
