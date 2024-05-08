--vim.opt.termguicolors = true

--vim.cmd[[highlight IndentBlanklineSpaceChar guifg=#00FF00 gui=nocombine]]

---- bright
--vim.cmd[[highlight IndentBlankLineIndent1 guifg=#fb4934 gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent2 guifg=#b8bb26 gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent3 guifg=#fabd2f gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent4 guifg=#83a598 gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent5 guifg=#d3869b gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent6 guifg=#8ec07c gui=nocombine]]
--vim.cmd[[highlight IndentBlankLineIndent7 guifg=#fe8019 gui=nocombine]]

---- faded
----vim.cmd[[highlight IndentBlankLineIndent1 guifg=#9d0006 gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent2 guifg=#79740e gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent3 guifg=#b57614 gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent4 guifg=#076678 gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent5 guifg=#8f3f71 gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent6 guifg=#427b58 gui=nocombine]]
----vim.cmd[[highlight IndentBlankLineIndent7 guifg=#af3a03 gui=nocombine]]

--vim.opt.list = true
--vim.opt.listchars:append "space:⋅"
--vim.opt.listchars:append "eol:↴"

--require("indent_blankline").setup {
--    show_end_of_line = true,
--    space_char_blankline = " ",
--    char_highlight_list = {
--        "IndentBlankLineIndent1",
--        "IndentBlankLineIndent2",
--        "IndentBlankLineIndent3",
--        "IndentBlankLineIndent4",
--        "IndentBlankLineIndent5",
--        "IndentBlankLineIndent6",
--        "IndentBlankLineIndent7",
--    }
--}

local highlight = {
    "RainbowRed",
    "RainbowYellow",
    "RainbowBlue",
    "RainbowOrange",
    "RainbowGreen",
    "RainbowViolet",
    "RainbowCyan",
}

local hooks = require "ibl.hooks"
-- create the highlight groups in the highlight setup hook, so they are reset
-- every time the colorscheme changes
hooks.register(hooks.type.HIGHLIGHT_SETUP, function()
    vim.api.nvim_set_hl(0, "RainbowRed", { fg = "#E06C75" })
    vim.api.nvim_set_hl(0, "RainbowYellow", { fg = "#E5C07B" })
    vim.api.nvim_set_hl(0, "RainbowBlue", { fg = "#61AFEF" })
    vim.api.nvim_set_hl(0, "RainbowOrange", { fg = "#D19A66" })
    vim.api.nvim_set_hl(0, "RainbowGreen", { fg = "#98C379" })
    vim.api.nvim_set_hl(0, "RainbowViolet", { fg = "#C678DD" })
    vim.api.nvim_set_hl(0, "RainbowCyan", { fg = "#56B6C2" })
end)

require("ibl").setup { indent = { highlight = highlight } }
