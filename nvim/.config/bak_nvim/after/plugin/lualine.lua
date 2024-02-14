require('lualine').setup {
    options = {
        icons_enabled = false,
        theme = 'gruvbox-material',
        component_separators = { left = '', right = '' },
        section_separators = { left = '', right = '' },
        disabled_filetypes = {
            statusline = {},
            winbar = {},
        },
        ignore_focus = {},
        always_divide_middle = true,
        globalstatus = false,
        refresh = {
            statusline = 1000,
            tabline = 1000,
            winbar = 1000,
        }
    },
    sections = {
        -- lualine_a = { 'mode' },
        lualine_a = { 'mode' },
        -- lualine_b = { {
        --     'filename',
        --     path = 3,
        -- }},
        lualine_b = {},
        lualine_c = { 'branch', 'diff' },
        -- lualine_x = {
        --     { 'diagnostics', sources = { "nvim_lsp" },
        --         symbols = { error = 'Error', warn = 'Warn', info = 'Info', hint = 'Hint' }, },
        --     'encoding',
        --     'filetype'
        -- },
        -- lualine_y = { 'progress' },
        lualine_x = {},
        lualine_y = { 'filename' },
        lualine_z = { 'location' }
    },
    -- inactive_sections = {
    --     lualine_a = {},
    --     lualine_b = { 'branch' },
    --     lualine_c = { 'filename' },
    --     lualine_x = { 'location' },
    --     lualine_y = {},
    --     lualine_z = {}
    -- },
    tabline = {},
    winbar = {},
    inactive_winbar = {},
    extensions = { 'fugitive', "fzf", "quickfix" }
}
