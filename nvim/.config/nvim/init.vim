"-----------------------------------------
" GENERAL SETTINGS
"-----------------------------------------
set hidden
set laststatus=2
set wildmenu
set colorcolumn=90
set noerrorbells
set number
set cursorline
set background=dark
set title
set makeprg=make
set noswapfile
set nobackup
filetype plugin indent on
set autoindent
set completeopt=menu,menuone,noselect
set tabstop=4 
set softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set nowrap
set mouse=nv
set incsearch
set splitright
set tw=80 " setting the text to 80 chars
set wildmode=longest:full,full
set smartcase
set nohlsearch
set encoding=utf-8
set scrolloff=12
set sidescrolloff=5
syntax on
set signcolumn=yes:2
set confirm
set termguicolors
set guicursor=
set undofile
set undodir=~/.vim/undodir
set updatetime=300
set redrawtime=10000
set backupdir=~/.config/nvim/backup//

"-----------------------------------------
" PLUGINS
"-----------------------------------------
set rtp +=~/.vim
call plug#begin('~/.config/nvim/plugged')

Plug 'kyazdani42/nvim-web-devicons'
" Plug 'ajmwagar/vim-deus'
Plug 'catppuccin/nvim', {'as': 'catppuccin'}
Plug 'jremmen/vim-ripgrep'
Plug 'tpope/vim-fugitive'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'mbbill/undotree'
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'
Plug 'L3MON4D3/LuaSnip'
Plug 'saadparwaiz1/cmp_luasnip'
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope.nvim'
Plug 'nvim-telescope/telescope-fzf-native.nvim', { 'do': 'make' }
Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}  " We recommend updating the parsers on update 
Plug 'leafOfTree/vim-svelte-plugin'
Plug 'liuchengxu/vim-which-key'
Plug 'airblade/vim-gitgutter' " used to get icons based on changes
Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
Plug 'nvim-lualine/lualine.nvim'
" If you want to have icons in your statusline choose one of these
Plug 'kyazdani42/nvim-web-devicons'
Plug 'rhysd/git-messenger.vim' " get commit msg in pop-up window
Plug 'akinsho/toggleterm.nvim'

call plug#end()

"-----------------------------------------
" COLOR SCHEME
"-----------------------------------------
lua << EOF
local catppuccin = require("catppuccin")

-- configure it
catppuccin.setup()
EOF

colorscheme catppuccin

"-----------------------------------------
" TELESCOPE
"-----------------------------------------
lua << EOF
require('telescope').setup{
  defaults = {
    -- Default configuration for telescope goes here:
    -- config_key = value,
      file_sorter = require('telescope.sorters').get_fzy_sorter,
      promt_prefix = ' >',
      color_devicons = true,

      file_previewer = require('telescope.previewers').vim_buffer_cat.new,
      grep_previewer = require('telescope.previewers').vim_buffer_vimgrep.new,
      qflist_previewer = require('telescope.previewers').vim_buffer_qflist.new,

      mappings = {
          i = {
              ["<C-x>"] = false,
          },
       }
  },
  extensions = {
    -- Your extension configuration goes here:
    -- extension_name = {
    --   extension_config_key = value,
    -- }
    -- please take a look at the readme of the extension you want to configure
    fzy_native = {
        override_generic_sorter = false,
        override_file_sorter = true,
    }
  }
}
EOF

"-----------------------------------------
" TREESITTER
"-----------------------------------------
lua <<EOF
require'nvim-treesitter.configs'.setup {
  -- One of "all", "maintained" (parsers with maintainers), or a list of languages
  ensure_installed = {
      "go", "lua", "bash", "css", "dockerfile", "gomod", "gowork", "html", 
      "json", "javascript", "make", "markdown", "rust", "svelte", "tsx", 
      "typescript", "yaml", "vim"
  },

  -- Install languages synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- List of parsers to ignore installing
  ignore_install = { "" },

  highlight = {
    -- `false` will disable the whole extension
    enable = true,

    -- list of language that will be disabled
    disable = { "c" },

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
  },

  indent = {
    enable = true,
  }
}
EOF
"-----------------------------------------
" LUA LINE
"-----------------------------------------
lua << END
local status, lualine = pcall(require, "lualine")
if (not status) then return end

