-- return {
-- 	"sainnhe/gruvbox-material",
-- 	lazy = false, -- make sure we load this during startup if it is your main colorscheme
-- 	priority = 1000, -- make sure to load this before all the other start plugins
-- 	config = function()
-- 		-- Optionally configure and load the colorscheme
-- 		-- directly inside the plugin declaration.
-- 		vim.g.gruvbox_material_enable_italic = true
-- 		vim.cmd.colorscheme('gruvbox-material')
-- 	end
-- }

-- return {
-- 	"ellisonleao/gruvbox.nvim", 
-- 	priority = 1000 , 
-- 	lazy = false, 
--  	config = function()
-- 		vim.o.background = "dark" -- or "light" for light mode
-- 		vim.cmd([[colorscheme gruvbox]])
--  	end
-- }

-- return {
--   "marcelbeumer/spacedust.vim",
--   lazy = false,
--   priority = 1000,
--   config = function()
-- 	vim.cmd.colorscheme("spacedust")
--   end,
-- }

-- return {
-- 	"xero/miasma.nvim",
-- 	-- dev = true,
-- 	branch = "lua",
-- 	lazy = false,
-- 	cmd = "Miasma",
-- 	config = function()
-- 		vim.cmd.colorscheme("miasma")
-- 	end,
-- }

-- return {
-- 	"scottmckendry/cyberdream.nvim",
-- 	lazy = false,
-- 	priority = 1000,
--
-- 	config = function()
--     	vim.cmd.colorscheme("cyberdream")
-- 	end,
-- }

-- return {
-- "eldritch-theme/eldritch.nvim",
-- -- opts = {
-- lazy = false, -- make sure we load this during startup if it is your main colorscheme
-- priority = 1000, -- make sure to load this before all the other start plugins
-- config = function()
-- 	local eldritch = require("eldritch")
-- 	eldritch.setup({
-- 		transparent = false,
-- 	})
-- end,
-- -- },
-- }

return {
	{
		"rebelot/kanagawa.nvim",
		lazy = false,
		priority = 1000
	},
	{
		"catppuccin/nvim",
		lazy = false,
		priority = 1000,
	},
	{ "neanias/everforest-nvim" },
	{ "ellisonleao/gruvbox.nvim" },
	{ "rebelot/kanagawa.nvim" },
	{ 
		"tahayvr/matteblack.nvim", 
		lazy = false, 
		priority = 1000 
	},
	{ "EdenEast/nightfox.nvim" },
	{		
		"ribru17/bamboo.nvim",
		lazy = false,
		priority = 1000,
	},
	{"gthelding/monokai-pro.nvim"},
	{ "rose-pine/neovim", name = "rose-pine" },
	{
		"folke/tokyonight.nvim",
  		lazy = true,
  		opts = { style = "moon" },
	}
}
