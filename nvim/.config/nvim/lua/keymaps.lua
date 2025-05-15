-- Diagnostic keymaps
vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, { desc = "Go to previous [D]iagnostic message" })
vim.keymap.set("n", "]d", vim.diagnostic.goto_next, { desc = "Go to next [D]iagnostic message" })
vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float, { desc = "Show diagnostic [E]rror messages" })
vim.keymap.set("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })

-- Exit terminal mode in the builtin terminal with a shortcut that is a bit easier
-- for people to discover. Otherwise, you normally need to press <C-\><C-n>, which
-- is not what someone will guess without a bit more experience.
--
-- NOTE: This won't work in all terminal emulators/tmux/etc. Try your own mapping
-- or just use <C-\><C-n> to exit terminal mode
vim.keymap.set("t", "<Esc><Esc>", "<C-\\><C-n>", { desc = "Exit terminal mode" })

-- TIP: Disable arrow keys in normal mode
vim.keymap.set("n", "<left>", '<cmd>echo "Use h to move!!"<CR>')
vim.keymap.set("n", "<right>", '<cmd>echo "Use l to move!!"<CR>')
vim.keymap.set("n", "<up>", '<cmd>echo "Use k to move!!"<CR>')
vim.keymap.set("n", "<down>", '<cmd>echo "Use j to move!!"<CR>')

-- Keybinds to make split navigation easier.
--  Use CTRL+<hjkl> to switch between windows
--
--  See `:help wincmd` for a list of all window commands
--vim.keymap.set("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
--vim.keymap.set("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
--vim.keymap.set("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
--vim.keymap.set("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })

vim.keymap.set("n", "<M-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
vim.keymap.set("n", "<M-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
vim.keymap.set("n", "<M-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
vim.keymap.set("n", "<M-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })

vim.keymap.set("n", "<leader>pq", vim.cmd.Explore)

-- Remap for dealing with word wrap
vim.keymap.set("n", "k", "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
vim.keymap.set("n", "j", "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })

-- move a selection up and down
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- greatest remap ever, also not sure
-- vim.keymap.set("x", "<leader>p", "\"_dP")

vim.keymap.set("n", "<M-[>", "<c-w>5<")
vim.keymap.set("n", "<M-]>", "<c-w>5>")
vim.keymap.set("n", "<M-t>", "<c-W>+")
vim.keymap.set("n", "<M-b>", "<c-W>-")

-- This is going to get me cancelled
vim.keymap.set("i", "<C-c>", "<Esc>")

-- thank theprimeagen later
vim.keymap.set("n", "<leader>re", "oif err != nil {<CR>}<ESC>Oreturn err")

-- wiki
vim.keymap.set("n", "<leader>ww", vim.cmd.WikiIndex, { noremap = true, silent = true, desc = "Open Wiki" })
vim.keymap.set("n", "<leader>mj", vim.cmd.WikiJournal, { noremap = true, silent = true, desc = "[M]ake [J]ournal" })
vim.keymap.set(
	"n",
	"<leader>ji",
	vim.cmd.WikiJournalIndex,
	{ noremap = true, silent = true, desc = "Make [J]ournal [I]ndex" }
)

-- diffview
-- vim.keymap.set("n", "<leader>vf", "<cmd>DiffviewFileHistory %<CR>")
-- vim.keymap.set("n", "<leader>vb", "<cmd>DiffviewFileHistory<CR>")
-- vim.keymap.set("n", "<leader>vc", "<cmd>DiffviewClose<CR>")

-- zenmode
vim.keymap.set("n", "<leader>zm", "<cmd>ZenMode<CR>")

-- undo tree
-- vim.keymap.set("n", "<leader>u", vim.cmd.UndotreeToggle)

-- oil
vim.keymap.set("n", "<leader>o", "<CMD>Oil<CR>", { desc = "Open parent directory" })

-- lazygit
vim.keymap.set("n", "<leader>gg", "<CMD>LazyGit<CR>", { desc = "Open lazygit" })

-- hightlight on yank
vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking (copying) text",
	group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})

-- grug far
vim.keymap.set("n", "<leader>rg", "<cmd>GrugFar<CR>")

-- obsidian
vim.keymap.set(
	"n",
	"<leader>ob",
	":e ~/vaults/work/index.md<CR>",
	{ noremap = true, silent = true, desc = "Open Obsidian" }
)
