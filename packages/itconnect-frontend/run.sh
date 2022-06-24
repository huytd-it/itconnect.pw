#!/bin/bash
source ../../scripts/docker_first.sh

docker rmi $(docker images -f "dangling=true" -q)
docker-compose stop
docker-compose rm -f
docker rmi wawahuy/itconnect_frontend:latest
docker-compose up -d
