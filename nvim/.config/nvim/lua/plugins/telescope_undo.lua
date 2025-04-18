return {
	"debugloop/telescope-undo.nvim",
	dependencies = { -- note how they're inverted to above example
		{
			"nvim-telescope/telescope.nvim",
			dependencies = { "nvim-lua/plenary.nvim" },
		},
	},
	keys = {
		{ -- lazy style key map
			"<leader>u",
			"<cmd>Telescope undo<cr>",
			desc = "undo history",
		},
	},
	opts = {
		extensions = {
			undo = {
				mappings = {
					i = {
						-- ["<cr>"] = require("telescope-undo.actions").yank_additions,
						-- ["<S-cr>"] = require("telescope-undo.actions").yank_deletions,
						-- ["<C-cr>"] = require("telescope-undo.actions").restore,
						-- alternative defaults, for users whose terminals do questionable things with modified <cr>
						-- ["<C-y>"] = require("telescope-undo.actions").yank_deletions,
						-- ["<C-r>"] = require("telescope-undo.actions").restore,
					},
					n = {
						-- ["y"] = require("telescope-undo.actions").yank_additions,
						-- ["Y"] = require("telescope-undo.actions").yank_deletions,
						-- ["u"] = require("telescope-undo.actions").restore,
					},
				},
			},
			-- no other extensions here, they can have their own spec too
		},
	},
	config = function(_, opts)
		-- Calling telescope's setup from multiple specs does not hurt, it will happily merge the
		-- configs for us. We won't use data, as everything is in it's own namespace (telescope
		-- defaults, as well as each extension).
		require("telescope").setup(opts)
		require("telescope").load_extension("undo")
	end,
}
