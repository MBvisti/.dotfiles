local map = vim.api.nvim_set_keymap
local opts  = { noremap = true, silent = true }

vim.g.mapleader = ' '

-- window management
map('n', '<leader>h', ':wincmd h<CR>', opts)
map('n', '<leader>j', ':wincmd j<CR>', opts)
map('n', '<leader>k', ':wincmd k<CR>', opts)
map('n', '<leader>l', ':wincmd :wincmd l<CR>', opts)

-- telescope
map('n', '<leader>ff', '<cmd>Telescope find_files<cr>', opts)
map('n', '<leader>fg', '<cmd>Telescope live_grep<cr>', opts)
map('n', '<leader>fb', '<cmd>Telescope buffers<cr>', opts)
map('n', '<leader>fh', '<cmd>Telescope help_tags<cr>', opts)

-- netwr
vim.g.netrw_browse_split = 3
vim.g.netrw_liststyle = 3
vim.g.netwr_banner = 0
vim.g.netrw_winsize= 25

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

-- lsp mappings

map('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<CR>', opts)
map('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', opts)
map('n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)
map('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)
map('n', 'sd', '<cmd>lua vim.lsp.buf.hover()<CR>', opts)
map('n', 'di', '<cmd>lua vim.diagnostic.open_float()<CR>', opts)
map('n', '<C-k>', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)
map('n', '<C-n>', '<cmd>lua vim.lsp.diagnostic.goto_prev()<CR>', opts)
map('n', '<C-p>', '<cmd>lua vim.lsp.diagnostic.goto_next()<CR>', opts)
