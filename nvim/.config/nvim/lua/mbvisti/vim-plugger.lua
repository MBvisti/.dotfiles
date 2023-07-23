local Plug = vim.fn['plug#']

vim.call('plug#begin', '~/.config/nvim/plugged')

-- letting AI into my code
-- Plug ('github/copilot.vim', {['branch'] = 'release'})
Plug 'zbirenbaum/copilot.lua'

-- colorschemas
Plug 'ellisonleao/gruvbox.nvim'

Plug ('catppuccin/nvim', {['as'] = 'catppuccin'})
Plug ('AlexvZyl/nordic.nvim', { ['branch'] = 'main' })
Plug 'sainnhe/gruvbox-material'
Plug 'sainnhe/everforest'
-- Plug 'rebelot/kanagawa.nvim'
-- Plug ('folke/tokyonight.nvim', { ['branch'] = 'main' })
-- Plug 'morhetz/gruvbox'

-- glaaaaance
Plug 'dnlhc/glance.nvim'

--Plug 'ja-ford/delaytrain.nvim'
-- -- Plug 'ThePrimeagen/vim-be-good'
Plug "m4xshen/hardtime.nvim"

-- phpactor
Plug 'gbprod/phpactor.nvim'


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

-- vim go
Plug 'ray-x/go.nvim'
-- Plug ('fatih/vim-go', { ['do'] = ':GoUpdateBinaries' })

-- lsp and auto complete
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
--Plug ('nvim-treesitter/nvim-treesitter', { ['commit'] = '23dfae4db84f71e2ddb56c024845b322035182ee'})
Plug 'nvim-treesitter/nvim-treesitter-context'
Plug 'nvim-treesitter/nvim-treesitter-textobjects'

-- harpoon
Plug 'ThePrimeagen/harpoon'

-- rust
Plug 'simrat39/rust-tools.nvim'

-- -- debuggin
-- Plug 'mfussenegger/nvim-dap'

-- indent line
Plug 'lukas-reineke/indent-blankline.nvim'

-- formatting
-- Plug 'jose-elias-alvarez/null-ls.nvim'

-- statusline
Plug 'nvim-lualine/lualine.nvim'
-- Plug 'kyazdani42/nvim-web-devicons'

-- trouble
Plug 'nvim-tree/nvim-web-devicons'
Plug 'folke/trouble.nvim'

-- vimwiki
Plug 'vimwiki/vimwiki'

-- misc
-- Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
-- Plug 'kosayoda/nvim-lightbulb'
-- Plug 'gennaro-tedesco/nvim-jqx'

-- UI stuff
Plug 'stevearc/dressing.nvim'

vim.call('plug#end')
