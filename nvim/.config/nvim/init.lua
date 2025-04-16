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

-- require("lazy").setup({ import = "plugins" }, { 
-- 	-- concurrenty = 1,
-- 	-- git = {
-- 	-- 	throttle = {
-- 	--       		enabled = true, -- not enabled by default
-- 	--       		-- max 2 ops every 5 seconds
-- 	--       		rate = 1,
-- 	--       		duration = 15 * 1000, -- in ms
-- 	--     	},
-- 	-- },
-- 	-- change_detection = { notify = true }
-- 	checker = { enabled = true },
-- })


-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    -- import your plugins
    { import = "plugins" },
  },
  -- Configure any other settings here. See the documentation for more details.
  -- colorscheme that will be used when installing plugins.
  -- install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = false },
})

require("avante_lib").load()
-- local zm = require("zen-mode")
-- vim.schedule(zm.toggle)
