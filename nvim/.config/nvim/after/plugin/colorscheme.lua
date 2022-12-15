vim.opt.background = "dark" -- or "light" for light mode

-- === Kanagawa Colorscheme ===
-- require('kanagawa').setup({
--     undercurl = true,           -- enable undercurls
--     commentStyle = { italic = true },
--     functionStyle = {},
--     keywordStyle = { italic = true },
--     statementStyle = { bold = true },
--     typeStyle = {},
--     variablebuiltinStyle = { italic = true },
--     specialReturn = true,       -- special highlight for the return keyword
--     specialException = true,    -- special highlight for exception handling keywords 
--     transparent = false,        -- do not set background color
--     dimInactive = true,        -- dim inactive window `:h hl-NormalNC`
--     colors = {},
--     overrides = {},
-- })
-- vim.cmd("colorscheme kanagawa")


-- === Catppuccin Colorscheme ===
-- vim.g.catppuccin_flavour = "mocha" -- latte, frappe, macchiato, mocha

-- require("catppuccin").setup()

-- vim.cmd [[colorscheme catppuccin]]

-- === Gruuuuuuuuv Colorscheme ===
vim.cmd([[colorscheme gruvbox]])
vim.g.gruvbox_transparent_bg = 1
