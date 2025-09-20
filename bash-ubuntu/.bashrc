#!/usr/bin/env bash

# All the default Omarchy aliases and functions
# (don't mess with these directly, just overwrite them here!)
# source ~/.local/share/omarchy/default/bash/rc

# Add your own exports, aliases, and functions here.
#
# Make an alias for invoking commands you use constantly
# alias p='python'
#
# Use VSCode instead of neovim as your default editor
# export EDITOR="code"
#
# Set a custom prompt with the directory revealed (alternatively use https://starship.rs)
# PS1="\W \[\e]0;\w\a\]$PS1"

# source ~/.local/share/omarchy/default/bash/rc

# iatest=$(expr index "$-" i)
#######################################################
# SOURCED ALIAS'S AND SCRIPTS BY zachbrowne.me
#######################################################
# if [ -f /usr/bin/fastfetch ]; then
# 	fastfetch
# fi

# Source global definitions
# if [ -f /etc/bashrc ]; then
# 	. /etc/bashrc
# fi

# Disable the bell
# if [[ $iatest -gt 0 ]]; then bind "set bell-style visible"; fi

# Don't put duplicate lines in the history and do not add lines that start with a space
export HISTCONTROL=erasedups:ignoredups:ignorespace

export EDITOR=nvim
export VISUAL=nvim

export GOPATH=/home/mbv/golang
export GOBIN=/home/mbv/golang/bin
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
export PATH=$PATH:$GOPATH/bin

export PATH=$PATH:/home/mbv/.cache/.bun/bin:$PATH

export PATH=$PATH:/usr/local/nvim/bin

# export PATH=$PATH:/home/mbv/.local/bin

# Alias's to modified commands
alias cp='cp -i'
alias mv='mv -i'
# alias rm='trash -v'
alias mkdir='mkdir -p'
alias ps='ps auxf'
alias ping='ping -c 10'
alias less='less -R'
alias cls='clear'
alias vi='nvim'
alias svi='sudo vi'
alias vis='nvim "+set si"'
alias yayf="yay -Slq | fzf --multi --preview 'yay -Sii {1}' --preview-window=down:75% | xargs -ro yay -S"

alias gst='git status'
alias gcb='git checkout -b'
alias gco='git checkout'
alias ga='git add'
alias gp='git push'
alias gl='git pull'
alias gcmsg='git commit -m'
alias gpsup='git push --set-upstream origin feat/generate-mvc-elements'

# Change directory aliases
alias home='cd ~'
alias cd..='cd ..'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'

# cd into the old directory
alias bd='cd "$OLDPWD"'

# Remove a directory and all files
alias rmd='/bin/rm  --recursive --force --verbose '

# Alias's for multiple directory listing commands
alias la='ls -Alh'                # show hidden files
alias ls='ls -aFh --color=always' # add colors and file type extensions
alias lx='ls -lXBh'               # sort by extension
alias lk='ls -lSrh'               # sort by size
alias lc='ls -ltcrh'              # sort by change time
alias lu='ls -lturh'              # sort by access time
alias lr='ls -lRh'                # recursive ls
alias lt='ls -ltrh'               # sort by date
alias lm='ls -alh |more'          # pipe through 'more'
alias lw='ls -xAh'                # wide listing format
alias ll='ls -Fls'                # long listing format
alias labc='ls -lap'              # alphabetical sort
alias lf="ls -l | egrep -v '^d'"  # files only
alias ldir="ls -l | egrep '^d'"   # directories only
alias lla='ls -Al'                # List and Hidden Files
alias las='ls -A'                 # Hidden Files
alias lls='ls -l'                 # List

alias g='lazygit'                 

eval "$(starship init bash)"
xset r rate 200 60
