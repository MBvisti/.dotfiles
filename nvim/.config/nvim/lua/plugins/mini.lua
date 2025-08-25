return {
	"echasnovski/mini.nvim",
	config = function()
		local statusline = require("mini.statusline")

		-- set use_icons to true if you have a Nerd Font
		statusline.setup({ use_icons = vim.g.have_nerd_font })

		---@diagnostic disable-next-line: duplicate-set-field
		statusline.is_truncated = function()
			return 1
		end

		---@diagnostic disable-next-line: duplicate-set-field
		statusline.section_filename = function()
			return vim.fn.expand("%:~:.")
		end

		-- You can configure sections in the statusline by overriding their
		-- default behavior. For example, here e set the section for
		-- cursor location to LINE:COLUMN
		---@diagnostic disable-next-line: duplicate-set-field
		statusline.section_location = function()
			return "%2l:%-2v"
		end
	end,
}
