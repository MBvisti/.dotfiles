local map = vim.api.nvim_set_keymap
local opts  = { noremap = true, silent = true }
local nnoremap = require("mbvisti.keymap").nnoremap

-- window management
nnoremap('<leader>h', ':wincmd h<CR>') -- move cursor to window left
nnoremap('<leader>j', ':wincmd j<CR>') -- move cursor to window below 
nnoremap('<leader>k', ':wincmd k<CR>') -- move cursor to window above 
nnoremap('<leader>l', ':wincmd l<CR>') -- move cursor to window right

-- netwr mappings
nnoremap('<leader>pq', '<cmd>Ex<CR>') -- move cursor to window right

-- telescope
vim.api.nvim_set_keymap('n', '<leader>fb', [[<cmd>lua require('telescope.builtin').buffers()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>ff', [[<cmd>lua require('telescope.builtin').find_files({previewer = false})<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>cb', [[<cmd>lua require('telescope.builtin').current_buffer_fuzzy_find()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fh', [[<cmd>lua require('telescope.builtin').help_tags()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>st', [[<cmd>lua require('telescope.builtin').tags()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fs', [[<cmd>lua require('telescope.builtin').grep_string()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fg', [[<cmd>lua require('telescope.builtin').live_grep()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>so', [[<cmd>lua require('telescope.builtin').tags{ only_current_buffer = true }<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>?',  [[<cmd>lua require('telescope.builtin').oldfiles()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>dt', [[<cmd>lua require('telescope.builtin').diagnostics()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>si', [[<cmd>lua require('telescope.builtin').lsp_implementations()<CR>]], { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>sr', [[<cmd>lua require('telescope.builtin').lsp_references()<CR>]], { noremap = true, silent = true })
-- code actions removed from telescope in #1866 so using built-in
vim.api.nvim_set_keymap('n', '<leader>ca', [[<cmd>lua vim.lsp.buf.code_action()<CR>]], { noremap = true, silent = true })

-- Vimwiki
vim.api.nvim_set_keymap('n', '<leader>cc', [[<Plug>VimwikiToggleListItem]], { noremap = true, silent = true})
