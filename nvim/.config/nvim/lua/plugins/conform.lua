return {
	"stevearc/conform.nvim",
	opts = {
		notify_on_error = true,
		format_on_save = function(bufnr)
			-- Disable "format_on_save lsp_fallback" for languages that don't
			-- have a well standardized coding style. You can add additional
			-- languages here or re-enable it for the disabled ones.
			local disable_filetypes = { go = true }
			return {
				timeout_ms = 500,
				lsp_fallback = not disable_filetypes[vim.bo[bufnr].filetype],
			}
		end,
		["_"] = { "trim_whitespace" },
		formatters_by_ft = {
			-- lua = { "stylua" },
			sql = { "sqlfmt" },
			templ = { "templ" },
			css = { "cssls" },
			lua = { "lua-language-server" },
		},
	},
}
