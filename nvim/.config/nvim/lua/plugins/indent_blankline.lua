return {
	"lukas-reineke/indent-blankline.nvim",
	main = "ibl",
	config = function()
		local ibl = require("ibl")

		ibl.setup({
    		-- whitespace = { highlight = { "Whitespace", "NonText" } },
			-- indent = { char = "▎" },
			scope = { enabled = true },
		})
	end,
}
