return {
	"neovim/nvim-lspconfig",
	dependencies = {
		"saghen/blink.cmp",
		-- "williamboman/mason.nvim",
		-- "williamboman/mason-lspconfig.nvim",
		-- "WhoIsSethDaniel/mason-tool-installer.nvim",

		-- { "j-hui/fidget.nvim", opts = {} },

		-- `neodev` configures Lua LSP for your Neovim config, runtime and plugins
		-- used for completion, annotations and signatures of Neovim apis
		{ "folke/neodev.nvim", opts = {} },
	},
	config = function()
		local capabilities = require("blink.cmp").get_lsp_capabilities()
		local lsp = require("lspconfig")

		local function border(hl_name)
			return {
				{ "┌", hl_name },
				{ "─", hl_name },
				{ "┐", hl_name },
				{ "│", hl_name },
				{ "┘", hl_name },
				{ "─", hl_name },
				{ "└", hl_name },
				{ "│", hl_name },
			}
		end
		local handlers = {
			["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, { border = border("FloatBorder") }),
			["textDocument/signatureHelp"] = vim.lsp.with(
				vim.lsp.handlers.signature_help,
				{ border = border("FloatBorder") }
			),
		}


		lsp.gopls.setup({
			capabilities = vim.tbl_deep_extend("force", {}, capabilities, lsp.gopls.capabilities or {}),
			-- capabilities = capabilities,
			-- on_attach = function(client)
			-- 	-- Disable completion but keep other LSP features
			-- 	client.server_capabilities.completionProvider = false
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
			filetypes = { "html", "templ" },
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
				map("gd", require("telescope.builtin").lsp_definitions, "[G]oto [D]efinition")
				map("gr", require("telescope.builtin").lsp_references, "[G]oto [R]eferences")
				map("gi", require("telescope.builtin").lsp_implementations, "[G]oto [I]mplementation")
				map("<leader>d", require("telescope.builtin").lsp_type_definitions, "Type [D]efinition")
				map("<leader>ds", require("telescope.builtin").lsp_document_symbols, "[D]ocument [S]ymbols")
				map("<leader>ws", require("telescope.builtin").lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbols")
				map("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
				map("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
				map("K", vim.lsp.buf.hover, "Hover Documentation")
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
