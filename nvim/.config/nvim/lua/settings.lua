local set = vim.opt

-- set.noswapfile = true
-- set.nobackup = true
-- set.nowrap = true
-- set.nohlsearch = true

set.wildmode = "longest:full,full"
set.hidden = true
set.hlsearch = false
set.laststatus=2
set.wildmenu = true
set.colorcolumn = "90"
set.number = true
set.encoding = "utf-8"
set.cursorline = true
set.errorbells = false
set.background = "dark"
set.title = true
set.makeprg = "make"
set.autoindent = true
set.completeopt = "menu,menuone,noselect"
set.tabstop = 4 
set.softtabstop = 4
set.shiftwidth = 4
set.expandtab = true
set.smartindent = true
set.mouse = "nv"
set.incsearch = true
set.splitright = true
set.tw = 80
set.smartcase = true
set.fileencoding = "utf-8"
set.scrolloff = 12
set.sidescrolloff = 5
set.confirm = true
set.termguicolors = true
set.undofile = true
-- set.undodir = "~/.vim/undodir"
set.updatetime = 300
set.redrawtime = 10000
-- set.backupdir = "~/.config/nvim/backup/"
set.syntax = "on"
vim.cmd('filetype plugin indent on')
vim.cmd('filetype plugin on')
set.signcolumn = "yes:2"

-- Highlight on yank
vim.cmd [[
  augroup YankHighlight
    autocmd!
    autocmd TextYankPost * silent! lua vim.highlight.on_yank()
  augroup end
]]

vim.cmd [[
    autocmd CursorHold,CursorHoldI * lua require'nvim-lightbulb'.update_lightbulb()
]]

vim.cmd [[
    let g:vimwiki_list = [{'path': '~/vimwiki/', 'syntax': 'markdown', 'ext': '.md'}]
    au FileType vimwiki setlocal shiftwidth=6 tabstop=6 noexpandtab
]]
