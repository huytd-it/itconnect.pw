#!/bin/bash

cd ${GITHUB_WORKSPACE}/frontend || true

docker-compose stop
docker-compose rm -f
docker-compose up -d
