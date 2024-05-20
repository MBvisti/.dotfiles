return {
	"nvim-treesitter/nvim-treesitter",
	build = ":TSUpdate",
	opts = {
		ensure_installed = { "go", "lua", "rust", "vimdoc", "vim", "bash", "templ" },
		auto_install = true,
		highlight = {
			enable = true,
		},
		indent = { enable = true, disable = { "" } },
	},
	config = function(_, opts)
		---@diagnostic disable-next-line: missing-fields
		require("nvim-treesitter.configs").setup(opts)
	end,
}
