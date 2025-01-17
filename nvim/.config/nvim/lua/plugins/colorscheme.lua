return {
	"sainnhe/gruvbox-material",
	lazy = false, -- make sure we load this during startup if it is your main colorscheme
	priority = 1000, -- make sure to load this before all the other start plugins
	config = function()
    	-- Optionally configure and load the colorscheme
    	-- directly inside the plugin declaration.
    	vim.g.gruvbox_material_enable_italic = true
    	vim.cmd.colorscheme('gruvbox-material')
    end
}

-- return {
	-- "scottmckendry/cyberdream.nvim",
	-- lazy = false,
	-- priority = 1000,
	--
	-- config = function()
	-- 	local cd = require("cyberdream")
	-- 	cd.setup({
	-- 		transparent = true,
	-- 		borderless_telescope = false,
	-- 	})
	-- end,
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

-- return {
	-- "rebelot/kanagawa.nvim",
	-- lazy = false,
	-- priority = 1000,
	--
	-- config = function()
	-- 	local cd = require("kanagawa")
	-- 	cd.setup({
	-- 		transparent = true,
	-- 	})
	-- end,
-- }
