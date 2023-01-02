require('lualine').setup {
    options = {
        icons_enabled = true,
        theme = 'gruvbox',
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
        lualine_a = { 'mode' },
        lualine_b = { 'filename' },
        lualine_c = { 'branch', 'diff', 'diagnostics' },
        lualine_x = {
            { 'diagnostics', sources = { "nvim_lsp" },
                symbols = { error = 'Error', warn = 'Warn', info = 'Info', hint = 'Hint' }, },
            'encoding',
            'filetype'
        },
        lualine_y = { 'progress' },
        lualine_z = { 'location' }
    },
    inactive_sections = {
        lualine_a = {},
        lualine_b = {},
        lualine_c = { 'filename' },
        lualine_x = { 'location' },
        lualine_y = {},
        lualine_z = {}
    },
    tabline = {},
    winbar = {},
    inactive_winbar = {},
    extensions = { 'fugitive', "fzf", "quickfix" }
}

-- OLD --
--local status, lualine = pcall(require, "lualine")
--
--if (not status) then return end
--
--lualine.setup {
--  options = {
--    icons_enabled = true,
--    component_separators = { left = '', right = '' },
--    section_separators = { left = '', right = '' },
--    options = { theme  = "catppuccin" },
--    -- options = { theme  = "gruvbox" },
--    disabled_filetypes = {}
--  },
--  sections = {
--    lualine_a = {'mode'},
--    lualine_b = {'branch'},
--    lualine_c = {{
--      'filename',
--      file_status = true, -- displays file status (readonly status, modified status)
--      path = 1 -- 0 = just filename, 1 = relative path, 2 = absolute path
--    }},
--    lualine_x = {
--      { 'diagnostics', sources = {"nvim_lsp"}, symbols = {error = 'Error', warn = 'Warn', info = 'Info', hint = 'Hint'}, },
--      'encoding',
--      'filetype'
--    },
--    lualine_y = {'progress'},
--    lualine_z = {'location'}
--  },
--  inactive_sections = {
--    lualine_a = {},
--    lualine_b = {},
--    lualine_c = {{
--      'filename',
--      file_status = true, -- displays file status (readonly status, modified status)
--      path = 1 -- 0 = just filename, 1 = relative path, 2 = absolute path
--    }},
--    lualine_x = {'location'},
--    lualine_y = {},
--    lualine_z = {}
--  },
--  tabline = {},
--  extensions = {'fugitive', "fzf", "quickfix", "toggleterm"}
--}
