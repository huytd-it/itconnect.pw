#!/bin/bash

network=(itconnect_nginx)
volume=(
  itconnect_fe_built
  itconnect_ssl
  itconnect_mysql_data
  itconnect_mysql_data_local
  itconnect_redis_data_local
  itconnect_redis_data
)

for i in "${network[@]}"
do
  if [[ "$(docker network ls | grep "${i}")" == "" ]] ; then
    docker network create "${i}"
  fi
done

for i in "${volume[@]}"
do
  if [[ "$(docker volume ls | grep "${i}")" == "" ]] ; then
    docker volume create "${i}"
  fi
done
