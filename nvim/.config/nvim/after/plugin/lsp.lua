local lsp = require('lsp-zero')

lsp.preset('recommended')

lsp.ensure_installed({
    'tsserver',
    'eslint',
    'sumneko_lua',
    'rust_analyzer',
    'jsonls',
    'html',
    --'marksman',
    'tailwindcss',
    'dockerls',
})

local cmp = require('cmp')
local cmp_select = { behavior = cmp.SelectBehavior.Select }
local cmp_mappings = lsp.defaults.cmp_mappings({
    ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
    ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
    ['<C-y>'] = cmp.mapping.confirm({ select = true }),
    ['<C-Space>'] = cmp.mapping.complete(),
})

lsp.set_preferences({
    configure_diagnostics = false,
    sign_icons = {}
})

lsp.setup_nvim_cmp({
    mapping = cmp_mappings
})

lsp.on_attach(function(_, _)
    local opts = { noremap = true, silent = true }

    vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
    vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
    vim.keymap.set("n", "<leader>ca", function() vim.lsp.buf.code_action() end, opts)
    vim.keymap.set("n", "<leader>d", function() vim.diagnostic.open_float() end, opts)
    vim.keymap.set("n", "<leader>rn", function() vim.lsp.buf.rename() end, opts)
    vim.keymap.set("n", "<C-p>", function() vim.diagnostic.goto_prev() end, opts)
    vim.keymap.set("n", "<C-n>", function() vim.diagnostic.goto_next() end, opts)
    vim.keymap.set("n", "gi", function() vim.lsp.buf.implementation() end, opts)
    vim.keymap.set("n", "<space>f", function() vim.lsp.buf.format() end, opts)
    vim.keymap.set('n', 'gr', function() vim.lsp.buf.references() end, opts)

    vim.keymap.set('n', '<leader>gi', function() require('telescope.builtin').lsp_implementations() end, opts)
    vim.keymap.set('n', '<leader>gr', function() require('telescope.builtin').lsp_references() end, opts)

    --vim.api.nvim_set_keymap('n', '<leader>sr', [[<cmd>lua require('telescope.builtin').lsp_references()<CR>]], { noremap = true, silent = true })
    -- vim_api.nvim_buf_set_keymap(bufnr, 'n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', opts)
    -- vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', opts)

end)

vim.diagnostic.config({
    virtual_text = true,
    signs = true,
    underline = true,
    update_in_insert = false,
    severity_sort = false,
})

lsp.setup()

