vim.g.mapleader = " "

vim.g.maplocalleader = " "

-- Set to true if you have a Nerd Font installed
vim.g.have_nerd_font = true

-- [[ Setting options ]]
-- See `:help vim.opt`
-- NOTE: You can change these options as you wish!
--  For more options, you can see `:help option-list`

-- Make line numbers default
vim.opt.number = true
-- You can also add relative line numbers, for help with jumping.
--  Experiment for yourself to see if you like it!
-- vim.opt.relativenumber = true

-- Enable mouse mode, can be useful for resizing splits for example!
vim.opt.mouse = "a"

-- Don't show the mode, since it's already in status line
vim.opt.showmode = false

-- Sync clipboard between OS and Neovim.
--  Remove this option if you want your OS clipboard to remain independent.
--  See `:help 'clipboard'`
vim.opt.clipboard = "unnamedplus"

-- Enable break indent
vim.opt.breakindent = true

-- Save undo history
vim.opt.undofile = true

-- Case-insensitive searching UNLESS \C or capital in search
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Keep signcolumn on by default
vim.opt.signcolumn = "yes"

-- Decrease update time
vim.opt.updatetime = 250

-- Decrease mapped sequence wait time
-- Displays which-key popup sooner
vim.opt.timeoutlen = 300

-- Configure how new splits should be opened
vim.opt.splitright = true

-- Sets how neovim will display certain whitespace in the editor.
--  See `:help 'list'`
--  and `:help 'listchars'`
vim.opt.list = true
vim.opt.listchars = { tab = "| ", trail = "·", nbsp = "␣" }

-- Preview substitutions live, as you type!
vim.opt.inccommand = "split"

-- Show which line your cursor is on
vim.opt.cursorline = true

-- Minimal number of screen lines to keep above and below the cursor.
vim.opt.scrolloff = 15

-- [[ Basic Keymaps ]]
--  See `:help vim.keymap.set()`

-- Set highlight on search, but clear on pressing <Esc> in normal mode
vim.opt.hlsearch = true
vim.opt.relativenumber = true

vim.o.undodir = os.getenv("HOME") .. "/.neovim/undodir"

-- TODO check if needed
vim.o.incsearch = true

vim.o.swapfile = false
vim.o.backup = false

vim.o.colorcolumn = "120" -- sets the separator bar

vim.o.errorbells = false

vim.o.cursorline = true

vim.g.netrw_banner = 0
vim.g.netrw_winsize = 25

vim.o.tabstop = 4
vim.o.shiftwidth = 4

vim.g.wiki_root = "~/wiki"
vim.cmd([[
  let g:wiki_journal_index = {
          \ 'link_text_parser': { b, d, p -> d },
          \ 'link_url_parser': { b, d, p -> 'journal/' . d }
          \}
]])

vim.o.guicursor = "a:blinkon0"

-- vim.g.copilot_no_tab_map = true

vim.filetype.add({ extension = { templ = "templ" } })

vim.o.hlsearch = false

vim.cmd([[
  filetype plugin indent on
]])
