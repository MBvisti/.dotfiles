return {
	-- "hrsh7th/nvim-cmp",
	-- event = "InsertEnter",
	-- dependencies = {
	-- 	-- Snippet Engine & its associated nvim-cmp source
	-- 	{
	-- 		"L3MON4D3/LuaSnip",
	-- 		build = (function()
	-- 			-- Build Step is needed for regex support in snippets
	-- 			-- This step is not supported in many windows environments
	-- 			-- Remove the below condition to re-enable on windows
	-- 			if vim.fn.has("win32") == 1 or vim.fn.executable("make") == 0 then
	-- 				return
	-- 			end
	-- 			return "make install_jsregexp"
	-- 		end)(),
	-- 		dependencies = {},
	-- 	},
	--
	-- 	"saadparwaiz1/cmp_luasnip",
	-- 	"hrsh7th/cmp-nvim-lsp",
	-- 	"hrsh7th/cmp-path",
	-- 	"hrsh7th/cmp-nvim-lua",
	-- 	"hrsh7th/cmp-cmdline",
	-- },
	-- config = function()
	-- 	-- See `:help cmp`
	-- 	local cmp = require("cmp")
	-- 	local luasnip = require("luasnip")
	-- 	-- local lspkind = require("lspkind")
	-- 	luasnip.config.setup({})
	--
	-- 	local function border(hl_name)
	-- 		--[[ { "┏", "━", "┓", "┃", "┛","━", "┗", "┃" }, ]]
	-- 		--[[ {"─", "│", "─", "│", "┌", "┐", "┘", "└"}, ]]
	-- 		return {
	-- 			{ "┌", hl_name },
	-- 			{ "─", hl_name },
	-- 			{ "┐", hl_name },
	-- 			{ "│", hl_name },
	-- 			{ "┘", hl_name },
	-- 			{ "─", hl_name },
	-- 			{ "└", hl_name },
	-- 			{ "│", hl_name },
	-- 		}
	-- 	end
	--
	-- 	cmp.setup({
	-- 		window = {
	-- 			completion = {
	-- 				border = border("FloatBorder"),
	-- 				winhighlight = "Normal:NormalFloat,CursorLine:PmenuSel,Search:None",
	-- 			},
	-- 			documentation = {
	-- 				border = border("FloatBorder"),
	-- 			},
	-- 		},
	-- 		snippet = {
	-- 			expand = function(args)
	-- 				luasnip.lsp_expand(args.body)
	-- 			end,
	-- 		},
	-- 		completion = { completeopt = "menu,menuone,noinsert" },
	--
	-- 		mapping = cmp.mapping.preset.insert({
	-- 			["<C-n>"] = cmp.mapping.select_next_item(),
	-- 			["<C-p>"] = cmp.mapping.select_prev_item(),
	--
	-- 			["<C-b>"] = cmp.mapping.scroll_docs(-4),
	-- 			["<C-f>"] = cmp.mapping.scroll_docs(4),
	--
	-- 			["<CR>"] = cmp.mapping.confirm({ select = true }),
	--
	-- 			["<C-Space>"] = cmp.mapping.complete({}),
	-- 		}),
	-- 		-- formatting = {
	-- 		-- 	expandable_indicator = true,
	-- 		-- 	format = lspkind.cmp_format({
	-- 		-- 		mode = "symbol",
	-- 		-- 		maxwidth = 50,
	-- 		--
	-- 		-- 		before = function(entry, vim_item)
	-- 		-- 			return vim_item
	-- 		-- 		end,
	-- 		-- 	}),
	-- 		-- },
	-- 		sources = {
	-- 			{ name = "nvim_lsp" },
	-- 			{ name = "path" },
	-- 			{ name = "luasnip" },
	-- 			{ name = "nvim_lua" },
	-- 		},
	-- 	})
	--
	-- 	cmp.setup.filetype({ "sql" }, {
	-- 		sources = {
	-- 			{ name = "vim-dadbod-completion" },
	-- 			{ name = "buffer" },
	-- 		},
	-- 	})
	--
	-- 	cmp.setup.filetype({ "py" }, {
	-- 		sources = {
	-- 			{ name = "jupynium" },
	-- 			{ name = "nvim_lsp" },
	-- 			{ name = "path" },
	-- 		},
	-- 	})
	-- end,
}
