return {
	{
		"saghen/blink.cmp",
		dependencies = "rafamadriz/friendly-snippets",

		version = "v0.10.0",
		opts = {
			keymap = { 
				preset = "enter",
				['<C-.>'] = { 'show', 'show_documentation', 'hide_documentation' },
				['<C-e>'] = { 'hide', 'fallback' },
				['<C-space>'] = { 'hide', 'fallback' },
			},

			-- appearances = {
			-- 	use_nvim_cmp_as_default = true,
			-- 	nerd_font_variant = "mono",
			-- },

			completion = {
			  menu = { auto_show = function(ctx) return ctx.mode ~= 'cmdline' end, border = 'single' },
			  trigger = {
				show_on_insert_on_trigger_character = false,
				show_on_trigger_character = false,
				show_on_keyword = false,
			  },
			  documentation = { 
					window = { border = 'single' },
					auto_show = true,
					-- auto_show_delay_ms = 150,
				},
			},

			signature = { enabled = true, window = { border = 'single' } },
		},
	},
}
