return {
	"OXY2DEV/markview.nvim",
	lazy = false,
	dependencies = {
		"nvim-treesitter/nvim-treesitter",
		"nvim-tree/nvim-web-devicons",
	},
	config = function()
		local markview = require("markview")
		local presets = require("markview.presets")

		markview.setup({
			experimental = { check_rtp_message = false },
			markdown = {
				headings = presets.headings.glow,
				checkboxes = {
					enable = true,

					checked = { text = "󰗠", hl = "MarkviewCheckboxChecked", scope_hl = "MarkviewCheckboxChecked" },
					unchecked = { text = "󰄰", hl = "MarkviewCheckboxUnchecked", scope_hl = "MarkviewCheckboxUnchecked" },

					["/"] = { text = "󱎖", hl = "MarkviewCheckboxPending" },
					[">"] = { text = "", hl = "MarkviewCheckboxCancelled" },
					["<"] = { text = "󰃖", hl = "MarkviewCheckboxCancelled" },
					["-"] = { text = "󰍶", hl = "MarkviewCheckboxCancelled", scope_hl = "MarkviewCheckboxStriked" },

					["?"] = { text = "󰋗", hl = "MarkviewCheckboxPending" },
					["!"] = { text = "󰀦", hl = "MarkviewCheckboxUnchecked" },
					["*"] = { text = "󰓎", hl = "MarkviewCheckboxPending" },
					['"'] = { text = "󰸥", hl = "MarkviewCheckboxCancelled" },
					["l"] = { text = "󰆋", hl = "MarkviewCheckboxProgress" },
					["b"] = { text = "󰃀", hl = "MarkviewCheckboxProgress" },
					["i"] = { text = "󰰄", hl = "MarkviewCheckboxChecked" },
					["S"] = { text = "", hl = "MarkviewCheckboxChecked" },
					["I"] = { text = "󰛨", hl = "MarkviewCheckboxPending" },
					["p"] = { text = "", hl = "MarkviewCheckboxChecked" },
					["c"] = { text = "", hl = "MarkviewCheckboxUnchecked" },
					["f"] = { text = "󱠇", hl = "MarkviewCheckboxUnchecked" },
					["k"] = { text = "", hl = "MarkviewCheckboxPending" },
					["w"] = { text = "", hl = "MarkviewCheckboxProgress" },
					["u"] = { text = "󰔵", hl = "MarkviewCheckboxChecked" },
					["d"] = { text = "󰔳", hl = "MarkviewCheckboxUnchecked" },
				}
			}
		})

		vim.cmd("Markview Enable")
	end,
}
