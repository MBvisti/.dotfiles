vim.loader.enable()

vim.g.mapleader = " "
vim.g.maplocalleader = " "
vim.g.have_nerd_font = true

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.mouse = "a"
vim.opt.showmode = false
vim.opt.clipboard = "unnamedplus"
vim.opt.breakindent = true
vim.opt.undofile = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.signcolumn = "yes"
vim.opt.updatetime = 50
vim.opt.timeoutlen = 300
vim.opt.splitright = true
vim.opt.inccommand = "split"
vim.opt.scrolloff = 1000
vim.opt.hlsearch = true
vim.opt.termguicolors = true
vim.opt.completeopt = { "menu", "menuone", "noselect" }
vim.opt.shortmess:append("c")

vim.o.undodir = os.getenv("HOME") .. "/.neovim/undodir"
vim.o.incsearch = true
vim.o.swapfile = false
vim.o.backup = false
vim.o.conceallevel = 2
vim.o.errorbells = false
vim.o.cursorline = false
vim.o.tabstop = 4
vim.o.shiftwidth = 4
vim.o.guicursor = "a:blinkon0"
vim.o.hlsearch = false
vim.o.winborder = "solid"

vim.g.netrw_banner = 0
vim.g.netrw_winsize = 25

vim.g.vimwiki_list = { { path = "~/vimwiki/", syntax = "markdown", ext = "md" } }
vim.g.vimwiki_global_ext = 0

vim.filetype.add({ extension = { templ = "templ" } })

vim.cmd([[
  filetype plugin indent on
]])

vim.api.nvim_create_autocmd("PackChanged", {
  callback = function(ev)
    local name, kind = ev.data.spec.name, ev.data.kind
    if name == "nvim-treesitter" and kind == "update" then
      if not ev.data.active then vim.cmd.packadd("nvim-treesitter") end
      vim.cmd("TSUpdate")
    end
    if name == "telescope-fzf-native.nvim" and (kind == "install" or kind == "update") then
      if vim.fn.executable("make") == 1 then
        vim.fn.system("make -C " .. vim.fn.stdpath("data") .. "/site/pack/core/opt/telescope-fzf-native.nvim")
      end
    end
    if name == "go.nvim" and (kind == "install" or kind == "update") then
      if not ev.data.active then vim.cmd.packadd("go.nvim") end
      require("go.install").update_all_sync()
    end

  end,
})

vim.pack.add({ { src = "https://github.com/saghen/blink.lib", version = "main" } })

vim.pack.add({
  "https://github.com/nvim-lua/plenary.nvim",
  "https://github.com/neovim/nvim-lspconfig",

  "https://github.com/catppuccin/nvim",

  "https://github.com/echasnovski/mini.nvim",
  "https://github.com/shortcuts/no-neck-pain.nvim",
  "https://github.com/xiyaowong/transparent.nvim",
  "https://github.com/onsails/lspkind.nvim",
  "https://github.com/folke/snacks.nvim",

  { src = "https://github.com/saghen/blink.cmp", version = vim.version.range("1.x") },

  "https://github.com/lewis6991/gitsigns.nvim",
  "https://github.com/sindrets/diffview.nvim",

  "https://github.com/stevearc/oil.nvim",

  "https://github.com/nvim-telescope/telescope.nvim",
  "https://github.com/nvim-telescope/telescope-fzf-native.nvim",
  "https://github.com/nvim-telescope/telescope-ui-select.nvim",

  "https://github.com/nvim-treesitter/nvim-treesitter",
  "https://github.com/ray-x/go.nvim",
  "https://github.com/NoahTheDuke/vim-just",
})

pcall(function()
  require("nvim-treesitter.configs").setup({
    ensure_installed = { "go", "lua", "vimdoc", "vim", "bash", "markdown", "markdown_inline", "templ" },
    highlight = { enable = true },
    indent = { enable = true },
  })
end)

pcall(function() require("tokyonight").setup({ style = "moon" }) end)

