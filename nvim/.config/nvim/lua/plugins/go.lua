return {
	"ray-x/go.nvim",
	dependencies = {},
	config = function()
		require("go").setup({
			max_line_len = 100, -- max line length in golines format, Target maximum line length for golines
			lsp_inlay_hints = {
				enabled = false,
			},
			gofmt = "golines",
			tag_transform = "camelcase", -- can be transform option("snakecase", "camelcase", etc) check gomodifytags for details and more options
			tag_options = "",
			lsp_gofumpt = true,
			lsp_document_formatting = false,
		})
	end,
	event = { "CmdlineEnter" },
	ft = { "go", "gomod" },
	build = ':lua require("go.install").update_all_sync()', -- if you need to install/update all binaries
}
