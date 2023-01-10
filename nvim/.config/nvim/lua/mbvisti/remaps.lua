vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pq", vim.cmd.Ex)

vim.keymap.set("n", "<leader>oi", "<cmd>:e /home/mbv/obsidian/mbv/index.md<CR>")

-- move a selection up and down
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- not sure
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

-- window management
vim.keymap.set("n", '<leader>h', ':wincmd h<CR>') -- move cursor to window left
vim.keymap.set("n", '<leader>j', ':wincmd j<CR>') -- move cursor to window below
vim.keymap.set("n", '<leader>k', ':wincmd k<CR>') -- move cursor to window above
vim.keymap.set("n", '<leader>l', ':wincmd l<CR>') -- move cursor to window right

-- OLD --

---- tab manangement
--nnoremap('<leader>tn', ':tabnext<CR>')   -- select next tab
--nnoremap('<leader>tp', ':tabprev<CR>')   -- select previous tab
--nnoremap('<leader>tt', ':tabnew<CR>')    -- create new tab
--nnoremap('<leader>tc', ':tabclose<CR>')  -- close tab
