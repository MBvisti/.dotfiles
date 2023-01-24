local Plug = vim.fn['plug#']

vim.call('plug#begin', '~/.config/nvim/plugged')

-- colorschemas
-- Plug 'ellisonleao/gruvbox.nvim'

Plug ('catppuccin/nvim', {['as'] = 'catppuccin'})
Plug ('AlexvZyl/nordic.nvim', { ['branch'] = 'main' })
-- Plug 'rebelot/kanagawa.nvim'
-- Plug ('folke/tokyonight.nvim', { ['branch'] = 'main' })
-- Plug 'morhetz/gruvbox'

Plug 'ja-ford/delaytrain.nvim'
-- -- Plug 'ThePrimeagen/vim-be-good'

-- git
Plug 'tpope/vim-fugitive'
Plug 'airblade/vim-gitgutter'
Plug 'sindrets/diffview.nvim'

-- Plug 'ctrlpvim/ctrlp.vim'
-- Plug 'rhysd/git-messenger.vim' 

-- telescope
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope.nvim'

-- undotree
Plug 'mbbill/undotree'

-- Plug ('nvim-telescope/telescope-fzf-native.nvim', { ['do'] = 'make' })
-- Plug 'jremmen/vim-ripgrep'

-- -- vim go
-- Plug ('fatih/vim-go', { ['do'] = ':GoUpdateBinaries' })
Plug 'ray-x/go.nvim'

-- lsp and auto complete
--  - lsp support
Plug 'neovim/nvim-lspconfig'
Plug 'williamboman/mason.nvim'
Plug 'williamboman/mason-lspconfig.nvim'

--  - autocompletion
Plug 'hrsh7th/nvim-cmp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'saadparwaiz1/cmp_luasnip'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-nvim-lua'

-- - snippets
Plug 'L3MON4D3/LuaSnip'
Plug 'rafamadriz/friendly-snippets'

Plug 'VonHeikemen/lsp-zero.nvim'

-- treesitter
Plug ('nvim-treesitter/nvim-treesitter', { ['do'] = ':TSUpdate'})
Plug 'nvim-treesitter/nvim-treesitter-textobjects'

-- harpoon
Plug 'ThePrimeagen/harpoon'

-- rust
Plug 'simrat39/rust-tools.nvim'

-- -- debuggin
-- Plug 'mfussenegger/nvim-dap'

-- indent line
Plug 'lukas-reineke/indent-blankline.nvim'

-- -- formatting
-- -- Plug 'jose-elias-alvarez/null-ls.nvim'

-- statusline
Plug 'nvim-lualine/lualine.nvim'
Plug 'kyazdani42/nvim-web-devicons'

-- vimwiki
Plug 'vimwiki/vimwiki'

-- obsidian
Plug ('epwalsh/obsidian.nvim', { ['tag'] = 'v1.*' })

-- -- dadbod for database interaction
-- Plug 'tpope/vim-dadbod'
-- Plug 'kristijanhusak/vim-dadbod-ui'

-- -- misc
-- Plug 'tpope/vim-surround'
-- Plug 'tpope/vim-commentary'
-- Plug 'kosayoda/nvim-lightbulb'
-- Plug ('iamcco/markdown-preview.nvim', { ['do'] = 'cd app && yarn install'  })
-- Plug 'gennaro-tedesco/nvim-jqx'

-- UI stuff
Plug 'stevearc/dressing.nvim'
vim.call('plug#end')
