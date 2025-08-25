return {
  "lewis6991/gitsigns.nvim",
  enabled = true, -- start disabled
  config = function()
    require("gitsigns").setup()
  end,
  keys = {
    {
      "<leader>ga",
      function()
        local gitsigns = require("gitsigns")
		gitsigns.attach()
      end,
      desc = "Toggle Gitsigns",
    },
    {
      "<leader>gd",
      function()
        local gitsigns = require("gitsigns")
		gitsigns.detach()
      end,
      desc = "Toggle Gitsigns",
    },
  },
}

