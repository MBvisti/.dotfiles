return {
	"folke/zen-mode.nvim",
	dependencies = {
		"folke/twilight.nvim",
		-- {
		-- 	"lewis6991/gitsigns.nvim",
		-- 	opts = {
		-- 		signcolumn = true,
		-- 		signs = {
		-- 			add = { text = "+" },
		-- 			change = { text = "~" },
		-- 			delete = { text = "_" },
		-- 			topdelete = { text = "‾" },
		-- 			changedelete = { text = "~" },
		-- 		}
		-- 	}
		-- },
	},
	opts = {
		window = {
			backdrop = 0.90,
			-- width = 190,
			-- width = 120,
			-- width = 100,
			-- width = 45, -- recording shorts screen
			width = .99999,
			options = {
				signcolumn = "no", -- disable signcolumn
				number = true, -- disable number column
				relativenumber = true, -- disable relative numbers
				cursorline = true, -- disable cursorline
				cursorcolumn = false, -- disable cursor column
				-- foldcolumn = "0", -- disable fold column
				-- list = false, -- disable whitespace characters
			},
		},
		plugins = {
			options = {
				enabled = true,
				laststatus = 3,
				showcmd = false,
			},
			twilight = { enabled = true },
			tmux = { enabled = false },
			gitsigns = { enabled = false },
		},
	},
}
