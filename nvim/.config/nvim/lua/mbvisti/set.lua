-- global settings
local global_opt = vim.opt -- setting options on the global space

global_opt.nu = true
global_opt.relativenumber = true

global_opt.spell = true
global_opt.spelllang = "en_us"
global_opt.tabstop = 4 
global_opt.softtabstop = 4
global_opt.shiftwidth = 4
global_opt.expandtab = true
global_opt.hlsearch = false
global_opt.incsearch = true

global_opt.smartindent = true

vim.wo.colorcolumn = "120" -- sets the separator bar
global_opt.wrap = false

global_opt.scrolloff = 12
global_opt.sidescrolloff = 5

global_opt.signcolumn = "auto"

global_opt.wildmenu = true
global_opt.wildmode = "longest:full,full"

global_opt.errorbells = false

global_opt.updatetime = 300
global_opt.redrawtime = 10000

global_opt.swapfile = false

global_opt.syntax = "on"

global_opt.fileencoding = "utf-8"

-- global_opt.conceallevel = 0 -- makes it so I can see everything in markdown

global_opt.mouse = "nv"

-- set leader key
vim.g.mapleader = ' '

-- netwr
vim.g.netrw_browse_split = 0
vim.g.netrw_liststyle = 3
vim.g.netrw_banner = 0
vim.g.netrw_winsize= 25

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

-- php-actor
-- vim.g.phpactorPhpBin = "/usr/local/php/bin/php"

-- git-gutter
vim.g.gitgutter_async = 0

-- ctrlp 
vim.g.ctrlp_use_catching = 0

-- set.hidden = true
-- set.hlsearch = false
-- set.laststatus = 2
-- set.colorcolumn = "90"
-- set.number = true
-- set.encoding = "utf-8"
-- set.cursorline = true
-- set.background = "dark"
-- set.title = true
-- set.makeprg = "make"
-- set.autoindent = true
-- set.completeopt = "menu,menuone,noselect"
-- set.expandtab = true
-- set.smartindent = true
-- set.mouse = "nv"
-- set.incsearch = true
-- set.splitright = true
-- set.tw = 120
-- set.smartcase = true
-- set.sidescrolloff = 5
-- set.confirm = true
-- set.termguicolors = true
-- set.undofile = true
-- -- set.undodir = "~/.vim/undodir"
-- set.updatetime = 300
-- set.redrawtime = 10000
-- -- set.backupdir = "~/.config/nvim/backup/"

-- highlight on yank
vim.cmd [[
  augroup YankHighlight
    autocmd!
    autocmd TextYankPost * silent! lua vim.highlight.on_yank()
  augroup end
]]

-- lightbulb
vim.cmd [[
    autocmd CursorHold,CursorHoldI * lua require'nvim-lightbulb'.update_lightbulb()
]]

vim.cmd [[
    let g:vimwiki_list = [{'path': '~/vimwiki/', 'syntax': 'markdown', 'ext': '.md'}]
    au FileType vimwiki setlocal shiftwidth=6 tabstop=6 noexpandtab
]]

-- vimwiki
vim.cmd('filetype plugin on')
vim.cmd('syntax on')
-- vim.cmd('filetype plugin indent on')
