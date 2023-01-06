require'nvim-treesitter.configs'.setup {
  -- A list of parser names, or "all"
  ensure_installed = { 
	  "go", "bash", "css", "dockerfile", "gomod", "html", 
	  "json", "javascript", "make",  "help", "lua", "rust",
	  "typescript", "yaml", "toml"
  },

  -- Install parsers synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- Automatically install missing parsers when entering buffer
  -- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
  auto_install = false,

  highlight = {
    -- `false` will disable the whole extension
    enable = true,

    additional_vim_regex_highlighting = false,
  },
}

-- OLD --
---- Treesitter configuration
--require('nvim-treesitter.configs').setup {
--  -- One of "all", "maintained" (parsers with maintainers), or a list of languages
--  ensure_installed = {
--      "go", "lua", "bash", "css", "dockerfile", "gomod", "gowork", "html", 
--      "json", "javascript", "make", "markdown", "rust", "svelte", "tsx", 
--      "typescript", "yaml", "vim", "toml", "graphql", "hcl"
--  },
--  sync_install = true,
--  highlight = {
--    enable = true, -- false will disable the whole extension
--  },
--  incremental_selection = {
--    enable = true,
--    keymaps = {
--      init_selection = 'gnn',
--      node_incremental = 'grn',
--      scope_incremental = 'grc',
--      node_decremental = 'grm',
--    },
--  },
--  indent = {
--    enable = true,
--  },
--  textobjects = {
--    select = {
--      enable = true,
--      lookahead = true, -- Automatically jump forward to textobj, similar to targets.vim
--      keymaps = {
--        -- You can use the capture groups defined in textobjects.scm
--        ['af'] = '@function.outer',
--        ['if'] = '@function.inner',
--        ['ac'] = '@class.outer',
--        ['ic'] = '@class.inner',
--      },
--    },
--    move = {
--      enable = true,
--      set_jumps = true, -- whether to set jumps in the jumplist
--      goto_next_start = {
--        [']m'] = '@function.outer',
--        [']]'] = '@class.outer',
--      },
--      goto_next_end = {
--        [']M'] = '@function.outer',
--        [']['] = '@class.outer',
--      },
--      goto_previous_start = {
--        ['[m'] = '@function.outer',
--        ['[['] = '@class.outer',
--      },
--      goto_previous_end = {
--        ['[M'] = '@function.outer',
--        ['[]'] = '@class.outer',
--      },
--    },
--  },
--}
