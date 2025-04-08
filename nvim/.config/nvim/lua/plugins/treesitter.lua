return {
	"nvim-treesitter/nvim-treesitter",
	build = ":TSUpdate",
	config = function()
		local configs = require("nvim-treesitter.configs")

		configs.setup({
			ensure_installed = { "go", "lua", "vimdoc", "vim", "bash", "markdown", "markdown_inline", "templ" },
			sync_install = false,
			highlight = { enable = true },
			indent = { enable = true },
		})
	end
}
