local vim = vim

--[[
============== OPTIONS ==============
--]]
local o = vim.opt
local g = vim.g

g.mapleader = " "
g.maplocalleader = " "
g.have_nerd_font = true
g.netrw_banner = 0
g.netrw_winsize = 25

o.number = true
o.relativenumber = true
o.mouse = "a"
o.showmode = false
o.clipboard = "unnamedplus"
o.breakindent = true
o.undofile = true
o.ignorecase = true
o.smartcase = true
o.signcolumn = "yes"
o.updatetime = 50
o.timeoutlen = 300
o.splitright = true
o.inccommand = "split"
o.scrolloff = 1000
o.termguicolors = true
o.undodir = os.getenv("HOME") .. "/.neovim/undodir"
o.incsearch = true
o.swapfile = false
o.backup = false
o.conceallevel = 2
o.errorbells = false
o.cursorline = false
o.tabstop = 4
o.shiftwidth = 4
o.guicursor = "a:blinkon0"
o.hlsearch = false
o.winborder = "rounded"
o.completeopt = "menu,menuone,noselect,popup"
o.shortmess:append("c")

vim.filetype.add({ extension = { templ = "templ" } })

-- vim.cmd([[
--   filetype plugin indent on
-- ]])

--[[
============== Keymaps ==============
--]]

-- local opts = { silent =true }
local map = vim.keymap.set

