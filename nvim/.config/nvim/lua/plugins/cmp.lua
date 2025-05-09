return {
	"hrsh7th/nvim-cmp",
	event = "InsertEnter",
	dependencies = {
		"hrsh7th/cmp-nvim-lsp",
	},
	config = function()
		local cmp = require("cmp")
		local lspkind = require("lspkind")

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

		cmp.setup({
			window = {
				completion = {
					border = border("FloatBorder"),
					winhighlight = "Normal:NormalFloat,CursorLine:PmenuSel,Search:None",
				},
				documentation = {
					border = border("FloatBorder"),
				},
			},
			completion = { 
				completeopt = "menu, menuone, noinsert",
				autocomplete = false,
			},

			mapping = cmp.mapping.preset.insert({
	-- 			["<C-n>"] = cmp.mapping.select_next_item(),
	-- 			["<C-p>"] = cmp.mapping.select_prev_item(),
	--
	-- 			["<C-b>"] = cmp.mapping.scroll_docs(-4),
	-- 			["<C-f>"] = cmp.mapping.scroll_docs(4),
	--
				["<CR>"] = cmp.mapping.confirm({ select = true }),

				["<C-e>"] = cmp.mapping.complete({}),
			}),
			formatting = {
				expandable_indicator = true,
				format = lspkind.cmp_format({
					mode = "symbol",
					maxwidth = 50,

					before = function(entry, vim_item)
						return vim_item
					end,
				}),
			},
			sources = {
				{ 
					name = "nvim_lsp",
					entry_filter = function(entry)
						return require("cmp").lsp.CompletionItemKind.Snippet ~= entry:get_kind()
					end
				},
	-- 			{ name = "path" },
	-- 			{ name = "luasnip" },
	-- 			{ name = "nvim_lua" },
			},
		})
	end,
}
