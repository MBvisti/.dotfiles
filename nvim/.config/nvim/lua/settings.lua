local set = vim.opt
set.hidden = true
set.hlsearch = false
set.laststatus=2
set.wildmenu = true
set.colorcolumn = "90"
set.number = true
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
syntax=on
set.confirm = true
set.termguicolors = true
set.undofile = true
set.updatetime = 300
set.redrawtime = 10000
vim.cmd('filetype plugin indent on')
vim.cmd('filetype plugin on')
vim.cmd('set nocompatible')
set.signcolumn = "yes:2"

-- Highlight on yank
vim.cmd [[
  augroup YankHighlight
    autocmd!
    autocmd TextYankPost * silent! lua vim.highlight.on_yank()
  augroup end
]]

