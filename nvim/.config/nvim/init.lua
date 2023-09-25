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

    "gbprod/phpactor.nvim",

    "tpope/vim-fugitive",
    "airblade/vim-gitgutter",
    "sindrets/diffview.nvim",

    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",

    "mbbill/undotree",

    {
        "ray-x/go.nvim",
        dependencies = { -- optional packages
            "ray-x/guihua.lua",
        },
        config = function()
            require("go").setup()
        end,
        event = { "CmdlineEnter" },
        ft = { "go", 'gomod' },
        build = ':lua require("go.install").update_all_sync()' -- if you need to install/update all binaries
    },

    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
    "neovim/nvim-lspconfig",

    "hrsh7th/nvim-cmp",
    "hrsh7th/cmp-buffer",
    "hrsh7th/cmp-path",
    "saadparwaiz1/cmp_luasnip",
    "hrsh7th/cmp-nvim-lsp",
    "hrsh7th/cmp-nvim-lua",

    "L3MON4D3/LuaSnip",
    "rafamadriz/friendly-snippets",

    "VonHeikemen/lsp-zero.nvim",

    {
        "nvim-treesitter/nvim-treesitter",
        cmd = "TSUpdate",
    },
    "nvim-treesitter/nvim-treesitter-context",
    "nvim-treesitter/nvim-treesitter-textobjects",

    "ThePrimeagen/harpoon",

    "simrat39/rust-tools.nvim",

    "lukas-reineke/indent-blankline.nvim",

    "nvim-lualine/lualine.nvim",

    "nvim-tree/nvim-web-devicons",
    "folke/trouble.nvim",

    "vimwiki/vimwiki",

    "tpope/vim-commentary",

    "stevearc/dressing.nvim",

    "mhartington/formatter.nvim",

    "NoahTheDuke/vim-just"
})
