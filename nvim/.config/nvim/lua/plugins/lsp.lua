return {
	"neovim/nvim-lspconfig",
	dependencies = {
		"hrsh7th/nvim-cmp",
		"hrsh7th/cmp-nvim-lsp",
		{ "folke/neodev.nvim", opts = {} },
	},
	config = function()
		local capabilities = require('cmp_nvim_lsp').default_capabilities() --nvim-cmp
		local lsp = require("lspconfig")

		lsp.gopls.setup({
			capabilities = capabilities,
			root_dir = require("lspconfig.util").root_pattern("go.mod", ".git"),
			filetypes = { "go", "gomod" },
			settings = {
				gopls = {
					buildFlags = { "-tags=unit integration e2e" },
					completeUnimported = true,
					gofumpt = true,
					staticcheck = true,
				},
			},
		})

		lsp.templ.setup({
			capabilities = capabilities,
		})

		-- lsp.lua_language_server.setup({
		-- 	capabilities = capabilities,
		-- })
		
		-- lsp.ruby_lsp.setup({
		-- 	capabilities = capabilities,
		-- })

		-- lsp.postgres_lsp.setup({
		-- 	capabilities = capabilities,
		-- })

		-- lsp.css_variables.setup({
		-- 	capabilities = capabilities,
		-- })
		
		-- lsp.ts_ls.setup({
		-- 	capabilities = capabilities,
		-- })

		-- lsp.ruby_lsp.setup({
		-- 	capabilities = capabilities,
		-- })

		lsp.html.setup({
			capabilities = capabilities,
		})

		-- lsp.cssls.setup({
		-- 	capabilities = capabilities,
		-- })

		-- lsp.intelephense.setup({
		-- 	capabilities = capabilities,
		-- })

		-- lsp.htmx.setup({
		-- 	capabilities = capabilities,
		-- 	filetypes = { "templ", "html" },
		-- })

		lsp.emmet_language_server.setup({
			capabilities = capabilities,
			filetypes = { "html", "templ", "eruby", "css" },
		})

		vim.api.nvim_create_autocmd("LspAttach", {
			group = vim.api.nvim_create_augroup("lsp-attach", { clear = true }),
			callback = function(event)
				local map = function(keys, func, desc)
					vim.keymap.set("n", keys, func, { buffer = event.buf, desc = "LSP: " .. desc })
				end
				local ts_builtin = require("telescope.builtin")
				vim.diagnostic.config({
					virtual_text = false,
					virtual_lines = {
						-- Only show virtual line diagnostics for the current cursor line
						current_line = true,
					},
				})

				map("gd", vim.lsp.buf.definition, "[G]oto [D]efinition")
				map("gr", vim.lsp.buf.references, "[G]oto [R]eferences")
				map("gi", ts_builtin.lsp_implementations, "[G]oto [I]mplementation")

				map("<leader>d", ts_builtin.lsp_type_definitions, "Type [D]efinition")
				map("<leader>ds", ts_builtin.lsp_document_symbols, "[D]ocument [S]ymbols")
				map("<leader>ws", ts_builtin.lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbols")
				map("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
				map("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
				map("K", function() vim.lsp.buf.hover({ border = "rounded" }) end, "Hover Documentation")
				map("dg", vim.lsp.buf.declaration, "[G]oto [D]eclaration")

				local format_sync_grp = vim.api.nvim_create_augroup("GoImport", {})
				vim.api.nvim_create_autocmd("BufWritePre", {
					group = format_sync_grp,
					pattern = "*.go",
					callback = function()
						require("go.format").goimport()
					end,
				})
			end,
		})
	end,
}
