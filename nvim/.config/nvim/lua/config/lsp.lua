vim.lsp.config('gopls', {
	cmd = { "gopls" },
	filetypes = { "go", "gomod" },
	root_markers = { "go.mod" },
	settings = {
		gopls = {
			buildFlags = { "-tags=unit integration e2e" },
			completeUnimported = true,
			gofumpt = true,
			staticcheck = true,
		},
	},
})

vim.lsp.config('html', {
	cmd = { "bun", "run", "vscode-html-language-server", "--stdio" },
	filetypes = { "html", "templ" }
})

vim.lsp.config('tailwindcss', {
	cmd = { "bun", "run", "tailwindcss-language-server", "--stdio" },
	filetypes = { "html", "templ", "erb.html" },
	settings = {
	  tailwindCSS = {
        classAttributes = { "class" },
        includeLanguages = {
          htmlangular = "html",
          templ = "html"
        },
	  }
	}
})

vim.lsp.config('templ', {
  cmd = { "templ", "lsp" },
  filetypes = { "templ" },
  root_markers = { "go.mod", "go.work", ".git" },
  
  handlers = {
    ["window/showMessage"] = function(err, result, ctx, config)
      -- Filter out incorrect "generated file" warnings when editing .templ files
      if result and result.message and string.match(result.message, "generated file") then
        return -- Suppress the warning
      end
      -- Pass other messages through to the default handler
      return vim.lsp.handlers["window/showMessage"](err, result, ctx, config)
    end,

    -- Also handle log messages in case the warning comes through that channel
    ["window/logMessage"] = function(err, result, ctx, config)
      if result and result.message and string.match(result.message, "generated file") then
        return -- Suppress the warning
      end
      return vim.lsp.handlers["window/logMessage"](err, result, ctx, config)
    end,
  }
})

vim.lsp.config('emmet-language-server', {
	cmd = { "bun", "run", "emmet-language-server", "--stdio"},
	filetypes = {"templ"}
})

vim.lsp.enable('gopls')
vim.lsp.enable('templ')
vim.lsp.enable('emmet-language-server')
vim.lsp.enable('html')
vim.lsp.enable('tailwindcss')

vim.diagnostic.config({
	virtual_text = false,
	virtual_lines = {
		current_line = true,
	},
})
