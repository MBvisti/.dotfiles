vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pq", vim.cmd.Ex)


vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

-- greatest remap ever
vim.keymap.set("x", "<leader>p", "\"_dP")

-- next greatest remap ever : asbjornHaland
vim.keymap.set("n", "<leader>y", "\"+y")
vim.keymap.set("v", "<leader>y", "\"+y")
vim.keymap.set("n", "<leader>Y", "\"+Y")

vim.keymap.set("n", "<leader>d", "\"_d")
vim.keymap.set("v", "<leader>d", "\"_d")

-- This is going to get me cancelled
vim.keymap.set("i", "<C-c>", "<Esc>")

vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer<CR>")
vim.keymap.set("n", "<leader>f", function()
    vim.lsp.buf.format()
end)

vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz")
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz")

vim.keymap.set("n", "<leader>s", ":%s/\\<<C-r><C-w>\\>/<C-r><C-w>/gI<Left><Left><Left>")
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })

-- OLD --

--local map = vim.api.nvim_set_keymap
--local opts  = { noremap = true, silent = true }
--local nnoremap = require("mbvisti.keymap").nnoremap
--local xnoremap = require("mbvisti.keymap").xnoremap
--
---- window management
--nnoremap('<leader>h', ':wincmd h<CR>') -- move cursor to window left
--nnoremap('<leader>j', ':wincmd j<CR>') -- move cursor to window below
--nnoremap('<leader>k', ':wincmd k<CR>') -- move cursor to window above
--nnoremap('<leader>l', ':wincmd l<CR>') -- move cursor to window right
--
---- tab manangement
--nnoremap('<leader>tn', ':tabnext<CR>')   -- select next tab
--nnoremap('<leader>tp', ':tabprev<CR>')   -- select previous tab
--nnoremap('<leader>tt', ':tabnew<CR>')    -- create new tab
--nnoremap('<leader>tc', ':tabclose<CR>')  -- close tab
--
---- netwr mappings
--nnoremap('<leader>pq', '<cmd>Ex<CR>') -- closes buffer and opens netwr
--
---- telescope
--vim.api.nvim_set_keymap('n', '<leader>fb', [[<cmd>lua require('telescope.builtin').buffers()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>ff', [[<cmd>lua require('telescope.builtin').find_files({previewer = false})<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>cb', [[<cmd>lua require('telescope.builtin').current_buffer_fuzzy_find()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>fh', [[<cmd>lua require('telescope.builtin').help_tags()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>st', [[<cmd>lua require('telescope.builtin').tags()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>fs', [[<cmd>lua require('telescope.builtin').grep_string()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>fg', [[<cmd>lua require('telescope.builtin').live_grep()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>so', [[<cmd>lua require('telescope.builtin').tags{ only_current_buffer = true }<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>?',  [[<cmd>lua require('telescope.builtin').oldfiles()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>dt', [[<cmd>lua require('telescope.builtin').diagnostics()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>si', [[<cmd>lua require('telescope.builtin').lsp_implementations()<CR>]], { noremap = true, silent = true })
--vim.api.nvim_set_keymap('n', '<leader>sr', [[<cmd>lua require('telescope.builtin').lsp_references()<CR>]], { noremap = true, silent = true })
---- code actions removed from telescope in #1866 so using built-in
--vim.api.nvim_set_keymap('n', '<leader>ca', [[<cmd>lua vim.lsp.buf.code_action()<CR>]], { noremap = true, silent = true })
--
---- Vimwiki
--vim.api.nvim_set_keymap('n', '<leader>cc', [[<Plug>VimwikiToggleListItem]], { noremap = true, silent = true})
--
--xnoremap('<leader>p', '\'_dP')
--
--nnoremap('<C-y>', "'<,'>w !xclip -selection clipboard<Cr><Cr>")
