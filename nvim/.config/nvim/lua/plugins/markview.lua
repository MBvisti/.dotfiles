return {
	"OXY2DEV/markview.nvim",
	lazy = false,
	dependencies = {
		"nvim-treesitter/nvim-treesitter",
		"nvim-tree/nvim-web-devicons",
	},
	config = function()
		local markview = require("markview")
		local presets = require("markview.presets")
		markview.setup({
			markdown = {
				headings = presets.headings.glow,
			}
		})

		vim.cmd("Markview Enable")
	end,
}
