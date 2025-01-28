return {
	"yetone/avante.nvim",
	event = "VeryLazy",
	lazy = false,
	version = false, -- set this if you want to always pull the latest change
	opts = {
  		provider = "claude", -- Recommend using Claude
  		claude = {
  		  -- endpoint = "https://api.anthropic.com",
  		  -- model = "claude-3-5-sonnet-20241022",
  		  -- temperature = 0,
  		  max_tokens = 8192,
  		},
	},
	-- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
	build = "make",
	-- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
	dependencies = {
		"stevearc/dressing.nvim",
		"nvim-lua/plenary.nvim",
		"MunifTanjim/nui.nvim",
		"nvim-tree/nvim-web-devicons", -- or echasnovski/mini.icons
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
