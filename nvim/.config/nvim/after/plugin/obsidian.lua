require("obsidian").setup({
    dir = "~/obsidian/mbv/",
    completion = {
        nvim_cmp = true, -- if using nvim-cmp, otherwise set to false
    },
    daily_notes = {
        folder = "daily-thoughts/",
    }
})
