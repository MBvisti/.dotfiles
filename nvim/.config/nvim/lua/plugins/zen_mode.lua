return {
	"folke/zen-mode.nvim",
	dependencies = { "folke/twilight.nvim" },
	opts = {
		window = {
			backdrop = 1,
			-- width = 190,
			width = 120,
			-- width = 100,
			-- width = 45, -- recording shorts screen
			options = {
				signcolumn = "yes", -- disable signcolumn
				laststatus = 0,
				number = false, -- disable number column
				relativenumber = false, -- disable relative numbers
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
			-- kitty = {
			-- 	enabled = true,
			-- 	font = "+4",
			-- },
			tmux = { enabled = true },
		},
	},
}
