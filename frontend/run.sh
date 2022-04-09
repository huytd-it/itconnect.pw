#!/bin/bash
docker-compose stop
docker-compose rm -f
docker rmi wawahuy/itconnect_frontend:latest
docker-compose up -d
