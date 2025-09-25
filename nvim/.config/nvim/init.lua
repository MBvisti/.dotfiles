require("config.autocmds")
require("config.options")
require("config.lsp")
require("config.keymaps")
require("util.hjkl_notifier")

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"--branch=stable",
		lazyrepo,
		lazypath,
	})
end

---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

vim.g.lazyvim_check_order = false

require("lazy").setup({
	spec = {
		-- Add LazyVim plugin with news disabled
		-- { 
		-- 	"LazyVim/LazyVim", 
		-- 	-- import = "lazyvim.plugins",
		-- 	opts = {
		-- 		news = {
		-- 			lazyvim = false,  -- Disable LazyVim news/welcome messages
		-- 			neovim = false,   -- Also disable Neovim news if desired
		-- 		},
		-- 	}
		-- },
		{ import = "plugins" },
	},
	checker = { enabled = false },
})

-- vim.cmd.colorscheme("catppuccin-latte")
-- vim.cmd.colorscheme("catppuccin")
-- vim.cmd.colorscheme("kanagawa-dragon")
-- vim.cmd.colorscheme("kanagawa")
vim.cmd.colorscheme("gruvbox")
-- vim.cmd.colorscheme("gruvbox-material")
-- vim.cmd.colorscheme("everforest")
-- Rose Pine
-- vim.cmd.colorscheme("rose-pine-dawn")
-- Ristretto
-- vim.cmd.colorscheme("monokai-pro")
-- Osaka Jade
-- vim.cmd.colorscheme("bamboo")
-- Nord
-- vim.cmd.colorscheme("nordfox")
-- vim.cmd.colorscheme("matteblack")
-- vim.cmd.colorscheme("tokyonight")
