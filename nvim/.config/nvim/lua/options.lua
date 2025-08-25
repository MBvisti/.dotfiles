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

vim.g.wiki_root = "~/vaults/work"
vim.cmd([[
  let g:wiki_journal_index = {
          \ 'link_text_parser': { b, d, p -> d },
          \ 'link_url_parser': { b, d, p -> 'journal/' . d }
          \}
]])

vim.o.guicursor = "a:blinkon0"

-- vim.g.copilot_no_tab_map = true

vim.filetype.add({ extension = { templ = "templ" } })
-- vim.api.nvim_create_autocmd("BufEnter",
-- 	{ pattern = "*.templ", callback = function() vim.cmd("TSBufEnable highlight") end })
-- vim.api.nvim_create_autocmd("BufEnter",
-- 	{ pattern = "*.go", callback = function() vim.cmd("TSBufEnable highlight") end })

vim.o.hlsearch = false

vim.cmd([[
  filetype plugin indent on
]])

vim.opt.completeopt = { "menu", "menuone", "noselect" }
vim.opt.shortmess:append("c")
