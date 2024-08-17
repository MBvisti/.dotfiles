return {
	"lukas-reineke/indent-blankline.nvim",
	main = "ibl",
	config = function()
		local ibl = require("ibl")

		ibl.setup({
			indent = { char = "|" },
			scope = { enabled = true },
		})
	end,
}
