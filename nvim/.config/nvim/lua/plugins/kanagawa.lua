return {
	"rebelot/kanagawa.nvim",
	lazy = false,
	priority = 1000,

	config = function()
		local cd = require("kanagawa")
		cd.setup({
			transparent = true,
		})
	end,
}
