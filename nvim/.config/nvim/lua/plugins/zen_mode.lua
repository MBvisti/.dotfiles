return {
	{
	"folke/zen-mode.nvim",
	dependencies = { "folke/twilight.nvim" },
	opts = {
		window = {
			-- width = 1.0, -- recording full screen
			width = 55, -- recording shorts screen
			options = {
				signcolumn = "no", -- disable signcolumn
				-- number = false, -- disable number column
				-- relativenumber = false, -- disable relative numbers
				-- cursorline = false, -- disable cursorline
				-- cursorcolumn = false, -- disable cursor column
				-- foldcolumn = "0", -- disable fold column
				-- list = false, -- disable whitespace characters
			},
		},
		plugins = {
			twilight = { enabled = true },
			kitty = {
				enabled = true,
			},
		},
	},
}
}
