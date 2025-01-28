return {
		"saghen/blink.cmp",
		dependencies = {
			"rafamadriz/friendly-snippets",
			"giuxtaposition/blink-cmp-copilot",
		},

		version = "v0.10.0",
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
			  	--draw = {
      			--	components = {
      			--	  kind_icon = {
      			--	    ellipsis = false,
      			--	    text = function(ctx)
      			--	      local kind_icon, _, _ = require('mini.icons').get('lsp', ctx.kind)
      			--	      return kind_icon
      			--	    end,
      			--	    -- Optionally, you may also use the highlights from mini.icons
      			--	    highlight = function(ctx)
      			--	      local _, hl, _ = require('mini.icons').get('lsp', ctx.kind)
      			--	      return hl
      			--	    end,
      			--	  }
      			--	}
    			--},
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
				default = {"lsp", "path", "copilot"},
				providers = {
					lsp = {
						name = "lsp",
						enabled = true,
						module = "blink.cmp.sources.lsp",
						-- kind = "lsp",
						score_offset = 1000,
					},
					snippets = {
						name = "snippets",
						enabled = true,
						module = "blink.cmp.sources.snippets",
						score_offset = 500,
					},
					copilot = {
						name = "copilot",
						enabled = true,
						module = "blink-cmp-copilot",
						-- kind = "LSP",
						score_offset = 800,
						async = true,
    					transform_items = function(_, items)
              				local CompletionItemKind = require("blink.cmp.types").CompletionItemKind
              				local kind_idx = #CompletionItemKind + 1
              				CompletionItemKind[kind_idx] = "Copilot"
              				for _, item in ipairs(items) do
              				  item.kind = kind_idx
              				end
              				return items
            			end,
					}
				}
			}
		},
}
