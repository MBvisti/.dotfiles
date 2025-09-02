require("options")
require("keymaps")
-- require("util.hjkl_notifier")

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"--branch=stable",
		lazyrepo,
		lazypath,
	})
end

---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

vim.g.lazyvim_check_order = false

require("lazy").setup({
	spec = {
		-- Add LazyVim plugin with news disabled
		-- { 
		-- 	"LazyVim/LazyVim", 
		-- 	-- import = "lazyvim.plugins",
		-- 	opts = {
		-- 		news = {
		-- 			lazyvim = false,  -- Disable LazyVim news/welcome messages
		-- 			neovim = false,   -- Also disable Neovim news if desired
		-- 		},
		-- 	}
		-- },
		{ import = "plugins" },
	},
	checker = { enabled = false },
})

-- require("lazy").setup({
-- 	spec = {
--
-- 	    news = {
--         	lazyvim = false,  -- Disable LazyVim news/welcome messages
--         	neovim = false,   -- Also disable Neovim news if desired
--         },
-- 		{ import = "plugins" },
-- 	},
-- 	checker = { enabled = false },
-- })
