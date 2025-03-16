return {
		"saghen/blink.cmp",
		dependencies = {
			-- "rafamadriz/friendly-snippets",
			"giuxtaposition/blink-cmp-copilot",
		},

		version = "v0.13.1",
		opts = {
			keymap = { 
				preset = "enter",
				['<C-.>'] = { 'show', 'show_documentation', 'hide_documentation' },
				['<C-e>'] = { 'hide', 'fallback' },
				['<C-space>'] = { 'hide', 'fallback' },
			},

			appearance = {
			   highlight_ns = vim.api.nvim_create_namespace('blink_cmp'),
  			   nerd_font_variant = 'mono',
  			   kind_icons = {
  			    Text = '󰉿',
  			    Method = '󰊕',
  			    Function = '󰊕',
  			    Constructor = '󰒓',

  			    Field = '󰜢',
  			    Variable = '󰆦',
  			    Property = '󰖷',

  			    Class = '󱡠',
  			    Interface = '󱡠',
  			    Struct = '󱡠',
  			    Module = '󰅩',

  			    Unit = '󰪚',
  			    Value = '󰦨',
  			    Enum = '󰦨',
  			    EnumMember = '󰦨',

  			    Keyword = '󰻾',
  			    Constant = '󰏿',

  			    Snippet = '󱄽',
  			    Color = '󰏘',
  			    File = '󰈔',
  			    Reference = '󰬲',
  			    Folder = '󰉋',
				Copilot = "",
  			    Event = '󱐋',
  			    Operator = '󰪚',
  			    TypeParameter = '󰬛',
			  },
  			},

			completion = {
			  menu = { 
				auto_show = function(ctx) return ctx.mode ~= 'cmdline' end, border = 'single',
				 draw = {
      components = {
        kind_icon = {
          ellipsis = false,
          text = function(ctx)
            local lspkind = require("lspkind")
            local icon = ctx.kind_icon
            if vim.tbl_contains({ "Path" }, ctx.source_name) then
                local dev_icon, _ = require("nvim-web-devicons").get_icon(ctx.label)
                if dev_icon then
                    icon = dev_icon
                end
            else
                icon = require("lspkind").symbolic(ctx.kind, {
                    mode = "symbol",
                })
            end

            return icon .. ctx.icon_gap
          end,

          -- Optionally, use the highlight groups from nvim-web-devicons
          -- You can also add the same function for `kind.highlight` if you want to
          -- keep the highlight groups in sync with the icons.
          highlight = function(ctx)
            local hl = ctx.kind_hl
            if vim.tbl_contains({ "Path" }, ctx.source_name) then
              local dev_icon, dev_hl = require("nvim-web-devicons").get_icon(ctx.label)
              if dev_icon then
                hl = dev_hl
              end
            end
            return hl
          end,
        }
      }
    }
    		},
			  trigger = {
				show_on_insert_on_trigger_character = false,
				show_on_trigger_character = false,
				show_on_keyword = false,
			  },
			  documentation = { 
					window = { border = 'rounded' },
					treesitter_highlighting = true,
					-- window = { border = 'single' },
					auto_show = true,
					-- auto_show_delay_ms = 150,
				},
			},

			signature = { enabled = true, window = { border = 'single' } },

			sources = {
				default = {"lsp"},
				-- default = {"lsp", "copilot"},
				-- default = {"lsp", "path", "copilot"},
				providers = {
					lsp = {
						name = "lsp",
						enabled = true,
						module = "blink.cmp.sources.lsp",
						-- kind = "lsp",
						score_offset = 1000,
					},
					-- snippets = {
					-- 	name = "snippets",
					-- 	enabled = true,
					-- 	module = "blink.cmp.sources.snippets",
					-- 	score_offset = 500,
					-- },
					-- copilot = {
					-- 	name = "copilot",
					-- 	enabled = true,
					-- 	module = "blink-cmp-copilot",
					-- 	-- kind = "LSP",
					-- 	score_offset = 800,
					-- 	async = true,
					-- 				transform_items = function(_, items)
					--          				local CompletionItemKind = require("blink.cmp.types").CompletionItemKind
					--          				local kind_idx = #CompletionItemKind + 1
					--          				CompletionItemKind[kind_idx] = "Copilot"
					--          				for _, item in ipairs(items) do
					--          				  item.kind = kind_idx
					--          				end
					--          				return items
					--        			end,
					-- }
				}
			}
		},
}
