#!/bin/bash
docker rmi wawahuy/itconnect_frontend:latest
docker-compose stop
docker-compose rm -f
docker-compose up -d