-- OLD --
--local lspconfig = require 'lspconfig'
--local vim_api = vim.api
--
--require("mason").setup()
--require("mason-lspconfig").setup({
--    ensure_installed = { "sumneko_lua", "tailwindcss", "emmet_ls", "sqlls", "taplo", "jsonls", "marksman" }
--})
--
---- Use an on_attach function to only map the following keys
---- after the language server attaches to the current buffer
--local on_attach = function(_, bufnr)
--    local opts = { noremap = true, silent = true }
--
--    -- See `:help vim.lsp.*` for documentation on any of the below functions
--    -- vim.api.nvim_buf_set_keymap(bufnr, 'n', '<space>e', '<cmd>lua vim.diagnostic.open_float()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', 'di', '<cmd>lua vim.diagnostic.open_float()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', 'gd', '<cmd>lua vim.lsp.buf.definition()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', 'sd', '<cmd>lua vim.lsp.buf.hover()<CR>', opts)
--    -- vim.api.nvim_buf_set_keymap(bufnr, 'n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<C-k>', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>wa', '<cmd>lua vim.lsp.buf.add_workspace_folder()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>wr', '<cmd>lua vim.lsp.buf.remove_workspace_folder()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>wl',
--        '<cmd>lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>rn', '<cmd>lua vim.lsp.buf.rename()<CR>', opts)
--    -- vim.api.nvim_buf_set_keymap(bufnr, 'n', '<space>ca', '<cmd>lua vim.lsp.buf.code_action()<CR>', opts)
--    -- vim.api.nvim_buf_set_keymap(bufnr, 'n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<C-n>', '<cmd>lua vim.diagnostic.goto_prev()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<C-p>', '<cmd>lua vim.diagnostic.goto_next()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>q', '<cmd>lua vim.diagnostic.setloclist()<CR>', opts)
--    vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>f', '<cmd>lua vim.lsp.buf.format()<CR>', opts)
--
--    -- vim.api.nvim_buf_set_keymap(bufnr, 'n', '<space>ra', '<cmd>:RustHoverActions<CR>', opts)
--end
--
---- Add additional capabilities supported by nvim-cmp
--local capabilities = vim.lsp.protocol.make_client_capabilities()
--capabilities = require('cmp_nvim_lsp').default_capabilities(capabilities)
--
---- luasnip setup
--local luasnip = require 'luasnip' -- luasnip setup
--
---- nvim-cmp setup
--local cmp = require 'cmp'
--cmp.setup {
--    snippet = {
--        expand = function(args)
--            luasnip.lsp_expand(args.body)
--        end,
--    },
--    mapping = {
--        ['<C-p>'] = cmp.mapping.select_prev_item(),
--        ['<C-n>'] = cmp.mapping.select_next_item(),
--        ['<C-d>'] = cmp.mapping.scroll_docs(-4),
--        ['<C-f>'] = cmp.mapping.scroll_docs(4),
--        ['<C-Space>'] = cmp.mapping.complete(),
--        ['<C-e>'] = cmp.mapping.close(),
--        ['<CR>'] = cmp.mapping.confirm {
--            behavior = cmp.ConfirmBehavior.Replace,
--            select = true,
--        },
--        ['<Tab>'] = function(fallback)
--            if cmp.visible() then
--                cmp.select_next_item()
--            elseif luasnip.expand_or_jumpable() then
--                luasnip.expand_or_jump()
--            else
--                fallback()
--            end
--        end,
--        ['<S-Tab>'] = function(fallback)
--            if cmp.visible() then
--                cmp.select_prev_item()
--            elseif luasnip.jumpable(-1) then
--                luasnip.jump(-1)
--            else
--                fallback()
--            end
--        end,
--    },
--    sources = {
--        { name = 'path' },
--        { name = 'nvim_lsp', keyword_length = 3 },
--        { name = 'buffer', keyword_length = 3 },
--        { name = 'luasnip', keyword_length = 2 },
--    },
--    window = {
--        documentation = cmp.config.window.bordered()
--    },
--    formatting = {
--        fields = { 'menu', 'abbr', 'kind' },
--        format = function(entry, item)
--            local menu_icon = {
--                nvim_lsp = 'λ',
--                luasnip = '⋗',
--                buffer = 'Ω',
--                path = '🖫',
--            }
--
--            item.menu = menu_icon[entry.source.name]
--            return item
--        end,
--    },
--}
--
---- Getting my borders on
--vim.cmd [[autocmd! ColorScheme * highlight NormalFloat guibg=#1f2335]]
--vim.cmd [[autocmd! ColorScheme * highlight FloatBorder guifg=white guibg=#1f2335]]
--
--local border = {
--    { "🭽", "FloatBorder" },
--    { "▔", "FloatBorder" },
--    { "🭾", "FloatBorder" },
--    { "▕", "FloatBorder" },
--    { "🭿", "FloatBorder" },
--    { "▁", "FloatBorder" },
--    { "🭼", "FloatBorder" },
--    { "▏", "FloatBorder" },
--}
--
---- LSP settings (for overriding per client)
--local handlers = {
--    ["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, { border = border }),
--    ["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, { border = border }),
--}
--
--lspconfig.sumneko_lua.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    handlers = handlers
--}
--
--lspconfig.gopls.setup {
--    cmd = { "gopls", "serve" },
--    capabilities = capabilities,
--    on_attach = on_attach,
--    filetypes = { "go", "gomod", "gotmpl" },
--    flags = {
--        debounce_text_changes = 100,
--    },
--    settings = {
--        gopls = {
--            staticcheck = true,
--        },
--    },
--    handlers = handlers
--}
--

--lspconfig.tailwindcss.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    filetypes = { "htmldjango", "gohtml", "html", "markdown", "css", "javascriptreact", "typescript", "typescriptreact" },
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
--lspconfig.taplo.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
--lspconfig.jsonls.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
--lspconfig.marksman.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
---- lspconfig.dockerls.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
---- lspconfig.tsserver.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     auto_inlay_hints = true,
----     inlay_hints_highlight = 'Comment',
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
---- lspconfig.eslint.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
---- lspconfig.pyright.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
--lspconfig.emmet_ls.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    filetypes = { "htmldjango", "gohtml", "html", "markdown", "css", "javascriptreact", "typescript", "typescriptreact" },
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
---- lspconfig.html.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     filetypes = { "htmldjango", "gohtml","html", "markdown", "css", "javascriptreact", "typescript", "typescriptreact" },
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
---- lspconfig.graphql.setup{
----     on_attach = on_attach,
----     capabilities = capabilities,
----     flags = {
----       debounce_text_changes = 150,
----     }
---- }
--
---- -- lspconfig.solargraph.setup{
---- --     on_attach = on_attach,
---- --     capabilities = capabilities,
---- --     flags = {
---- --       debounce_text_changes = 150,
---- --     }
---- -- }
--
--lspconfig.sqlls.setup {
--    on_attach = on_attach,
--    capabilities = capabilities,
--    filetypes = { "sql" },
--    flags = {
--        debounce_text_changes = 100,
--    },
--    handlers = handlers
--}
--
---- rust config
--require('rust-tools').setup({
--    tools = { -- rust-tools options
--        autoSetHints = true,
--        inlay_hints = {
--            show_parameter_hints = false,
--            parameter_hints_prefix = "",
--            other_hints_prefix = "",
--        },
--    },
--
--    -- all the opts to send to nvim-lspconfig
--    -- these override the defaults set by rust-tools.nvim
--    -- see https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#rust_analyzer
--    server = {
--        -- on_attach is a callback called when the language server attachs to the buffer
--        capabilities = capabilities,
--        on_attach = on_attach,
--        handlers = handlers,
--        flags = {
--            debounce_text_changes = 150,
--        },
--        settings = {
--            -- to enable rust-analyzer settings visit:
--            -- https://github.com/rust-analyzer/rust-analyzer/blob/master/docs/user/generated_config.adoc
--            ["rust-analyzer"] = {
--                -- enable clippy on save
--                checkOnSave = {
--                    command = "clippy"
--                },
--            }
--        }
--    },
--})