map("n", "[d", vim.diagnostic.goto_prev, { desc = "Go to previous [D]iagnostic message" })
map("n", "]d", vim.diagnostic.goto_next, { desc = "Go to next [D]iagnostic message" })
map("n", "<leader>e", vim.diagnostic.open_float, { desc = "Show diagnostic [E]rror messages" })
map("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })
-- Exit terminal mode in the builtin terminal with a shortcut that is a bit easier
-- for people to discover. Otherwise, you normally need to press <C-\><C-n>, which
-- is not what someone will guess without a bit more experience.
-- NOTE: This won't work in all terminal emulators/tmux/etc. Try your own mapping
-- or just use <C-\><C-n> to exit terminal mode
map("t", "<Esc><Esc>", "<C-\\><C-n>", { desc = "Exit terminal mode" })
map("n", "<M-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
map("n", "<M-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
map("n", "<M-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
map("n", "<M-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })
map("n", "<leader>pq", vim.cmd.Explore)
-- Remap for dealing with word wrap
map("n", "k", "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
map("n", "j", "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })
-- move a selection up and down
map("v", "J", ":m '>+1<CR>gv=gv")
map("v", "K", ":m '<-2<CR>gv=gv")
map("n", "<D-S-h>", "<c-w>5<")
map("n", "<D-S-l>", "<c-w>5>")
map("n", "<D-S-k>", "<c-W>+")
map("n", "<D-S-j>", "<c-W>-")
-- This is going to get me cancelled
map("i", "<C-c>", "<Esc>")
-- thank theprimeagen later
map("n", "<leader>re", "oif err != nil {<CR>}<ESC>Oreturn err")
map("n", "<leader>nn", vim.cmd.NoNeckPain, { noremap = true, silent = true, desc = "No Neck Pain" })
-- oil
map("n", "<leader>o", "<CMD>Oil<CR>", { desc = "Open parent directory" })
-- gitsigns
map("n", "<leader>gb", "<CMD>Gitsigns blame<CR>", { noremap = true, silent = true, desc = "Blaming Game" })
map("n", "<leader>bl", "<CMD>Gitsigns blame_line<CR>", { noremap = true, silent = true, desc = "Blaming Game Specific" })
map("n", "<leader>sc", "<CMD>Gitsigns show_commit<CR>", { noremap = true, silent = true, desc = "Show commit" })

local autocmd = vim.api.nvim_create_autocmd
local augroup = vim.api.nvim_create_augroup("mbvcfg", { clear = true })

autocmd("FileType", {
	desc = "Enable treesitter highlighting",
	group = augroup,
	callback = function()
		pcall(vim.treesitter.start)
	end,
})

autocmd("TextYankPost", {
	desc = "Highlight when yanking (copying) text",
	group = augroup,
	callback = function()
		vim.highlight.on_yank()
	end,
})

local function setup_lsp()
  vim.lsp.enable({
    "gopls",
    "templ",
    "emmet-language-server",
    "tailwindcss",
  })

  autocmd("LspAttach", {
	group = augroup,
    callback = function(ev)

      local bufopts = { noremap = true, silent = true, buffer = ev.buf }

      map("n", "gd", vim.lsp.buf.definition, bufopts)
      map("n", "gr", vim.lsp.buf.references, bufopts)
      map("i", "<C-k>", function()
        if vim.fn.pumvisible() == 1 then
          return "<C-e>"
        end
        vim.lsp.completion.get()
      end, { noremap = true, silent = true, buffer = ev.buf, expr = true })

      local client = assert(vim.lsp.get_client_by_id(ev.data.client_id))
      local methods = vim.lsp.protocol.Methods
      if client:supports_method(methods.textDocument_completion) then
        vim.lsp.completion.enable(true, client.id, ev.buf, { autotrigger = false })
      end

    end,
  })
end

vim.pack.add({
	-- 'https://github.com/saghen/blink.cmp',
	'https://github.com/rebelot/kanagawa.nvim',
	'https://github.com/catppuccin/nvim',
	'https://github.com/neanias/everforest-nvim',
	'https://github.com/ellisonleao/gruvbox.nvim',
	'https://github.com/sainnhe/gruvbox-material',
	'https://github.com/rebelot/kanagawa.nvim',
	'https://github.com/tahayvr/matteblack.nvim',
	'https://github.com/EdenEast/nightfox.nvim',
	'https://github.com/ribru17/bamboo.nvim',
	'https://github.com/gthelding/monokai-pro.nvim',
	'https://github.com/rose-pine/neovim',
	'https://github.com/folke/tokyonight.nvim',
	'https://github.com/projekt0n/github-nvim-theme',
	'https://github.com/xero/miasma.nvim',
	'https://github.com/stevearc/conform.nvim',
	'https://github.com/sindrets/diffview.nvim',
	'https://github.com/lewis6991/gitsigns.nvim',
	'https://github.com/ray-x/go.nvim',
	'https://github.com/neovim/nvim-lspconfig',
	'https://github.com/echasnovski/mini.nvim',
	'https://github.com/shortcuts/no-neck-pain.nvim',
	'https://github.com/stevearc/oil.nvim',
	'https://github.com/folke/snacks.nvim',
	'https://github.com/nvim-telescope/telescope.nvim',
	'https://github.com/xiyaowong/transparent.nvim',
	'https://github.com/nvim-telescope/telescope-ui-select.nvim',
	'https://github.com/nvim-lua/plenary.nvim',
  { src = "https://github.com/nvim-treesitter/nvim-treesitter", version = 'main' },
	'https://github.com/NoahTheDuke/vim-just',
})

vim.lsp.config('gopls', {
	cmd = { "gopls" },
	filetypes = { "go", "gomod" },
	root_markers = { "go.mod" },
	settings = {
		gopls = {
			buildFlags = { "-tags=unit integration e2e" },
			completeUnimported = true,
			gofumpt = true,
			staticcheck = true,
		},
	},
})

vim.lsp.config('html', {
	cmd = { "bun", "run", "vscode-html-language-server", "--stdio" },
	filetypes = { "html", "templ" }
})

vim.lsp.config('css_variables', {
	cmd = { "bun", "run", "css-variables-language-server", "--stdio" },
	filetypes = { "css" }
})

vim.lsp.config('cssls', {
	cmd = { "bun", "run", "vscode-css-language-server", "--stdio" },
	filetypes = { "css" }
})

vim.lsp.config('tailwindcss', {
	cmd = { "bun", "run", "tailwindcss-language-server", "--stdio" },
	filetypes = { "html", "templ" },
	settings = {
	  tailwindCSS = {
        classAttributes = { "class" },
        includeLanguages = {
          htmlangular = "html",
          templ = "html"
        },
	  }
	}
})

vim.lsp.config('templ', {
  cmd = { "templ", "lsp" },
  filetypes = { "templ" },
  root_markers = { "go.mod", "go.work", ".git" },
  
  handlers = {
    ["window/showMessage"] = function(err, result, ctx, config)
      -- Filter out incorrect "generated file" warnings when editing .templ files
      if result and result.message and string.match(result.message, "generated file") then
        return -- Suppress the warning
      end
      -- Pass other messages through to the default handler
      return vim.lsp.handlers["window/showMessage"](err, result, ctx, config)
    end,

    -- Also handle log messages in case the warning comes through that channel
    ["window/logMessage"] = function(err, result, ctx, config)
      if result and result.message and string.match(result.message, "generated file") then
        return -- Suppress the warning
      end
      return vim.lsp.handlers["window/logMessage"](err, result, ctx, config)
    end,
  }
})

vim.lsp.config('emmet-language-server', {
	cmd = { "bun", "run", "emmet-language-server", "--stdio"},
	filetypes = {"templ"}
})

require("go").setup({
	max_line_len = 100, -- max line length in golines format, Target maximum line length for golines
	lsp_inlay_hints = {
		enabled = false,
	},
	gofmt = "golines",
	tag_transform = "camelcase", -- can be transform option("snakecase", "camelcase", etc) check gomodifytags for details and more options
	tag_options = "",
	lsp_gofumpt = true,
	lsp_document_formatting = false,
})

require("telescope").setup({
	defaults = {
		layout_strategy = 'vertical',
		layout_config = {
			vertical = {
				mirror = false, -- This puts preview on top
				preview_height = 0.65,
				width = 0.60,
				height = 0.80,
			},
		},
	},
	extensions = {
		["ui-select"] = {
			require("telescope.themes").get_dropdown(),
		},
	},
})
-- Enable telescope extensions, if they are installed
pcall(require("telescope").load_extension, "ui-select")

-- See `:help telescope.builtin`
local builtin = require("telescope.builtin")
map("n", "<leader>ff", builtin.find_files, { desc = "[S]earch [F]iles" })
map("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
map("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })
map("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
map("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
map("n", "<leader>gc", builtin.git_bcommits, { desc = "[G]it [C]ommits" })
map("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
map("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
map("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
map("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
map("n", "<leader>/", function()
	-- You can pass additional configuration to telescope to change theme, layout, etc.
	builtin.current_buffer_fuzzy_find(require("telescope.themes").get_dropdown({
		winblend = 10,
		previewer = false,
	}))
end, { desc = "[/] Fuzzily search in current buffer" })
map("n", "<leader>s/", function()
	builtin.live_grep({
		grep_open_files = true,
		prompt_title = "Live Grep in Open Files",
	})
end, { desc = "[S]earch [/] in Open Files" })
map("n", "<leader>sn", function()
	builtin.find_files({ cwd = vim.fn.stdpath("config") })
end, { desc = "[S]earch [N]eovim files" })

-- vim.cmd.colorscheme("catppuccin-latte")
-- vim.cmd.colorscheme("catppuccin")
-- vim.cmd.colorscheme("kanagawa-dragon")
-- vim.cmd.colorscheme("kanagawa")
-- vim.cmd.colorscheme("gruvbox") -- used for course!
-- vim.cmd.colorscheme("gruvbox")
-- vim.cmd.colorscheme("gruvbox-material")
-- vim.cmd.colorscheme("everforest")
-- vim.cmd.colorscheme("rose-pine-dawn")
-- vim.cmd.colorscheme("monokai-pro")
-- vim.cmd.colorscheme("bamboo")
vim.cmd.colorscheme("nordfox")
-- Make completion popup kinds and details more visible
vim.api.nvim_set_hl(0, "PmenuKind", { link = "Type" })
vim.api.nvim_set_hl(0, "PmenuKindSel", { link = "Type" })
vim.api.nvim_set_hl(0, "PmenuExtra", { link = "Comment" })
vim.api.nvim_set_hl(0, "PmenuExtraSel", { link = "Comment" })
-- vim.cmd.colorscheme("miasma")
-- vim.cmd.colorscheme("matteblack")
-- vim.cmd.colorscheme("tokyonight")
-- vim.cmd.colorscheme("github_dark")
-- vim.cmd.colorscheme("github_dark_dimmed")
-- vim.cmd.colorscheme("github_dark_default")
setup_lsp()
