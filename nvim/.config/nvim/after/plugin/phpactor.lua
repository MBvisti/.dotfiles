require("phpactor").setup({
  -- your configuration comes here
  -- or leave it empty to use the default settings
  -- refer to the configuration section below
  install = {
    bin = "/usr/bin/phpactor",
  },
  lspconfig = {
    options = {
        on_attach = OnAttachGlobal,
        init_options = {
          ['language_server_phpstan.enabled'] = false,
          ['phpunit.enabled'] = false,
        },
        --capabilities = Cmp_Mappings,
    }
  }
})
