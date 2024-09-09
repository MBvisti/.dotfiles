return {
	"MagicDuck/grug-far.nvim",
	config = function()
		-- local gf = require("grug-far")
		-- vim.api.nvim_create_autocmd("FileType", {
		-- 	group = vim.api.nvim_create_augroup("custom-grug-far-cmds", { clear = true }),
		-- 	pattern = { "grug-far" },
		-- 	callback = function(event)
		-- 		local map = function(keys, func, desc)
		-- 			vim.keymap.set("n", keys, func, { buffer = event.buf, desc = "GRUD_FAR: " .. desc })
		-- 		end
		-- 		map(
		-- 			"<leader>zz",
		-- 			gf.grug_far({
		-- 				prefills = { search = vim.fn.expand("<cword>") },
		-- 				"Search and Replace Current Word",
		-- 			})
		-- 		)
		-- 		map("<leader>zl", gf.open_instance("yo"))
		-- 	end,
		-- })
		require("grug-far").setup({
			engine = "ripgrep",
		})
	end,
}
