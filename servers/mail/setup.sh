#!/bin/bash
set -x #echo on

# update & install
apt update || apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update



# docker-compose no shutdown
tail -F anything