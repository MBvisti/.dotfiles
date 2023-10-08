--function ColorMyPencils(color)
--	color = color or "gruvbox"
--	vim.cmd.colorscheme(color)
--
--	vim.api.nvim_set_hl(0, "Normal", { bg = none })
--	vim.api.nvim_set_hl(0, "NormalFloat", { bg = none })
--end
--ColorMyPencils()

-- OLD --
--vim.opt.background = "dark" -- or "light" for light mode

-- === Kanagawa Colorscheme ===
require('kanagawa').setup()

vim.cmd [[colorscheme kanagawa-wave]]

-- === Gruuuuuuuuv Colorscheme ===
-- vim.o.background = "dark"
-- vim.cmd([[colorscheme gruvbox]])

-- === Catppuccin Colorscheme ===
--catppuccin-latte, catppuccin-frappe, catppuccin-macchiato, catppuccin-mocha
--require("catppuccin").setup()
--vim.cmd([[colorscheme catppuccin-mocha]])

-- === nordic Colorscheme ===
--require('nordic').setup({
--    theme = "nordic",
--    transparent_bg = true,
--})
--vim.cmd [[colorscheme nordic]]
----
--vim.cmd [[hi LineNr guifg=#D08770]]
--vim.cmd [[hi CursorLineNr guifg=#ECEFF4]]

-- === Gruvbox Material Colorscheme ===
-- vim.cmd [[
--     colorscheme gruvbox-material
--     let g:gruvbox_material_background = 'soft'
-- ]]

-- vim.cmd [[hi LineNr guifg=#D08770]]
-- vim.cmd [[hi CursorLineNr guifg=#ECEFF4]]

-- === Everforest Colorscheme ===
-- vim.cmd [[
--     colorscheme everforest
--     let g:gruvbox_material_background = 'medium'
-- ]]

-- vim.cmd [[hi LineNr guifg=#9da9a0]]
-- vim.cmd [[hi CursorLineNr guifg=#e69875]]