vim.cmd.packadd("mini.nvim")
local statusline = require("mini.statusline")
statusline.setup({ use_icons = vim.g.have_nerd_font })
statusline.is_truncated = function() return 1 end
statusline.section_filename = function() return vim.fn.expand("%:~:.") end
statusline.section_location = function() return "%2l:%-2v" end

require("no-neck-pain").setup({
  width = 120,
  buffers = {
    scratchPad = { enabled = true, location = "~/Documents/" },
    bo = { filetype = "md" },
  },
})

local snacks = require("snacks")
if not snacks.did_setup then snacks.setup({
  zen = {
    window = {
      backdrop = 0.95,
      width = 0.35,
      options = {
        signcolumn = "no",
        number = true,
        relativenumber = true,
        cursorline = false,
        cursorcolumn = false,
      },
    },
    plugins = {
      options = { enabled = true, laststatus = 3, showcmd = false },
      twilight = { enabled = false },
      tmux = { enabled = false },
    },
  },
  image = {},
  indent = {
    animate = {
      enabled = vim.fn.has("nvim-0.10") == 1,
      style = "out",
      easing = "linear",
      duration = { step = 15, total = 250 },
    },
  },
}) end

require("blink.cmp").setup({
  keymap = {
    preset = "none",
    ["<Up>"] = { "select_prev", "fallback" },
    ["<Down>"] = { "select_next", "fallback" },
    ["<C-f>"] = { "scroll_documentation_up", "fallback" },
    ["<C-b>"] = { "scroll_documentation_down", "fallback" },
    ["<C-e>"] = { "show" },
    ["<C-space>"] = { "hide" },
    ["<CR>"] = { "select_and_accept", "fallback" },
  },
  appearance = {
    nerd_font_variant = "mono",
    use_nvim_cmp_as_default = false,
  },
  cmdline = {
    enabled = false,
    completion = { menu = { auto_show = true } },
    keymap = { ["<CR>"] = { "accept_and_enter", "fallback" } },
  },
  completion = {
    menu = {
      auto_show = false,
      scrolloff = 1,
      scrollbar = false,
      draw = {
        columns = {
          { "kind_icon" },
          { "label", "label_description", gap = 1 },
          { "kind" },
          { "source_name" },
        },
      },
    },
    documentation = {
      auto_show = true,
      window = { border = nil, scrollbar = false },
    },
  },
  sources = { default = { "lsp", "path", "buffer" } },
  fuzzy = { implementation = "prefer_rust_with_warning" },
})

require("gitsigns").setup({})

require("oil").setup({
  default_file_explorer = false,
})

vim.g.db_ui_use_nerd_fonts = 1

require("telescope").setup({
  defaults = {
    layout_strategy = "vertical",
    layout_config = {
      vertical = {
        mirror = false,
        preview_height = 0.65,
        width = 0.60,
        height = 0.80,
      },
    },
  },
  extensions = {
    ["ui-select"] = {
      require("telescope.themes").get_dropdown(),
    },
  },
})
pcall(require("telescope").load_extension, "fzf")
pcall(require("telescope").load_extension, "ui-select")

require("go").setup({
  max_line_len = 100,
  lsp_inlay_hints = { enabled = false },
  gofmt = "golines",
  tag_transform = "camelcase",
  tag_options = "",
  lsp_gofumpt = true,
  lsp_document_formatting = false,
})

vim.lsp.config("gopls", {
  cmd = { "gopls" },
  filetypes = { "go", "gomod" },
  root_markers = { "go.mod" },
  settings = {
    gopls = {
      buildFlags = { "-tags=unit integration e2e" },
      completeUnimported = true,
      gofumpt = true,
      staticcheck = true,
    },
  },
})

vim.lsp.config("html", {
  cmd = { "vscode-html-language-server", "--stdio" },
  filetypes = { "html", "templ" },
})

-- vim.lsp.config("css_variables", {
--   cmd = { "npm", "run", "css-variables-language-server", "--stdio" },
--   filetypes = { "css" },
-- })

