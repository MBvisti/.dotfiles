local Plug = vim.fn['plug#']

vim.call('plug#begin', '~/.config/nvim/plugged')

--
-- colorschema
Plug ('catppuccin/nvim', {['as'] = 'catppuccin'})

-- for wokring with git
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
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'
Plug 'hrsh7th/cmp-vsnip'
Plug 'hrsh7th/vim-vsnip'

-- treesitter
Plug ('nvim-treesitter/nvim-treesitter', { ['do'] = ':TSUpdate'})

-- svelte
Plug 'leafOfTree/vim-svelte-plugin'

-- rust
Plug 'rust-lang/rust.vim'

-- debuggin
Plug 'mfussenegger/nvim-dap'

-- indent line
Plug 'lukas-reineke/indent-blankline.nvim'

-- formatting
Plug 'jose-elias-alvarez/null-ls.nvim'

-- misc
Plug 'liuchengxu/vim-which-key'
Plug 'mbbill/undotree'
Plug 'kyazdani42/nvim-web-devicons'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'

-- statusline
Plug 'nvim-lualine/lualine.nvim'

-- terminal
Plug 'akinsho/toggleterm.nvim'

vim.call('plug#end')
