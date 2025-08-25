return {
	"folke/snacks.nvim",
	---@type snacks.Config
	opts = {
		-- statuscolumn = {},
		zen = {
			window = {
				backdrop = 0.95,
				-- width = 190,
				-- width = 120,
				-- width = 100,
				-- width = 45, -- recording shorts screen
				-- width = .99999,
				width = .35,
				options = {
					signcolumn = "no", -- disable signcolumn
					number = true, -- disable number column
					relativenumber = true, -- disable relative numbers
					cursorline = false, -- disable cursorline
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
				twilight = { enabled = false },
				tmux = { enabled = false },
				-- gitsigns = { enabled = false },
			},
		},
		image = {},
		indent = {
			-- your indent configuration comes here
			-- or leave it empty to use the default settings
			-- refer to the configuration section below
			animate = {
				enabled = vim.fn.has("nvim-0.10") == 1,
				style = "out",
				easing = "linear",
				duration = {
					step = 15, -- ms per step
					total = 250, -- maximum duration
				},
			},
		},
	},
}
