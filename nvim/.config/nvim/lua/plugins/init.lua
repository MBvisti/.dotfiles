-- You can add your own plugins here or in other files in this directory!
--  I promise not to create any merge conflicts in this directory :)
--
-- See the kickstart.nvim README for more information
return {
	-- 'github/copilot.vim',
	"tpope/vim-fugitive",

	-- lazy.nvim
	{
		"m4xshen/hardtime.nvim",
		dependencies = { "MunifTanjim/nui.nvim", "nvim-lua/plenary.nvim" },
		opts = {},
	},
	-- Lua
	{
		"folke/twilight.nvim",
		opts = {
			-- your configuration comes here
			-- or leave it empty to use the default settings
			-- refer to the configuration section below
		},
	},

	"mbbill/undotree",

	{
		"NoahTheDuke/vim-just",
		ft = { "just" },
	},

	"vimwiki/vimwiki",
	{
		"lervag/wiki.vim",
	},
	-- Lua
	{
		"folke/zen-mode.nvim",
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
				twilight = { enabled = false },
				kitty = {
					enabled = true,
				},
			},
		},
	},
	{
		"ray-x/go.nvim",
		dependencies = {},
		config = function()
			require("go").setup({
				max_line_len = 100, -- max line length in golines format, Target maximum line length for golines
				lsp_inlay_hints = {
					enabled = false,
				},
				gofmt = "golines",
				tag_transform = "snakecase", -- can be transform option("snakecase", "camelcase", etc) check gomodifytags for details and more options
				tag_options = "",
				lsp_gofumpt = true,
				lsp_document_formatting = false,
			})
		end,
		event = { "CmdlineEnter" },
		ft = { "go", "gomod" },
		build = ':lua require("go.install").update_all_sync()', -- if you need to install/update all binaries
	},

	{
		"stevearc/oil.nvim",
		opts = {
			-- Set to false if you still want to use netrw.
			default_file_explorer = false,
		},
	},

	{
		"kdheepak/lazygit.nvim",
		cmd = {
			"LazyGit",
			"LazyGitConfig",
			"LazyGitCurrentFile",
			"LazyGitFilter",
			"LazyGitFilterCurrentFile",
		},
		-- optional for floating window border decoration
		dependencies = {
			"nvim-lua/plenary.nvim",
		},
	},
	{
		"kiyoon/jupynium.nvim",
		-- build = 'pip3 install --user .',
		-- build = "conda run --no-capture-output -n jupynium pip install .",
		-- enabled = vim.fn.isdirectory(vim.fn.expand "~/miniconda3/envs/jupynium"),
	},
}
