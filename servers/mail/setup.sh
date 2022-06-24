#!/bin/bash
set -x #echo on

# update & install
apt update || apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update

echo "Asia/Ho_Chi_Minh" | tee /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata

apt install mailutils -y

cp main.cf /etc/postfix/main.cf
cp aliases /etc/aliases

service postfix restart
service postfix status

# docker-compose no shutdown
tail -F anything