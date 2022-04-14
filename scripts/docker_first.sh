#!/bin/bash

networkName=itconnect_nginx
volumeFEBuilt=itconnect_fe_built

if [[ "$(docker network ls | grep "${networkName}")" == "" ]] ; then
  docker network create "${networkName}"
fi

if [[ "$(docker volume ls | grep "${volumeFEBuilt}")" == "" ]] ; then
  docker volume create "${volumeFEBuilt}"
fi
