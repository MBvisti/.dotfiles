return {
	 'saghen/blink.cmp',

	 version = '1.*',

	 opts = {
		keymap = {
		  preset = 'none',
		
		  ['<Up>'] = { 'select_prev', 'fallback' },
		  ['<Down>'] = { 'select_next', 'fallback' },

		  ['<C-f>'] = { "scroll_documentation_up", "fallback" },
		  ['<C-b>'] = { "scroll_documentation_down", "fallback" },
		
		  ['<C-e>'] = { "show" },
		  ['<C-space>'] = { "hide" },

		  ['<CR>'] = { "select_and_accept", "fallback" },
		},

	   appearance = {
	     nerd_font_variant = 'mono',
			    use_nvim_cmp_as_default = false,
	   },

	   cmdline = {
                    enabled = false,
                    completion = { menu = { auto_show = true } },
                    keymap = {
                        ["<CR>"] = { "accept_and_enter", "fallback" },
                    },
        },

	   completion = { 
		menu = {
			auto_show = false,
            scrolloff = 1,
            scrollbar = false,
            draw = {
                columns = {
                    { "kind_icon" },
                    { "label",      "label_description", gap = 1 },
                    { "kind" },
                    { "source_name" },
                },
            },
        },
		documentation = { 
			auto_show = true,
				            window = {
                            border = nil,
                            scrollbar = false,
                        },
		} 
	},

	   sources = {
	     default = { 'lsp', 'path', 'buffer' },
	   },

	   fuzzy = { implementation = "prefer_rust_with_warning" }
	 },
	 opts_extend = { "sources.default" }
}
