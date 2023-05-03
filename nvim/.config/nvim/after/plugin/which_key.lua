require("wf").setup({
  theme = "default",
    -- you can copy the full list from lua/wf/setup/init.lua
})

local which_key = require("wf.builtin.which_key")

-- Which Key
vim.keymap.set(
  "n",
  "<Leader>",
   -- mark(opts?: table) -> function
   -- opts?: option
  which_key({ text_insert_in_advance = "<Leader>" }),
  { noremap = true, silent = true, desc = "[wf.nvim] which-key /", }
)
