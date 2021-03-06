local status_ok, toggleterm = pcall(require, "toggleterm")
if not status_ok then
    return
end

toggleterm.setup({
    size = 60,
    open_mapping = [[<c-t>]],
    hide_numbers = true,
    shade_filetypes = {},
    shading_factor = 2,
    start_in_insert = true,
    insert_mappings = true,
    direction = "float",
    close_on_exit = true,
    shell = vim.o.shell,
    float_ops = {
        border = "curved",
        winblend = 0,
        highlights = {
            border = "Normal",
            background = "Normal",
        }
    }
})

function _G.set_terminal_keymaps()
    local opts = {noremap = true}
    vim.api.nvim_buf_set_keymap(0, 't', '<esc>', [[<C-\><C-n>]], opts)
end

vim.cmd('autocmd! TermOpen term://* lua set_terminal_keymaps()')
local Terminal = require("toggleterm.terminal").Terminal
