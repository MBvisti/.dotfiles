return {
	"scottmckendry/cyberdream.nvim",
	lazy = false,
	priority = 1000,

	config = function()
		-- load the colorscheme here
		vim.cmd([[
					set termguicolors
					"let g:gruvbox_material_better_performance = 1
					"let g:gruvbox_material_diagnostic_virtual_text='colored'
		       		colorscheme cyberdream
		     	]])
	end,
}
