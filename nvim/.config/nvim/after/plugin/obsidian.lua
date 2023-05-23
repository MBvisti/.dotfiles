require("obsidian").setup({
    dir = "~/obsidian/mbv",
    completion = {
        nvim_cmp = true,     -- if using nvim-cmp, otherwise set to false
    },
    daily_notes = {
        folder = "daily-thoughts",
    },
    templates = {
        subdir = "templates",
        date_format = "%Y-%m-%d-%a",
        time_format = "%H:%M",
    },
    disable_frontmatter = true,
    finder = "telescope.nvim"
})
