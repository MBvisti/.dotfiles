local Plug = vim.fn['plug#']

vim.call('plug#begin', '~/.config/nvim/plugged')

-- colorschema
-- Plug ('catppuccin/nvim', {['as'] = 'catppuccin'})
-- Plug 'ellisonleao/gruvbox.nvim'
Plug 'rebelot/kanagawa.nvim'

-- for working with git
Plug 'tpope/vim-fugitive'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'airblade/vim-gitgutter' 
Plug 'rhysd/git-messenger.vim' 

-- telescope
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope-ui-select.nvim'
Plug 'nvim-telescope/telescope.nvim'
Plug ('nvim-telescope/telescope-fzf-native.nvim', { ['do'] = 'make' })
Plug 'jremmen/vim-ripgrep'

-- vim go
Plug ('fatih/vim-go', { ['do'] = ':GoUpdateBinaries' })

-- lsp and auto complete
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/nvim-cmp'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'saadparwaiz1/cmp_luasnip'
Plug 'L3MON4D3/LuaSnip' -- Snippets plugin

-- treesitter
Plug ('nvim-treesitter/nvim-treesitter', { ['do'] = ':TSUpdate'})
Plug 'nvim-treesitter/nvim-treesitter-textobjects'

-- svelte
Plug 'leafOfTree/vim-svelte-plugin'

-- rust
Plug 'simrat39/rust-tools.nvim'

-- debuggin
Plug 'mfussenegger/nvim-dap'

-- indent line
Plug 'lukas-reineke/indent-blankline.nvim'

-- formatting
Plug 'jose-elias-alvarez/null-ls.nvim'

-- file navigation
-- Plug 'kyazdani42/nvim-tree.lua'

-- statusline
Plug 'nvim-lualine/lualine.nvim'

-- terminal
Plug 'akinsho/toggleterm.nvim'

-- vimwiki
Plug 'vimwiki/vimwiki'

-- misc
Plug 'liuchengxu/vim-which-key'
Plug 'mbbill/undotree'
Plug 'kyazdani42/nvim-web-devicons'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
Plug 'kosayoda/nvim-lightbulb'
Plug ('iamcco/markdown-preview.nvim', { ['do'] = 'cd app && yarn install'  })

vim.call('plug#end')