lualine.setup {
  options = {
    icons_enabled = true,
    section_separators = {left = '', right = ''},
    component_separators = {left = '', right = ''},
    disabled_filetypes = {}
  },
  sections = {
    lualine_a = {'mode'},
    lualine_b = {'branch'},
    lualine_c = {{
      'filename',
      file_status = true, -- displays file status (readonly status, modified status)
      path = 0 -- 0 = just filename, 1 = relative path, 2 = absolute path
    }},
    lualine_x = {
      { 'diagnostics', sources = {"coc"}, symbols = {error = ' ', warn = ' ', info = ' ', hint = ' '} },
      'encoding',
      'filetype'
    },
    lualine_y = {'progress'},
    lualine_z = {'location'}
  },
  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = {{
      'filename',
      file_status = true, -- displays file status (readonly status, modified status)
      path = 1 -- 0 = just filename, 1 = relative path, 2 = absolute path
    }},
    lualine_x = {'location'},
    lualine_y = {},
    lualine_z = {}
  },
  tabline = {},
  extensions = {'fugitive'}
}
END

"-----------------------------------------
" KEY MAPPINGS
"-----------------------------------------
let mapleader = ' '
nnoremap <leader>h :wincmd h<CR>
nnoremap <leader>j :wincmd j<CR>
nnoremap <leader>k :wincmd k<CR>
nnoremap <leader>l :wincmd l<CR>
nnoremap <leader>u :UndotreeShow<CR>
nnoremap <leader>pv :wincmd v<bar> :Ex <bar> :vertical resize 30<CR>

nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>

if executable('rg')
    let g:rg_derive_root='root'
endif

let g:ctrlp_user_command = ['.git/', 'git --git-dir=%/.git ls-files -oc --exclude-standard']

"-----------------------------------------
" NETWR CONFIGS  
"-----------------------------------------
let g:netrw_browse_split = 3
let g:netrw_liststyle = 3
let g:netwr_banner = 0
let g:netrw_winsize=25

let g:ctrlp_use_catching = 0

"-----------------------------------------
" VIM-GO CONFIGS
"-----------------------------------------
let g:go_diagnostics_enabled = 0
let g:go_metalinter_enabled = 0
let g:go_def_mapping_enabled = 0
let g:go_gopls_enabled = 1
let g:go_code_completion_enabled = 0
let g:go_doc_popup_window = 0
let g:go_jump_to_error = 0
let g:go_fmt_command = "goimports"
let g:go_auto_sameids = 0

"-----------------------------------------
" GIT GUTTER 
"-----------------------------------------
let g:gitgutter_async=0


"-----------------------------------------
" LSP CONFIG 
"-----------------------------------------
lua << EOF
local nvim_lsp = require('lspconfig')

-- Use an on_attach function to only map the following keys
-- after the language server attaches to the current buffer
local on_attach = function(client, bufnr)
  local function buf_set_keymap(...) vim.api.nvim_buf_set_keymap(bufnr, ...) end
  local function buf_set_option(...) vim.api.nvim_buf_set_option(bufnr, ...) end

  -- Enable completion triggered by <c-x><c-o>
  buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')

  -- Mappings: not working, maybe switch entirely to .lua
  -- local opts = { noremap=true, silent=true }

  -- See `:help vim.lsp.*` for documentation on any of the below functions
end

vim.diagnostic.config({
  virtual_text = true,
  signs = true,
  underline = true,
  update_in_insert = false,
  severity_sort = false,
})

