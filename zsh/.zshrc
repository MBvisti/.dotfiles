export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"

plugins=(git)

source $ZSH/oh-my-zsh.sh

if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='vi'
fi

alias vi="/usr/bin/nvim"
alias nvim="/usr/bin/nvim"

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

export GOPATH=/home/mbv/golang
export GOBIN=/home/mbv/golang/bin
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT
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

alias yolo="claude --dangerously-skip-permissions"

alias hypr=/usr/bin/Hyprland

alias dr="QT_QPA_PLATFORM=xcb /opt/resolve/bin/resolve"
