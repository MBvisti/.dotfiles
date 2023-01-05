vim.opt.guicursor = ""

vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 12
vim.opt.sidescrolloff = 5
vim.opt.signcolumn = "yes"

vim.opt.updatetime = 1000
vim.opt.colorcolumn = "120" -- sets the separator bar

vim.opt.errorbells = false

vim.g.mapleader = ' '

vim.opt.spell = true
vim.opt.spelllang = "en_us"

vim.opt.encoding = "utf-8"
vim.opt.cursorline = true

-- highlight on yank
vim.cmd [[
  augroup YankHighlight
    autocmd!
    autocmd TextYankPost * silent! lua vim.highlight.on_yank()
  augroup end
]]

-- OLD --
--vim.opt.wildmenu = true
--vim.opt.wildmode = "longest:full,full"
--
--vim.opt.redrawtime = 10000
--
--vim.opt.syntax = "on"
--
--vim.opt.fileencoding = "utf-8"
--
---- vim.opt.conceallevel = 0 -- makes it so I can see everything in markdown
--
--vim.opt.mouse = "nv"
--
---- set leader key

-- netwr
--vim.g.netrw_browse_split = 0
--vim.g.netrw_liststyle = 3
vim.g.netrw_banner = 0
vim.g.netrw_winsize= 25

-- vim-go
--vim.g.go_diagnostics_enabled = 0
--vim.g.go_metalinter_enabled = 0
--vim.g.go_def_mapping_enabled = 0
--vim.g.go_gopls_enabled = 1
--vim.g.go_code_completion_enabled = 0
--vim.g.go_doc_popup_window = 0
--vim.g.go_jump_to_error = 0
---- vim.g.go_fmt_command = "goimports"
--vim.g.go_auto_sameids = 0
--vim.g.go_fmt_command="gopls"
--vim.g.go_gopls_gofumpt=1

---- git-gutter
--vim.g.gitgutter_async = 0

---- ctrlp 
--vim.g.ctrlp_use_catching = 0

-- vimwiki
vim.cmd [[
    let g:vimwiki_list = [{'path': '~/vimwiki/', 'syntax': 'markdown', 'ext': '.md'}]
    au FileType vimwiki setlocal shiftwidth=6 tabstop=6 noexpandtab
]]
--vim.cmd [[
--    let g:vimwiki_tag_format = {'pre': '\(^[ -]*tags\s*:.*\)\@<=', 'pre_mark': '', 'post_mark': '', 'sep': '>><<'}
--]]

vim.cmd('filetype plugin on')
vim.cmd('syntax on')
vim.cmd('set nocompatible')
