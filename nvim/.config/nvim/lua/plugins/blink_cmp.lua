return {
	 'saghen/blink.cmp',

	 version = '1.*',

	 opts = {
		keymap = {
		  preset = 'none',
		
		  ['<Up>'] = { 'select_prev', 'fallback' },
		  ['<Down>'] = { 'select_next', 'fallback' },
		
		  ['<C-e>'] = { "show" },
		  ['<C-space>'] = { "hide" },
		  ['<CR>'] = { "accept" },
		},

	   appearance = {
	     nerd_font_variant = 'mono'
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
            border = nil,
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
			auto_show = true 
		} 
	},

	   sources = {
	     default = { 'lsp', 'path' },
	   },

	   fuzzy = { implementation = "prefer_rust_with_warning" }
	 },
	 opts_extend = { "sources.default" }
}
