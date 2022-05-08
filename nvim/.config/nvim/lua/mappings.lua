local map = vim.api.nvim_set_keymap
local opts  = { noremap = true, silent = true }

vim.g.mapleader = ' '

-- window management
map('n', '<leader>h', ':wincmd h<CR>', opts) -- move cursor to window left
map('n', '<leader>j', ':wincmd j<CR>', opts) -- move cursor to window below 
map('n', '<leader>k', ':wincmd k<CR>', opts) -- move cursor to window above 
map('n', '<leader>l', ':wincmd l<CR>', opts) -- move cursor to window right

-- telescope
vim.api.nvim_set_keymap('n', '<leader>fb', [[<cmd>lua require('telescope.builtin').buffers()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>ff', [[<cmd>lua require('telescope.builtin').find_files({previewer = false})<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>cb', [[<cmd>lua require('telescope.builtin').current_buffer_fuzzy_find()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fh', [[<cmd>lua require('telescope.builtin').help_tags()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>st', [[<cmd>lua require('telescope.builtin').tags()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fs', [[<cmd>lua require('telescope.builtin').grep_string()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fg', [[<cmd>lua require('telescope.builtin').live_grep()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>so', [[<cmd>lua require('telescope.builtin').tags{ only_current_buffer = true }<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>?', [[<cmd>lua require('telescope.builtin').oldfiles()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>dt', [[<cmd>lua require('telescope.builtin').diagnostics()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>si', [[<cmd>lua require('telescope.builtin').lsp_implementations()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>sr', [[<cmd>lua require('telescope.builtin').lsp_references()<CR>]], { noremap = true, silent = true })

-- code actions removed from telescope in #1866 so using built-in
vim.api.nvim_set_keymap('n', '<leader>ca', [[<cmd>lua vim.lsp.buf.code_action()<CR>]], { noremap = true, silent = true })

-- netwr
vim.g.netrw_browse_split = 3
vim.g.netrw_liststyle = 3
vim.g.netwr_banner = 0
vim.g.netrw_winsize= 25

-- nvim tree
-- map('n', '<leader>nt', '<cmd>NvimTreeToggle<cr>', opts)

-- ctrlp 
vim.g.ctrlp_use_catching = 0

-- vim-go
vim.g.go_diagnostics_enabled = 0
vim.g.go_metalinter_enabled = 0
vim.g.go_def_mapping_enabled = 0
vim.g.go_gopls_enabled = 1
vim.g.go_code_completion_enabled = 0
vim.g.go_doc_popup_window = 0
vim.g.go_jump_to_error = 0
vim.g.go_fmt_command = "goimports"
vim.g.go_auto_sameids = 0

-- git-gutter
vim.g.gitgutter_async = 0

-- Vimwiki
vim.api.nvim_set_keymap('n', '<leader>cc', [[<Plug>VimwikiToggleListItem]], { noremap = true, silent = true})
