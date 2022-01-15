local Plug = vim.fn['plug#']

vim.call('plug#begin', '~/.config/nvim/plugged')

Plug 'kyazdani42/nvim-web-devicons'
-- Plug 'ajmwagar/vim-deus'
Plug ('catppuccin/nvim', {['as'] = 'catppuccin'})
Plug 'jremmen/vim-ripgrep'
Plug 'tpope/vim-fugitive'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'mbbill/undotree'
Plug ('fatih/vim-go', { ['do'] = ':GoUpdateBinaries' })

Plug 'neovim/nvim-lspconfig'

Plug 'hrsh7th/cmp-nvim-lsp'

Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'

Plug 'hrsh7th/cmp-cmdline'

Plug 'hrsh7th/nvim-cmp'

Plug 'simrat39/rust-tools.nvim'

Plug 'hrsh7th/cmp-vsnip'

Plug 'hrsh7th/vim-vsnip'

Plug 'mfussenegger/nvim-dap'
Plug 'nvim-lua/plenary.nvim'

Plug 'nvim-telescope/telescope.nvim'
Plug ('nvim-telescope/telescope-fzf-native.nvim', { ['do'] = 'make' })

Plug ('nvim-treesitter/nvim-treesitter', { ['do'] = ':TSUpdate'})

Plug 'leafOfTree/vim-svelte-plugin'

Plug 'liuchengxu/vim-which-key'

Plug 'nvim-telescope/telescope-ui-select.nvim'

Plug 'airblade/vim-gitgutter' 

Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
Plug 'nvim-lualine/lualine.nvim'

Plug 'kyazdani42/nvim-web-devicons'
Plug 'rhysd/git-messenger.vim' 
Plug 'akinsho/toggleterm.nvim'

vim.call('plug#end')
