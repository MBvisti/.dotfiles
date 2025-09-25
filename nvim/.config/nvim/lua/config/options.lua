vim.g.mapleader = " "
vim.g.maplocalleader = " "

vim.g.have_nerd_font = true
vim.opt.number = true
vim.opt.relativenumber = true

vim.opt.mouse = "a"

vim.opt.showmode = false

vim.opt.clipboard = "unnamedplus"
vim.opt.breakindent = true
vim.opt.undofile = true

vim.opt.ignorecase = true
vim.opt.smartcase = true

vim.opt.signcolumn = "yes"

vim.opt.updatetime = 50

vim.opt.timeoutlen = 300

vim.opt.splitright = true

vim.opt.inccommand = "split"

vim.opt.scrolloff = 1000

vim.opt.hlsearch = true

vim.opt.termguicolors = true

vim.o.undodir = os.getenv("HOME") .. "/.neovim/undodir"

vim.o.incsearch = true

vim.o.swapfile = false
vim.o.backup = false

vim.o.conceallevel = 2

vim.o.errorbells = false

vim.o.cursorline = false

vim.g.netrw_banner = 0
vim.g.netrw_winsize = 25

vim.o.tabstop = 4
vim.o.shiftwidth = 4

vim.cmd([[
	let g:vimwiki_list = [{'path': '~/vimwiki/',
                      \ 'syntax': 'markdown', 'ext': 'md'}]
]])

vim.cmd([[
	let g:vimwiki_global_ext = 0
]])

vim.o.guicursor = "a:blinkon0"

vim.filetype.add({ extension = { templ = "templ" } })

vim.o.hlsearch = false

vim.cmd([[
  filetype plugin indent on
]])

vim.opt.completeopt = { "menu", "menuone", "noselect" }
vim.opt.shortmess:append("c")

vim.o.winborder = "solid"
