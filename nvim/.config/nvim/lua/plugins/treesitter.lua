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
	-- 	opts = {
	-- 		ensure_installed = { "go", "lua", "vimdoc", "vim", "bash", "markdown", "markdown_inline", "templ" },
	-- 		auto_install = true,
	-- 		highlight = {
	-- 			enable = true,
	-- 		},
	-- 		indent = { enable = true, disable = { "" } },
	-- 	},
	-- 	-- config = function(_, opts)
	-- 	-- local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
	-- 	--
	-- 	-- parser_config.blade = {
	-- 	-- 	install_info = {
	-- 	-- 		url = "https://github.com/EmranMR/tree-sitter-blade",
	-- 	-- 		files = { "src/parser.c" },
	-- 	-- 		branch = "main",
	-- 	-- 	},
	-- 	-- 	filetype = "blade",
	-- 	-- }
	-- 	--
	-- 	-- vim.filetype.add({
	-- 	-- 	pattern = {
	-- 	-- 		[".*%.blade%.php"] = "blade",
	-- 	-- 	},
	-- 	-- })
	-- 	--
	-- 	-- require("nvim-treesitter.configs").setup(opts)
	-- 	-- end,
}

-- require("lazy").setup({ {
-- 	"nvim-treesitter/nvim-treesitter",
-- 	build = ":TSUpdate",
-- 	config = function()
-- 		local configs = require("nvim-treesitter.configs")
--
-- 		configs.setup({
-- 			ensure_installed = { "go", "lua", "vimdoc", "vim", "bash", "markdown", "markdown_inline", "templ" },
-- 			sync_install = false,
-- 			highlight = { enable = true },
-- 			indent = { enable = true },
-- 		})
-- 	end
-- } })
