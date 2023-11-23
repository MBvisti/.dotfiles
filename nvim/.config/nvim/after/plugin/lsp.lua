local lspconfig = require('lspconfig')
local lsp_defaults = lspconfig.util.default_config

lsp_defaults.capabilities = vim.tbl_deep_extend(
    'force',
    lsp_defaults.capabilities,
    require('cmp_nvim_lsp').default_capabilities()
)

vim.api.nvim_create_autocmd('LspAttach', {
    desc = 'LSP actions',
    callback = function(event)
        local opts = { buffer = event.buf }

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

        vim.keymap.set('n', '<leader>gd', '<CMD>Glance definitions<CR>', opts)
        vim.keymap.set('n', '<leader>gr', '<CMD>Glance references<CR>', opts)
        vim.keymap.set('n', '<leader>gt', '<CMD>Glance type_definitions<CR>', opts)
        vim.keymap.set('n', '<leader>gi', '<CMD>Glance implementations<CR>', opts)

        vim.keymap.set('n', '<leader>ti', function() require('telescope.builtin').lsp_implementations() end, opts)
        vim.keymap.set('n', '<leader>ttd', function() require('telescope.builtin').lsp_type_definitions() end, opts)
        vim.keymap.set('n', '<leader>td', function() require('telescope.builtin').lsp_definitions() end, opts)
        vim.keymap.set('n', '<leader>tr', function() require('telescope.builtin').lsp_references() end, opts)

        --vim.api.nvim_set_keymap('n', '<leader>sr', [[<cmd>lua require('telescope.builtin').lsp_references()<CR>]], { noremap = true, silent = true })
        -- vim_api.nvim_buf_set_keymap(bufnr, 'n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', opts)
        -- vim_api.nvim_buf_set_keymap(bufnr, 'n', '<space>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', opts)


        -- lsp-zero defaults
        -- vim.keymap.set('n', 'K', '<cmd>lua vim.lsp.buf.hover()<cr>', opts)
        -- vim.keymap.set('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<cr>', opts)
        -- vim.keymap.set('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<cr>', opts)
        -- vim.keymap.set('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<cr>', opts)
        -- vim.keymap.set('n', 'go', '<cmd>lua vim.lsp.buf.type_definition()<cr>', opts)
        -- vim.keymap.set('n', 'gr', '<cmd>lua vim.lsp.buf.references()<cr>', opts)
        -- vim.keymap.set('n', 'gs', '<cmd>lua vim.lsp.buf.signature_help()<cr>', opts)
        -- vim.keymap.set('n', '<F2>', '<cmd>lua vim.lsp.buf.rename()<cr>', opts)
        -- vim.keymap.set({'n', 'x'}, '<F3>', '<cmd>lua vim.lsp.buf.format({async = true})<cr>', opts)
        -- vim.keymap.set('n', '<F4>', '<cmd>lua vim.lsp.buf.code_action()<cr>', opts)

        -- vim.keymap.set('n', 'gl', '<cmd>lua vim.diagnostic.open_float()<cr>', opts)
        -- vim.keymap.set('n', '[d', '<cmd>lua vim.diagnostic.goto_prev()<cr>', opts)
        -- vim.keymap.set('n', ']d', '<cmd>lua vim.diagnostic.goto_next()<cr>', opts)
    end
})

-- Specify how the border looks like
vim.api.nvim_set_hl(0, "NormalFloat", { bg = none })
vim.api.nvim_set_hl(0, "FloatBorder", { fg = "white", bg = none })

local border = {
    { "🭽", "FloatBorder" },
    { "▔", "FloatBorder" },
    { "🭾", "FloatBorder" },
    { "▕", "FloatBorder" },
    { "🭿", "FloatBorder" },
    { "▁", "FloatBorder" },
    { "🭼", "FloatBorder" },
    { "▏", "FloatBorder" },
}

-- Add the border on hover and on signature help popup window
-- local handlers = {
--     ['textDocument/hover'] = vim.lsp.with(vim.lsp.handlers.hover, { border = border }),
--     ['textDocument/signatureHelp'] = vim.lsp.with(vim.lsp.handlers.signature_help, { border = border }),
-- }

-- To instead override globally
local orig_util_open_floating_preview = vim.lsp.util.open_floating_preview
function vim.lsp.util.open_floating_preview(contents, syntax, opts, ...)
    opts = opts or {}
    opts.border = opts.border or border
    return orig_util_open_floating_preview(contents, syntax, opts, ...)
end

local default_setup = function(server)
    lspconfig[server].setup({})
end

vim.filetype.add({
    extension = {
        templ = "templ",
    },
})