-- Use a loop to conveniently call 'setup' on multiple servers and
-- map buffer local keybindings when the language server attaches
local servers = { 'gopls', 'tailwindcss', 'dockerls', 'tsserver', 'svelte', 'sqlls', 'eslint'}
for _, lsp in ipairs(servers) do
  nvim_lsp[lsp].setup {
    on_attach = on_attach,
    flags = {
      debounce_text_changes = 150,
    }
  }
end
EOF

nnoremap <silent> gd <cmd>lua vim.lsp.buf.definition()<CR>
nnoremap <silent> gD <cmd>lua vim.lsp.buf.declaration()<CR>
nnoremap <silent> gr <cmd>lua vim.lsp.buf.references()<CR>
nnoremap <silent> gi <cmd>lua vim.lsp.buf.implementation()<CR>
nnoremap <silent> sd <cmd>lua vim.lsp.buf.hover()<CR>
nnoremap <silent> <C-k> <cmd>lua vim.lsp.buf.signature_help()<CR>
nnoremap <silent> <C-n> <cmd>lua vim.lsp.diagnostic.goto_prev()<CR>
nnoremap <silent> <C-p> <cmd>lua vim.lsp.diagnostic.goto_next()<CR>

"-----------------------------------------
" AUTOCOMPLETE CONFIG 
"-----------------------------------------
lua << EOF
-- Add additional capabilities supported by nvim-cmp
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities = require('cmp_nvim_lsp').update_capabilities(capabilities)


local lspconfig = require('lspconfig')

-- Enable some language servers with the additional completion capabilities offered by nvim-cmp
local servers = { 'gopls', 'tailwindcss', 'dockerls', 'tsserver', 'svelte', 'sqlls', 'eslint' }
for _, lsp in ipairs(servers) do
  lspconfig[lsp].setup {
    -- on_attach = my_custom_on_attach,
    capabilities = capabilities,
  }
end

-- Set completeopt to have a better completion experience

-- luasnip setup
local luasnip = require 'luasnip'

-- nvim-cmp setup
local cmp = require 'cmp'
cmp.setup {
  snippet = {
    expand = function(args)
      require('luasnip').lsp_expand(args.body)
    end,
  },
  mapping = {
    ['<C-p>'] = cmp.mapping.select_prev_item(),
    ['<C-n>'] = cmp.mapping.select_next_item(),
    ['<C-d>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.close(),
    ['<CR>'] = cmp.mapping.confirm {
      behavior = cmp.ConfirmBehavior.Replace,
      select = true,
    },
    ['<Tab>'] = function(fallback)
      if cmp.visible() then
        cmp.select_next_item()
      elseif luasnip.expand_or_jumpable() then
        luasnip.expand_or_jump()
      else
        fallback()
      end
    end,
    ['<S-Tab>'] = function(fallback)
      if cmp.visible() then
        cmp.select_prev_item()
      elseif luasnip.jumpable(-1) then
        luasnip.jump(-1)
      else
        fallback()
      end
    end,
  },
  sources = {
    { name = 'nvim_lsp' },
    { name = 'luasnip' },
  },
}
EOF

"-----------------------------------------
" TOGGLE TERM
"-----------------------------------------
lua << EOF
local status_ok, toggleterm = pcall(require, "toggleterm")
if not status_ok then
    return
end

toggleterm.setup({
    size = 60,
    open_mapping = [[<c-t>]],
    hide_numbers = true,
    shade_filetypes = {},
    shading_factor = 2,
    start_in_insert = true,
    insert_mappings = true,
    direction = "vertical",
    close_on_exit = true,
    shell = vim.o.shell,
    float_ops = {
        border = "curved",
        winblend = 0,
        highlights = {
            border = "Normal",
            background = "Normal",
        }
    }
})

function _G.set_terminal_keymaps()
    local opts = {noremap = true}
    vim.api.nvim_buf_set_keymap(0, 't', '<esc>', [[<C-\><C-n>]], opts)
end

vim.cmd('autocmd! TermOpen term://* lua set_terminal_keymaps()')
local Terminal = require("toggleterm.terminal").Terminal

EOF
