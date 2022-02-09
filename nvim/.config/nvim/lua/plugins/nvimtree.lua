-- require("nvim-tree").setup{
--     view = {
--         width = 5,
--     }
-- }

local g = vim.g

-- settings
g.nvim_tree_git_hl = 1
g.nvim_tree_refresh_wait = 300

g.nvim_tree_special_files = {}

g.nvim_tree_respect_buf_cwd = 1

-- set up args
local args = {
  auto_close = false,
  diagnostics = {
    enable = true,
  },
  ignore_ft_on_setup = {
    'startify',
    'dashboard',
    'alpha',
  },
  update_focused_file = {
    enable = true,
  },
  view = {
    side = "left",
    auto_resize = true,
    width = 35,
    number = true,
  },
  git = {
    ignore = true,
  },
}

require('nvim-tree').setup(args)
