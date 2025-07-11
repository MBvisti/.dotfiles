# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(
    git 
    # zsh-autosuggestions 
    # common-aliases 
    # alias-finder 
    # web-search
    # aws
    # tmux
    # zsh-z
	# ruby
	# asdf
)

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='vi'
fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
alias vi="/usr/local/nvim/bin/nvim"
alias nvim="/usr/local/nvim/bin/nvim"

# alias rails="~/.local/share/gem/ruby/3.3.0/bin/rails"
# alias noko="~/.local/share/gem/ruby/3.3.0/bin/nokogiri"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Go related
export GOPATH=/home/mbv/golang
export GOBIN=/home/mbv/golang/bin
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
export PATH=$PATH:$GOPATH/bin

declare -A pomo_options
pomo_options["work"]="45"
pomo_options["break"]="10"

pomodoro () {
  if [ -n "$1" -a -n "${pomo_options["$1"]}" ]; then
  val=$1
  echo $val
  timer ${pomo_options["$val"]}m
  spd-say "'$val' session done"
  fi
}

alias wo="pomodoro 'work'"
alias br="pomodoro 'break'"

# fly io setup
#export FLYCTL_INSTALL='/home/mbv/.fly'
export PATH="/home/mbv/.fly/bin:$PATH"

# source $HOME/.cargo/env

# rust analyzer
#export PATH=$PATH:/usr/local/bin
# export PATH=$PATH:~/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin

# modualr & mojo
# export MODULAR_HOME="/home/mbv/.modular"
# export PATH="/home/mbv/.modular/pkg/packages.modular.com_mojo/bin:$PATH"

# kotlin & java & maven
# export PATH="/usr/local/kotlin/bin:$PATH"
# alias kotlinc="/usr/local/kotlin/bin/kotlinc-native"

# terraform
#export PATH="/usr/local/terraform:$PATH"

# pulumi
# export PATH="/usr/local/pulumi/latest:$PATH"

# heroku
# export PATH="/usr/local/heroku/bin:$PATH"

# bazecor 
# alias dygma="/home/mbv/Dygma/Bazecor.AppImage"

# lazy git
# export PATH="/usr/local/lazygit/latest:$PATH"

# quarto
# export PATH="/usr/local/quarto/latest/bin/:$PATH"

# zellij
# export PATH="/usr/local/zellij/:$PATH"

# python
# export PATH="~/.local/share/uv/python:$PATH"
# alias python="~/.local/share/uv/python/cpython-3.13.0-linux-x86_64-gnu/bin/python3"
# alias pip="/usr/local/python/latest/bin/pip3"
# alias pip="/usr/bin/pip3"
# alias python="/usr/bin/python3.13"
# alias py="/usr/bin/python3.13"

# tailwind
# alias tailwind="/usr/local/tailwind/latest"

# doctl
# export PATH="/usr/local/doctl/latest:$PATH"

# picom
# export PATH="/usr/local/picom/latest:$PATH"

# ollama
# export PATH="/usr/local/ollama/latest:$PATH"

# lazydocker
# export PATH="/usr/local/lazydocker/latest:$PATH"

# tmux
export PATH="/usr/local/tmux/latest:$PATH"

# ruby
# export PATH="/usr/local/ruby/latest/bin:$PATH"
# export PATH="/home/mbv/.gem/ruby/3.3.0/bin:$PATH"
export PATH="$HOME/.asdf/shims/:$PATH"

# just
# export PATH="/usr/local/just/latest:$PATH"

# smug
# export PATH="/usr/local/smug/smug:$PATH"
# alias smug="/usr/local/smug/smug"

# nats server
# export PATH="/usr/local/nats/latest:$PATH"

# sops server
# alias sops="/usr/local/sops/latest/v3.9.1.linux.amd64"

# stripe cli
# export PATH="/usr/local/stripecli/latest:$PATH"

# tempo
# export PATH="/usr/local/tempo/latest:$PATH"

# node
export PATH="/usr/local/node/bin:$PATH"

# gh
export PATH="/usr/local/gh/bin:$PATH"

# export TERM=screen-256color

# composer
# export PATH="/home/mbv/.asdf/installs/php/8.4.2/bin/composer:$PATH"
# export PATH="/home/mbv/.asdf/installs/php/8.4.2/bin/composer/vendor/bin:$PATH"

# kitty symlinks
# export PATH="/usr/local/bin:$PATH"

# rocm
# export PATH=$PATH:/opt/rocm-6.3.3/bin

# autoload -U +X bashcompinit && bashcompinit
# complete -o nospace -C /usr/bin/terraform terraform

# zig
export PATH="/usr/local/zig/:$PATH"

# export GEM_HOME="$HOME/gems"
# export PATH="$HOME/gems/bin:$PATH"

# postgrestools
#export PATH="/usr/local/psql-lsp/latest:$PATH"

export PATH="/home/mbv/.gem/bin:$PATH"
export GEM_HOME=$HOME/.gem

# asdf
# . "$HOME/.asdf/asdf.sh"
#export ASDF_DATA_DIR="/home/mbv/.asdf"
#export PATH="$ASDF_DATA_DIR/shims:$PATH"

#source ~/.secrets/anthropic
#source ~/.secrets/openai

# claude yolo
alias yolo="claude --dangerously-skip-permissions"
