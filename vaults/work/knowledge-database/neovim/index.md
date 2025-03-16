---
id: knowledge-database--neovim-index
aliases:
  - neovim
tags: []
---

[Back To Index](/knowledge-database/index.md)

# Neovim

<!--toc:start-->
- [Neovim](#neovim)
  - [Updating Neovim](#updating-neovim)
  - [Copy to clipboard](#copy-to-clipboard)
    - [Add newline](#add-newline)
  - [Resources](#resources)
  - [Handling merge conflicts w. fugitive](#handling-merge-conflicts-w-fugitive)
<!--toc:end-->


## Updating Neovim
To update, download the latest version of neovim and run:
`tar -xf file-name.tar.gz` and move it to `/usr/local/neovim/version-name`. `cp` the file so it's named 
`/usr/local/neovim/latest`.

## Copy to clipboard

Need to have xclip installed `sudo apt install xclip`. Run `:checkhealth provider` to verify it's working.

### Add newline
Substituting by \n inserts a null character into the text. To get a newline, use \r. When searching for a newline, 
you’d still use \n, however. This asymmetry is due to the fact that \n and \r do slightly different things:

\n matches an end of line (newline), whereas \r matches a carriage return. On the other hand, in substitutions \n 
inserts a null character whereas \r inserts a newline (more precisely, it’s treated as the input CR). Here’s a small, 
non-interactive example to illustrate this, using the Vim command line feature (in other words, you can copy and paste 
the following into a terminal to run it). xxd shows a hexdump of the resulting file.

```bash
echo bar > test
(echo 'Before:'; xxd test) > output.txt
vim test '+s/b/\n/' '+s/a/\r/' +wq
(echo 'After:'; xxd test) >> output.txt
more output.txt
```
In other words, \n has inserted the byte 0x00 into the text; \r has inserted the byte 0x0a.

## Resources
  - [Awesome Neovim](https://github.com/rockerBOO/awesome-neovim)
  - [Getting started using Lua in Neovim](https://github.com/nanotee/nvim-lua-guide)
  - [NvSTAR](https://github.com/adityastomar67/NvStar)

## Handling merge conflicts w. fugitive
[Go here](http://vimcasts.org/episodes/fugitive-vim-resolving-merge-conflicts-with-vimdiff/)
