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
    -- "ellisonleao/gruvbox.nvim",
    -- { "catppuccin/nvim",      name = "catppuccin", priority = 1000 },
    -- { "AlexvZyl/nordic.nvim", branch = 'main' },
    "sainnhe/gruvbox-material",
    -- "sainnhe/everforest",
    -- "rebelot/kanagawa.nvim",

    "dnlhc/glance.nvim",

    {
        "hinell/lsp-timeout.nvim",
        dependencies = { "neovim/nvim-lspconfig" }
    },

    "github/copilot.vim",

    {
        "folke/twilight.nvim",
        opts = {
            dimming = {
                alpha = 0.25, -- amount of dimming
                -- we try to get the foreground from the highlight groups or fallback color
                color = { "Normal", "#ffffff" },
                term_bg = "#000000", -- if guibg=NONE, this will be used to calculate text color
                inactive = false,    -- when true, other windows will be fully dimmed (unless they contain the same buffer)
            },
            context = 10,            -- amount of lines we will try to show around the current line
            treesitter = true,       -- use treesitter when available for the filetype
            -- treesitter is used to automatically expand the visible text,
            -- but you can further control the types of nodes that should always be fully expanded
            expand = { -- for treesitter, we we always try to expand to the top-most ancestor with these types
                "function",
                "method",
                "table",
                "if_statement",
            },
            exclude = {}, -- exclude these filetypes
        }
    },

    "m4xshen/hardtime.nvim",

    { 'onsails/lspkind.nvim' },

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
    -- "nvim-treesitter/nvim-treesitter-textobjects",

    -- "ThePrimeagen/harpoon",

    -- "simrat39/rust-tools.nvim",

    { "lukas-reineke/indent-blankline.nvim", main = "ibl", opts = {} },

    "nvim-lualine/lualine.nvim",

    -- {
        'stevearc/oil.nvim',
    --     opts = {},
    --     -- Optional dependencies
    --     -- dependencies = { "nvim-tree/nvim-web-devicons" },
    -- },

    -- "nvim-tree/nvim-web-devicons",
    -- "folke/trouble.nvim",

    "vimwiki/vimwiki",

    "tpope/vim-commentary",

    {
        'stevearc/dressing.nvim',
        opts = {},
    },

    "mhartington/formatter.nvim",

    "NoahTheDuke/vim-just",

    {
        "folke/zen-mode.nvim",
        opts = {
            window = {
                backdrop = 0.95, -- shade the backdrop of the Zen window. Set to 1 to keep the same as Normal
                -- height and width can be:
                -- * an absolute number of cells when > 1
                -- * a percentage of the width / height of the editor when <= 1
                -- * a function that returns the width or the height
                width = 1,  -- width of the Zen window
                height = 1, -- height of the Zen window
                -- by default, no options are changed for the Zen window
                -- uncomment any of the options below, or add other vim.wo options you want to apply
                options = {
                    signcolumn = "yes", -- disable signcolumn
                    -- number = false, -- disable number column
                    -- relativenumber = false, -- disable relative numbers
                    cursorline = false,   -- disable cursorline
                    cursorcolumn = false, -- disable cursor column
                    -- foldcolumn = "0", -- disable fold column
                    -- list = false, -- disable whitespace characters
                },
            },
            plugins = {
                -- disable some global vim options (vim.o...)
                -- comment the lines to not apply the options
                options = {
                    enabled = true,
                    ruler = false,   -- disables the ruler text in the cmd line area
                    showcmd = false, -- disables the command in the last line of the screen
                    -- you may turn on/off statusline in zen mode by setting 'laststatus'
                    -- statusline will be shown only if 'laststatus' == 3
                    laststatus = 0,             -- turn off the statusline in zen mode
                },
                twilight = { enabled = false }, -- enable to start Twilight when zen mode opens
                gitsigns = { enabled = true },  -- disables git signs
                tmux = { enabled = true },      -- disables the tmux statusline
                -- this will change the font size on kitty when in zen mode
                -- to make this work, you need to set the following kitty options:
                -- - allow_remote_control socket-only
                -- - listen_on unix:/tmp/kitty
                -- kitty = {
                --     enabled = true,
                --     font = "+4", -- font size increment
                -- },
            },
        }
    },

    {
        "vrischmann/tree-sitter-templ",
        config = function()
            require("tree-sitter-templ").setup({})
        end
    },

    {
        'mrcjkb/rustaceanvim',
        version = '^3', -- Recommended
        ft = { 'rust' },
    }
})
