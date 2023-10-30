local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not vim.loop.fs_stat(lazypath) then
    vim.fn.system({
        "git",
        "clone",
        "--filter=blob:none",
        "https://github.com/folke/lazy.nvim.git",
        "--branch=stable", -- latest stable release
        lazypath,
    })
end

vim.opt.rtp:prepend(lazypath)

require("mbvisti")

require("lazy").setup({
    "ellisonleao/gruvbox.nvim",
    { "catppuccin/nvim",      name = "catppuccin", priority = 1000 },
    { "AlexvZyl/nordic.nvim", branch = 'main' },
    "sainnhe/gruvbox-material",
    "sainnhe/everforest",
    "rebelot/kanagawa.nvim",

    "dnlhc/glance.nvim",

    "m4xshen/hardtime.nvim",

    { 'onsails/lspkind.nvim' },

    {
        "zbirenbaum/copilot.lua",
        cmd = "Copilot",
        event = "InsertEnter",
        config = function()
            require("copilot").setup({
                panel = {
                    enabled = false,
                    auto_refresh = false,
                    keymap = {
                        jump_prev = "[[",
                        jump_next = "]]",
                        accept = "<CR>",
                        refresh = "gr",
                        open = "<M-a>"
                    },
                    layout = {
                        position = "bottom", -- | top | left | right
                        ratio = 0.4
                    },
                },
                suggestion = {
                    enabled = true,
                    auto_trigger = true,
                    debounce = 75,
                    keymap = {
                        accept = "<M-CR>", -- means <Alt+a>
                        accept_word = false,
                        accept_line = false,
                        next = "<M-]>",
                        prev = "<M-[>",
                        dismiss = "<C-]>",
                    },
                },
                filetypes = {
                    yaml = false,
                    markdown = false,
                    help = false,
                    gitcommit = false,
                    gitrebase = false,
                    hgcommit = false,
                    svn = false,
                    cvs = false,
                    vimwiki = false,
                    ["."] = false,
                },
                copilot_node_command = 'node', -- Node.js version must be > 16.x
                server_opts_overrides = {},

            })
        end,
    },
    -- {
    --     "zbirenbaum/copilot-cmp",
    --     config = function()
    --         require("copilot_cmp").setup()
    --     end
    -- },

    "tpope/vim-fugitive",
    "airblade/vim-gitgutter",
    "sindrets/diffview.nvim",

    "nvim-lua/plenary.nvim",
    {
        'nvim-telescope/telescope.nvim',
        tag = '0.1.3',
        dependencies = { 'nvim-lua/plenary.nvim' }
    },

    "mbbill/undotree",

    {
        "ray-x/go.nvim",
        dependencies = { -- optional packages
            "ray-x/guihua.lua",
            "neovim/nvim-lspconfig",
            "nvim-treesitter/nvim-treesitter",
        },
        config = function()
            require("go").setup()
            local format_sync_grp = vim.api.nvim_create_augroup("GoImport", {})
            vim.api.nvim_create_autocmd("BufWritePre", {
                pattern = "*.go",
                callback = function()
                    require('go.format').goimport()
                end,
                group = format_sync_grp,
            })
            -- require("go.format").goimport()
        end,
        event = { "CmdlineEnter" },
        ft = { "go", 'gomod' },
        build = ':lua require("go.install").update_all_sync()' -- if you need to install/update all binaries
    },

    "neovim/nvim-lspconfig",
    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
    "hrsh7th/nvim-cmp",
    "hrsh7th/cmp-nvim-lsp",
    "L3MON4D3/LuaSnip",

    {
        "nvim-treesitter/nvim-treesitter",
        cmd = "TSUpdate",
    },
    "nvim-treesitter/nvim-treesitter-context",
    "nvim-treesitter/nvim-treesitter-textobjects",

    "ThePrimeagen/harpoon",

    "simrat39/rust-tools.nvim",

    { "lukas-reineke/indent-blankline.nvim", main = "ibl", opts = {} },

    "nvim-lualine/lualine.nvim",

    "nvim-tree/nvim-web-devicons",
    "folke/trouble.nvim",

    "vimwiki/vimwiki",

    "tpope/vim-commentary",

    {
        'stevearc/dressing.nvim',
        opts = {},
    },
    "mhartington/formatter.nvim",

    "NoahTheDuke/vim-just"
})
