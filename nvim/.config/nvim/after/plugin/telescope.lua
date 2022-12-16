local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
vim.keymap.set('n', '<C-p>', builtin.git_files, {})
vim.keymap.set('n', '<leader>ps', function()
	builtin.grep_string({ search = vim.fn.input("Grep > ")});
end)

--vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
--vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})

-- OLD --
---- Telescope
--require('telescope').setup {
--  defaults = {
--    mappings = {
--      i = {
--        ['<C-u>'] = false,
--        ['<C-d>'] = false,
--      },
--    },
--  },
--}
--
---- Enable telescope fzf native
--require('telescope').load_extension 'fzf'
--