require('mason').setup({
    ui = {
        border = "rounded",
    }
})
require('mason-lspconfig').setup({
    ensure_installed = {},
    handlers = {
        default_setup,
        yamlls = function()
            require('lspconfig').yamlls.setup({
                settings = {
                    yaml = { keyOrdering = false },
                },
            })
        end,
        html = function()
            require('lspconfig').html.setup({
                filetypes = { "html", "htmldjango", "php" },
            })
        end,
        marksman = function()
            require('lspconfig').marksman.setup({
                filetypes = { "md", "markdown", "vimwiki" },
            })
        end,
        tailwindcss = function()
            require('lspconfig').tailwindcss.setup({
                filetypes = { "htmldjango", "gohtml", "html", "php", "templ" },
                flags = {
                    debounce_text_changes = 100,
                },
                init_options = {
                    userLanguages = {
                        templ = "html"
                    }
                }
            })
        end,
        templ = function()
            require('lspconfig').templ.setup({
                filetypes = { "templ" },
                flags = {
                    debounce_text_changes = 100,
                },
            })
        end,
        gopls = function()
            require('lspconfig').gopls.setup({
                settings = {
                    gopls = {
                        completeUnimported = true,
                        usePlaceholders = true,
                        analyses = {
                            unusedparams = true,
                        },
                        hints = {
                            assignVariableTypes = true,
                            compositeLiteralFields = true,
                            compositeLiteralTypes = true,
                            constantValues = true,
                            functionTypeParameters = true,
                            parameterNames = true,
                            rangeVariableTypes = true,
                        },
                    }
                },
            })
        end,
    },
})

-- lspkind.lua
local lspkind = require("lspkind")

vim.api.nvim_set_hl(0, "CmpItemKindCopilot", { fg = "#6CC644" })

local cmp = require('cmp')
cmp.setup({
    formatting = {
        format = lspkind.cmp_format({
            mode = "symbol_text",
            max_width = 50,
            symbol_map = { Copilot = "" },
            ellipsis_char = '...',
        })
    },
    window = {
        completion = cmp.config.window.bordered(),
        documentation = cmp.config.window.bordered(),
    },
    mapping = cmp.mapping.preset.insert({
        -- Enter key confirms completion item
        ['<CR>'] = cmp.mapping.confirm({
            behavior = cmp.ConfirmBehavior.Replace,
            select = false
        }),

        -- Ctrl + space triggers completion menu
        ['<C-Space>'] = cmp.mapping.complete(),
    }),
    sources = {
        { name = 'copilot',  group_index = 2 },
        { name = 'nvim_lsp', group_index = 2 },
        -- { name = 'luasnip',  keyword_length = 3 },
    },
    snippet = {
        expand = function(args)
            require('luasnip').lsp_expand(args.body)
        end,
    },
})

vim.diagnostic.config({
    -- virtual_text = true,
    signs = true,
    update_in_insert = true,
    underline = true,
    severity_sort = true,
    virtual_text = {
        prefix = '■ ', -- Could be '●', '▎', 'x', '■', , 
    },
    float = { border = border },
})

--local cmp_select = { behavior = cmp.SelectBehavior.Select }
--Cmp_Mappings = lsp.defaults.cmp_mappings({
--    ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
--    ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
--    ['<C-y>'] = cmp.mapping.confirm({ select = true }),
--    ['<C-Space>'] = cmp.mapping.complete(),
--    ['<Enter>'] = cmp.mapping.confirm({ select = true }),
--})

--local rust_tools = require('rust-tools')

----local opts = { noremap = true, silent = true }
----
--rust_tools.setup({
--    server = {
--        on_attach = function(_, _)
--            --vim.keymap.set('n', '<leader>ca', rust_tools.hover_actions.hover_actions, { buffer = bufnr })
--            vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
--            vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
--            vim.keymap.set("n", "<leader>ca", function() vim.lsp.buf.code_action() end, opts)
--            vim.keymap.set("n", "<leader>d", function() vim.diagnostic.open_float() end, opts)
--            vim.keymap.set("n", "<leader>rn", function() vim.lsp.buf.rename() end, opts)
--            vim.keymap.set("n", "<C-p>", function() vim.diagnostic.goto_prev() end, opts)
--            vim.keymap.set("n", "<C-n>", function() vim.diagnostic.goto_next() end, opts)
--            vim.keymap.set("n", "gi", function() vim.lsp.buf.implementation() end, opts)
--            vim.keymap.set("n", "<space>f", function() vim.lsp.buf.format() end, opts)
--            vim.keymap.set('n', 'gr', function() vim.lsp.buf.references() end, opts)

--            vim.keymap.set('n', '<leader>gd', '<CMD>Glance definitions<CR>', opts)
--            vim.keymap.set('n', '<leader>gr', '<CMD>Glance references<CR>', opts)
--            vim.keymap.set('n', '<leader>gt', '<CMD>Glance type_definitions<CR>', opts)
--            vim.keymap.set('n', '<leader>gi', '<CMD>Glance implementations<CR>', opts)

--            vim.keymap.set('n', '<leader>ti', function() require('telescope.builtin').lsp_implementations() end, opts)
--            vim.keymap.set('n', '<leader>tr', function() require('telescope.builtin').lsp_references() end, opts)
--        end
--    }
--})

--rust_tools.inlay_hints.enable()
--            vim.keymap.set('n', '<leader>ti', function() require('telescope.builtin').lsp_implementations() end, opts)
--            vim.keymap.set('n', '<leader>tr', function() require('telescope.builtin').lsp_references() end, opts)
--        end
--    }
--})

--rust_tools.inlay_hints.enable()
