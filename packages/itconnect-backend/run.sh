#!/bin/bash
set -x #echo on

source ../../scripts/docker_first.sh

git pull

docker rmi $(docker images -f "dangling=true" -q) -f
docker-compose stop
docker-compose rm -f
docker rmi wawahuy/itconnect_backend:latest
docker-compose up -d
