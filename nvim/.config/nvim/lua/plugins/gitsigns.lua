return {
  "lewis6991/gitsigns.nvim",
  enabled = true, -- start disabled
  config = function()
    require("gitsigns").setup()
  end,
  keys = {
    {
      "<leader>ga", -- Or whatever keybinding you want
      function()
        local gitsigns = require("gitsigns")
		gitsigns.attach()
      end,
      desc = "Toggle Gitsigns",
    },
    {
      "<leader>gd", -- Or whatever keybinding you want
      function()
        local gitsigns = require("gitsigns")
		gitsigns.detach()
        -- if package.loaded["gitsigns"] then
        --   gitsigns.detach()
        --   package.loaded["gitsigns"] = nil
        --   vim.notify("Gitsigns disabled")
        -- else
        --   require("lazy").load({ plugins = { "gitsigns.nvim" } })
        --   vim.notify("Gitsigns enabled")
        -- end
      end,
      desc = "Toggle Gitsigns",
    },
  },
}

