return {
	"folke/snacks.nvim",
  	---@type snacks.Config
  	opts = {
  		indent = {
  	    	-- your indent configuration comes here
  	    	-- or leave it empty to use the default settings
  	    	-- refer to the configuration section below
			animate = {
    			enabled = vim.fn.has("nvim-0.10") == 1,
    			style = "out",
    			easing = "linear",
    			duration = {
      				step = 15, -- ms per step
      				total = 250, -- maximum duration
    			},
  			},
		},
		lazygit = {},
		image = {}
  	},
}

