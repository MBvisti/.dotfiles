return {
  "lewis6991/gitsigns.nvim",
  enabled = true, -- start disabled
  config = function()
    require("gitsigns").setup({
		-- 		on_attach = function(bufnr)
		--   		local gitsigns = require('gitsigns')
		--   		local file_path = vim.fn.expand("%:p:h")
		--   		if string.match(file_path, "/home/mbv/work/master%-fullstack%-golang") then
		-- 		gitsigns.detach(bufnr)
		-- 		vim.notify("Gitsigns disabled for this buffer: " .. file_path)
		-- 		return
		-- 	end
		-- end
	})
  end,
  -- keys = {
  --   {
  --     "<leader>ga",
  --     function()
  --       local gitsigns = require("gitsigns")
  -- gitsigns.attach()
  --     end,
  --     desc = "Toggle Gitsigns",
  --   },
  --   {
  --     "<leader>gd",
  --     function()
  --       local gitsigns = require("gitsigns")
  -- gitsigns.detach()
  --     end,
  --     desc = "Toggle Gitsigns",
  --   },
  -- },
}

