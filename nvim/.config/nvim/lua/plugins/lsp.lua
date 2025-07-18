return {
	"neovim/nvim-lspconfig",
	dependencies = {
		-- "saghen/blink.cmp",
		-- "hrsh7th/nvim-cmp",
		"hrsh7th/cmp-nvim-lsp",
		{ "folke/neodev.nvim", opts = {} },
	},
	config = function()
		-- local capabilities = require("blink.cmp").get_lsp_capabilities()
		local capabilities = require('cmp_nvim_lsp').default_capabilities() --nvim-cmp
		local lsp = require("lspconfig")
		-- local function border(hl_name)
		-- 	return {
		-- 		{ "┌", hl_name },
		-- 		{ "─", hl_name },
		-- 		{ "┐", hl_name },
		-- 		{ "│", hl_name },
		-- 		{ "┘", hl_name },
		-- 		{ "─", hl_name },
		-- 		{ "└", hl_name },
		-- 		{ "│", hl_name },
		-- 	}
		-- end
		local handlers = {
			["textDocument/hover"] = vim.lsp.buf.hover({ border = "rounded" }),
			-- ["textDocument/hover"] = vim.lsp.buf.hover({ border = border("FloatBorder") }),
			["textDocument/signatureHelp"] = vim.lsp.buf.signature_help({ border = "rounded" }),
			-- ["textDocument/signatureHelp"] = vim.lsp.buf.signature_help({ border = border("FloatBorder") }),
		}


		lsp.gopls.setup({
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			capabilities = capabilities,
			-- on_attach = function(_, bufnr)
			-- 	-- This disables only the virtual text
			-- 	vim.diagnostic.config({
			-- 		virtual_text = false,
			-- 		virtual_lines = true,
			-- 		float = { source = true }, -- Keep the floating window
			-- 		severity_sort = true,
			-- 	}, bufnr)
			-- 	-- vim.diagnostic.config({
			-- 	-- 	virtual_text = false
			-- 	-- }, bufnr)
			-- end,
			handlers = handlers,
			root_dir = require("lspconfig.util").root_pattern("go.mod", ".git"),
			filetypes = { "go", "gomod" },
			settings = {
				gopls = {
					-- hints = {
					--   assignVariableTypes = true,
					--   compositeLiteralFields = true,
					--   compositeLiteralTypes = true,
					--   constantValues = true,
					--   functionTypeParameters = true,
					--   parameterNames = true,
					--   rangeVariableTypes = true,
					-- },
					buildFlags = { "-tags=unit integration e2e" },
					completeUnimported = true,
					gofumpt = true,
					staticcheck = true,
				},
			},
		})

		lsp.templ.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})

		-- lsp.lua_language_server.setup({
		-- 	capabilities = capabilities,
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	handlers = handlers,
		-- })
		
		lsp.ruby_lsp.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})

		lsp.postgres_lsp.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})

		lsp.css_variables.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})
		lsp.cssls.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})
		lsp.ts_ls.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})

		lsp.ruby_lsp.setup({
			capabilities = capabilities,
			-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			handlers = handlers,
		})

		-- lsp.html.setup({
		-- 	capabilities = capabilities,
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	handlers = handlers,
		-- })

		-- lsp.cssls.setup({
		-- 	capabilities = capabilities,
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	handlers = handlers,
		-- })

		-- lsp.intelephense.setup({
		-- 	capabilities = capabilities,
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	handlers = handlers,
		-- })

		-- lsp.marksman.setup({
		-- 	capabilities = capabilities,
		-- 	single_file_support = false,
		-- 	root_dir = require("lspconfig.util").root_pattern(".marksman.toml"),
		-- })

		-- lsp.htmx.setup({
		-- 	capabilities = capabilities,
		-- 	filetypes = { "templ", "html" },
		-- })

		lsp.emmet_ls.setup({
			capabilities = capabilities,
			filetypes = { "html", "templ", "eruby", "css" },
		})

		-- lsp.lua_ls.setup({
		-- 	capabilities = capabilities,
		-- 	settings = {
		-- 		Lua = {
		-- 			completion = {
		-- 				callSnippet = "Replace",
		-- 			},
		-- 		},
		-- 	},
		-- })

		--    function will be executed to configure the current buffer
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

					-- Alternatively, customize specific options
					-- virtual_lines = {
					--  -- Only show virtual line diagnostics for the current cursor line
					--  current_line = true,
					-- },
				})

				map("gd", vim.lsp.buf.definition, "[G]oto [D]efinition")
				map("gr", vim.lsp.buf.references, "[G]oto [R]eferences")
				map("gi", ts_builtin.lsp_implementations, "[G]oto [I]mplementation")

				-- vim.keymap.set("i", "<C-space>", ts_builtin.live_grep, { buffer = event.buf, desc = "LSP: " .. "[L]ive [G]rep" })

				map("<leader>d", ts_builtin.lsp_type_definitions, "Type [D]efinition")
				map("<leader>ds", ts_builtin.lsp_document_symbols, "[D]ocument [S]ymbols")
				map("<leader>ws", ts_builtin.lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbols")
				map("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
				map("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
				-- map("K", vim.lsp.buf.hover, "Hover Documentation")
				map("K", function() vim.lsp.buf.hover({ border = "rounded" }) end, "Hover Documentation")
				-- map("K", "<cmd>GoDoc<CR>", "Hover Documentation")
				-- WARN: This is not Goto Definition, this is Goto Declaration.
				--  For example, in C this would take you to the header
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

		-- local capabilities = vim.lsp.protocol.make_client_capabilities()
		-- local capabilities = require("blink.cmp").get_lsp_capabilities()
		-- capabilities = vim.tbl_deep_extend("force", capabilities, require("cmp_nvim_lsp").default_capabilities())

		-- local servers = {
		-- 	marksman = {
		-- 		single_file_support = false,
		-- 		root_dir = require("lspconfig.util").root_pattern(".marksman.toml"),
		-- 	},
		-- 	htmx = {
		-- 		filetypes = { "templ", "html" },
		-- 	},
		-- 	emmet_ls = {
		-- 		filetypes = { "html", "templ" },
		-- 	},
		-- 	lua_ls = {
		-- 		settings = {
		-- 			Lua = {
		-- 				completion = {
		-- 					callSnippet = "Replace",
		-- 				},
		-- 			},
		-- 		},
		-- 	},
		-- }

		-- local lsp = require("lspconfig")
		-- lsp.tailwindcss.setup({
		-- 	handlers = handlers,
		-- 	classAttributes = { "class" },
		-- 	root_dir = require("lspconfig.util").root_pattern(
		-- 		"resources/tailwind/config.js",
		-- 		"tailwind.config.js",
		-- 		".git"
		-- 	),
		-- 	-- filetypes = { "templ" },
		-- 	includeLanguages = {
		-- 		eruby = "erb",
		-- 		htmlangular = "html",
		-- 		templ = "html",
		-- 	},
		-- 	-- init_options = { userLanguages = { templ = "html" } },
		-- })
		-- lsp.tailwindcss.capabilities =
		-- 	vim.tbl_deep_extend("force", {}, capabilities, lsp.tailwindcss.capabilities or {})

		-- lsp.solargraph.setup({
		-- 	filetypes = { "ruby", "eruby" },
		-- 	settings = {
		-- 		solargraph = {
		-- 			useBundler = true,
		-- 			diagnostic = true,
		-- 			completion = true,
		-- 			hover = true,
		-- 			formatting = true,
		-- 			symbols = true,
		-- 			definitions = true,
		-- 			rename = true,
		-- 			references = true,
		-- 			folding = true,
		-- 		},
		-- 	},
		-- })
		-- lsp.gopls.setup({
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	-- on_attach = function(client)
		-- 	-- 	-- Disable completion but keep other LSP features
		-- 	-- 	client.server_capabilities.completionProvider = false
		-- 	-- end,
		-- 	-- handlers = handlers,
		-- 	root_dir = require("lspconfig.util").root_pattern("go.mod", ".git"),
		-- 	filetypes = { "go", "gomod" },
		-- 	settings = {
		-- 		gopls = {
		-- 			-- hints = {
		-- 			--   assignVariableTypes = true,
		-- 			--   compositeLiteralFields = true,
		-- 			--   compositeLiteralTypes = true,
		-- 			--   constantValues = true,
		-- 			--   functionTypeParameters = true,
		-- 			--   parameterNames = true,
		-- 			--   rangeVariableTypes = true,
		-- 			-- },
		-- 			completeUnimported = true,
		-- 			gofumpt = true,
		-- 			staticcheck = true,
		-- 		},
		-- 	},
		-- })
		-- lsp.templ.setup({
		-- 	-- capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
		-- 	-- handlers = handlers,
		-- })
		-- require("mason").setup()
		--
		-- local ensure_installed = vim.tbl_keys(servers or {})
		-- vim.list_extend(ensure_installed, {
		-- 	"stylua", -- Used to format lua code
		-- })
		-- require("mason-tool-installer").setup({ ensure_installed = ensure_installed })
		-- require("mason-lspconfig").setup({
		-- 	handlers = {
		-- 		function(server_name)
		-- 			local server = servers[server_name] or {}
		-- 			-- server.capabilities = vim.tbl_deep_extend("force", {}, capabilities, server.capabilities or {})
		-- 			server.capabilities = capabilities
		-- 			require("lspconfig")[server_name].setup(server)
		-- 		end,
		-- 	},
		-- })
	end,
}
