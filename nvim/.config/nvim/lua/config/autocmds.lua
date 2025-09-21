vim.api.nvim_create_autocmd("LspAttach", {
	group = vim.api.nvim_create_augroup("lsp-attach", { clear = true }),
	callback = function(event)
		local map = function(keys, func, desc)
			vim.keymap.set("n", keys, func, { buffer = event.buf, desc = "LSP: " .. desc })
		end
		local ts_builtin = require("telescope.builtin")
                                                                                                  
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
                                                                                                  
		-- local format_sync_grp = vim.api.nvim_create_augroup("GoImport", {})
		-- vim.api.nvim_create_autocmd("BufWritePre", {
		-- 	group = format_sync_grp,
		-- 	pattern = "*.go",
		-- 	callback = function()
		-- 		require("go.format").goimport()
		-- 	end,
		-- })
	end,
})

vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking (copying) text",
	group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})
