---
id: knowledge-base--linux-index
aliases: []
tags: []
---

[Back To Index](/knowledge-database/index.md)

# Linux

<!--toc:start-->
- [Linux](#linux)
  - [Misc](#misc)
<!--toc:end-->

## Find large folders
As always in Linux, there's more than one way to get the job done. However, if you need to do it from CLI, this is my
preferred method:

I start by running this as root or with sudo:

```bash
du -cha --max-depth=1 / | grep -E "M|G"
```

The grep is to limit the returning lines to those which return with values in the Megabyte or Gigabyte range. If your 
disks are big enough, you could add |T as well to include Terabyte amounts. You may get some errors on /proc, /sys, 
and/or /dev since they are not real files on disk. However, it should still provide valid output for the rest of the 
directories in root. After you find the biggest ones you can then run the command inside of that directory in order to 
narrow your way down the culprit. So for example, if /var was the biggest you could do it like this next:

```bash
du -cha --max-depth=1 /var | grep -E "M|G"
```

## SSH stuff
To generate the extra pair of ssh keys, use [this](https://betterprogramming.pub/how-to-set-up-multiple-ssh-keys-ae6688f76570)

Add the .pub key to `~/.ssh/authorised_keys` (just add a new line)
Add the private key as a secret to the gh repo
Add the host of droplet as a secret to the gh repo
Add the username of the user creating the ssh key (i.e. your computer user) of droplet as a secret to the gh repo

## Permission stuff
  - to recursively give permissions to a directory, use this: `chmod -R <permissionsettings> <dirname>`

## These are the common top-level directories associated with the root directory:
  - /bin – binary or executable programs.
  - /etc – system configuration files.
  - /home – home directory
  - /opt – optional or third-party software.
  - /tmp – temporary space, typically cleared on reboot.
  - /usr – User related programs.
  - /var – log files.

## What is listening on X port
  - sudo lsof -i -P -n | grep LISTEN
  - ssudo netstat -tulpn | grep LISTEN
  - sudo ss -tulpn | grep LISTEN
  - sudo lsof -i:22 ## see a specific port such as 22 ##
  - sudo nmap -sTU -O IP-address-Here

## Check if package is installed in apt
  - `apt -qq list package-name`

## Check if package is installed using dkpg
- `dpkg -l {package-name}`

## Handling .tar.gz files
[Go here](https://linuxize.com/post/how-to-extract-unzip-tar-gz-file/)

## Handling .gnu.gz files
[Go here](https://linuxize.com/post/gzip-command-in-linux/)

## misc stuff
### To improve key repeat:
```bash
  xset r rate 220 40
```
### Connect to headset through terminal
bluetoothctl connect 14:3F:A6:C2:70:FC | new -> AC:80:0A:37:CF:A5

#### If issues with above
```bash
  rfkill unblock all
  
  bluetoothctl power on
```

## Kill port
fuser -k PORT/tcp

### To fix touchpad freezing
Open a terminal and run the following:
  1. `xinput list` and locate the touchpad's id
  2. `xinput disable touchpad-id-here`
  3. `xinput enable touchpad-id-here`

## Misc
Difference between things like 'apt', 'deb' and 'flatpak', 'snap':
It highlights that apt is primarily for managing Debian packages and dependencies, whereas snap and flatpak use containerization to handle dependencies more flexibly. While this flexibility aids in avoiding dependency conflicts, it also increases resource usage and can lead to integration issues with the desktop environment. Security concerns are also mentioned, with a desire for improved package review processes and trust-building measures like package signing.


## Connect wifi through terminal

To see list of available wifis:
```sh
nmcli dev wifi list
```

To connect:
```sh
sudo nmcli dev wifi connect <network-name> password <password>
```

To enable/disable wifi:
```sh
nmcli radio wifi on/off
```

Or have a popup ask for pw:
```sh
sudo nmcli --ask dev wifi connect <network-name>
```

Show connecion:
```sh
nmcli con show
```


## Articles
  - [X] [Pipe, Grep and Sort Command in Linux/Unix with Examples](https://www.guru99.com/linux-pipe-grep.html#:~:text=is%20a%20Filter%3F-,What%20is%20a%20Pipe%20in%20Linux%3F,'%7C'%20denotes%20a%20pipe.)
  - [ ] [The Difference Between “>” and “>>” in Linux](https://linuxhint.com/difference-arrow-double-arrow-bash/)
