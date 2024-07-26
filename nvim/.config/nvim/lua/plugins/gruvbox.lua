return {
	"sainnhe/gruvbox-material",
	-- opts = {
	lazy = false, -- make sure we load this during startup if it is your main colorscheme
	priority = 1000, -- make sure to load this before all the other start plugins
	config = function()
		-- load the colorscheme here
		vim.cmd([[
					set termguicolors
					let g:gruvbox_material_better_performance = 1
					let g:gruvbox_material_diagnostic_virtual_text='colored'
		       		colorscheme gruvbox-material
		     		]])
	end,
	-- },
}
