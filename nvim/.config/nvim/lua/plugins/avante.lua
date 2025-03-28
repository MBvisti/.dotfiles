return {
	"yetone/avante.nvim",
	event = "VeryLazy",
	lazy = false,
	version = false,
	opts = {
		provider = "claude",
		-- provider = "openai",
		-- provider = "gemini",
		-- auto_suggestions_provider = "claude",
		cursor_applying_provider = "claude",
		claude = {
			endpoint = "https://api.anthropic.com",
			model = "claude-3-5-sonnet-20241022",
			-- model = "claude-3-5-sonnet-latest",
			-- temperature = 0,
			max_tokens = 8192,
			disable_tools = { "git_commit", "web_search" },
		},
		-- 		openai = {
		--     		endpoint = "https://api.openai.com/v1",
		--     		model = "gpt-4o", -- your desired model (or use gpt-4o, etc.)
		--     		-- timeout = 30000, -- timeout in milliseconds
		--     		temperature = 0, -- adjust if needed
		--     		max_tokens = 8192,
		--   	},
		-- gemini = {
		--   	 	endpoint = "https://generativelanguage.googleapis.com/v1beta/models",
		--   	 	model = "gemini-2.0-flash-latest",
		--   	 	timeout = 30000, -- Timeout in milliseconds
		--   	 	temperature = 0,
		--   		max_tokens = 4096,
		-- 		},
		behaviour = {
			auto_focus_sidebar = true,
			auto_suggestions = false, -- Experimental stage
			auto_suggestions_respect_ignore = false,
			auto_set_highlight_group = true,
			auto_set_keymaps = true,
			auto_apply_diff_after_generation = false,
			jump_result_buffer_on_finish = false,
			support_paste_from_clipboard = true,
			minimize_diff = false,
			enable_token_counting = true,
			enable_cursor_planning_mode = false,
			use_cwd_as_project_root = true,
		},
	},
	-- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
	build = "make",
	-- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
	dependencies = {
		"stevearc/dressing.nvim",
		"nvim-lua/plenary.nvim",
		"MunifTanjim/nui.nvim",
		"nvim-tree/nvim-web-devicons",
		--- The below dependencies are optional,
		-- "echasnovski/mini.pick",   -- for file_selector provider mini.pick
		"nvim-telescope/telescope.nvim", -- for file_selector provider telescope
		-- "hrsh7th/nvim-cmp",        -- autocompletion for avante commands and mentions
		"ibhagwan/fzf-lua",        -- for file_selector provider fzf
		-- {
		-- 	-- Make sure to set this up properly if you have lazy=true
		-- 	"MeanderingProgrammer/render-markdown.nvim",
		-- 	opts = {
		-- 		file_types = { "Avante" },
		-- 	},
		-- 	ft = { "Avante" },
		-- },
	},
}
