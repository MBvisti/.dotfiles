return {
	"folke/zen-mode.nvim",
	dependencies = { "folke/twilight.nvim" },
	opts = {
		window = {
			backdrop = 0.85,
			width = 150, -- recording full screen
			-- width = 55, -- recording shorts screen
			options = {
				signcolumn = "no", -- disable signcolumn
				laststatus = 0,
				-- number = false, -- disable number column
				-- relativenumber = false, -- disable relative numbers
				-- cursorline = false, -- disable cursorline
				-- cursorcolumn = false, -- disable cursor column
				-- foldcolumn = "0", -- disable fold column
				-- list = false, -- disable whitespace characters
			},
		},
		plugins = {
			options = {
				enabled = true,
			},
			twilight = { enabled = false },
			kitty = {
				enabled = true,
				font = "+6",
			},
		},
	},
}