vim.lsp.config("cssls", {
  cmd = { "vscode-css-language-server", "--stdio" },
  filetypes = { "css" },
})

vim.lsp.config("tailwindcss", {
  cmd = { "tailwindcss-language-server", "--stdio" },
  filetypes = { "html", "templ", "erb.html" },
  settings = {
    tailwindCSS = {
      classAttributes = { "class" },
      includeLanguages = {
        htmlangular = "html",
        templ = "html",
      },
    },
  },
})

vim.lsp.config("templ", {
  cmd = { "./bin/templ", "lsp" },
  filetypes = { "templ" },
  root_markers = { "go.mod", "go.work", ".git" },
  handlers = {
    ["window/showMessage"] = function(err, result, ctx, config)
      if result and result.message and string.match(result.message, "generated file") then
        return
      end
      return vim.lsp.handlers["window/showMessage"](err, result, ctx, config)
    end,
    ["window/logMessage"] = function(err, result, ctx, config)
      if result and result.message and string.match(result.message, "generated file") then
        return
      end
      return vim.lsp.handlers["window/logMessage"](err, result, ctx, config)
    end,
  },
})

vim.lsp.config("emmet-language-server", {
  cmd = { "emmet-language-server", "--stdio" },
  filetypes = { "templ" },
})

vim.lsp.enable("gopls")
vim.lsp.enable("templ")
vim.lsp.enable("emmet-language-server")
vim.lsp.enable("html")
vim.lsp.enable("tailwindcss")
vim.lsp.enable("css_variables")
vim.lsp.enable("cssls")

vim.diagnostic.config({
  virtual_text = false,
  virtual_lines = { current_line = true },
})

vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("lsp-attach", { clear = true }),
  callback = function(event)
    local map = function(keys, func, desc)
      vim.keymap.set("n", keys, func, { buffer = event.buf, desc = "LSP: " .. desc })
    end
    local ts_builtin = require("telescope.builtin")
    map("gd", vim.lsp.buf.definition, "[G]oto [D]efinition")
    map("gr", vim.lsp.buf.references, "[G]oto [R]eferences")
    map("gi", ts_builtin.lsp_implementations, "[G]oto [I]mplementation")
    map("<leader>d", ts_builtin.lsp_type_definitions, "Type [D]efinition")
    map("<leader>ds", ts_builtin.lsp_document_symbols, "[D]ocument [S]ymbols")
    map("<leader>ws", ts_builtin.lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbols")
    map("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
    map("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
    map("dg", vim.lsp.buf.declaration, "[G]oto [D]eclaration")
    local format_sync_grp = vim.api.nvim_create_augroup("GoFormat", {})
    vim.api.nvim_create_autocmd("BufWritePre", {
      group = format_sync_grp,
      pattern = "*.go",
      callback = function()
        require("go.format").goimport()
      end,
    })
  end,
})

vim.api.nvim_create_autocmd("TextYankPost", {
  desc = "Highlight when yanking (copying) text",
  group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
  callback = function()
    vim.highlight.on_yank()
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "go",
  callback = function()
    vim.treesitter.start()
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "templ",
  callback = function()
    vim.treesitter.start()
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "css",
  callback = function()
    vim.treesitter.start()
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "js",
  callback = function()
    vim.treesitter.start()
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "html",
  callback = function()
    vim.treesitter.start()
  end,
})

vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, { desc = "Go to previous [D]iagnostic message" })
vim.keymap.set("n", "]d", vim.diagnostic.goto_next, { desc = "Go to next [D]iagnostic message" })
vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float, { desc = "Show diagnostic [E]rror messages" })
vim.keymap.set("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })
vim.keymap.set("t", "<Esc><Esc>", "<C-\\><C-n>", { desc = "Exit terminal mode" })
vim.keymap.set("n", "<M-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
vim.keymap.set("n", "<M-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
vim.keymap.set("n", "<M-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
vim.keymap.set("n", "<M-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })
vim.keymap.set("n", "<leader>pq", vim.cmd.Explore)
vim.keymap.set("n", "k", "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
vim.keymap.set("n", "j", "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
vim.keymap.set("n", "<D-S-h>", "<c-w>5<")
vim.keymap.set("n", "<D-S-l>", "<c-w>5>")
vim.keymap.set("n", "<D-S-k>", "<c-W>+")
vim.keymap.set("n", "<D-S-j>", "<c-W>-")
vim.keymap.set("i", "<C-c>", "<Esc>")
vim.keymap.set("n", "<leader>re", "oif err != nil {<CR>}<ESC>Oreturn err")
vim.keymap.set("n", "<leader>nn", vim.cmd.NoNeckPain, { noremap = true, silent = true, desc = "No Neck Pain" })
vim.keymap.set("n", "<leader>up", function() vim.pack.update() end, { desc = "Update all plugins" })
vim.keymap.set("n", "<leader>pc", function()
  local to_delete = vim.iter(vim.pack.get(nil, { info = false }))
    :filter(function(p) return not p.active end)
    :map(function(p) return p.spec.name end)
    :totable()
  if #to_delete == 0 then
    vim.notify("vim.pack: No inactive plugins to clean up", vim.log.levels.INFO)
    return
  end
  local choice = vim.fn.confirm(
    "Remove " .. #to_delete .. " inactive plugin(s)?\n" .. table.concat(to_delete, "\n"),
    "&Yes\n&No", 2
  )
  if choice == 1 then
    vim.pack.del(to_delete)
    vim.notify("vim.pack: Removed " .. #to_delete .. " inactive plugin(s)", vim.log.levels.INFO)
  end
end, { desc = "Clean up inactive plugins" })
vim.keymap.set("n", "<leader>vd", vim.cmd.VimwikiDiaryIndex, { noremap = true, silent = true, desc = "Open Wiki" })
vim.keymap.set("n", "<leader>vg", vim.cmd.VimwikiMakeDiaryNote, { noremap = true, silent = true, desc = "Make Diary Note" })
vim.keymap.set("n", "<leader>o", "<CMD>Oil<CR>", { desc = "Open parent directory" })
vim.keymap.set("n", "<leader>rg", "<cmd>GrugFar<CR>")
vim.keymap.set("n", "<leader>ob", ":e ~/vaults/work/index.md<CR>", { noremap = true, silent = true, desc = "Open Obsidian" })
vim.keymap.set("n", "<leader>gb", "<CMD>Gitsigns blame<CR>", { noremap = true, silent = true, desc = "Blaming Game" })
vim.keymap.set("n", "<leader>bl", "<CMD>Gitsigns blame_line<CR>", { noremap = true, silent = true, desc = "Blaming Game Specific" })
vim.keymap.set("n", "<leader>sc", "<CMD>Gitsigns show_commit<CR>", { noremap = true, silent = true, desc = "Show commit" })

local builtin = require("telescope.builtin")
vim.keymap.set("n", "<leader>ff", builtin.find_files, { desc = "[S]earch [F]iles" })
vim.keymap.set("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
vim.keymap.set("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })
vim.keymap.set("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
vim.keymap.set("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
vim.keymap.set("n", "<leader>gc", builtin.git_bcommits, { desc = "[G]it [C]ommits" })
vim.keymap.set("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
vim.keymap.set("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
vim.keymap.set("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
vim.keymap.set("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
vim.keymap.set("n", "<leader>/", function()
  builtin.current_buffer_fuzzy_find(require("telescope.themes").get_dropdown({
    winblend = 10,
    previewer = false,
  }))
end, { desc = "[/] Fuzzily search in current buffer" })
vim.keymap.set("n", "<leader>s/", function()
  builtin.live_grep({
    grep_open_files = true,
    prompt_title = "Live Grep in Open Files",
  })
end, { desc = "[S]earch [/] in Open Files" })
vim.keymap.set("n", "<leader>sn", function()
  builtin.find_files({ cwd = vim.fn.stdpath("config") })
end, { desc = "[S]earch [N]eovim files" })

vim.cmd.colorscheme("catppuccin")
