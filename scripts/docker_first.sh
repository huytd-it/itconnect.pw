#!/bin/bash

networkName=itconnect_nginx
volumeFEBuilt=itconnect_fe_built
volumeSSL=itconnect_ssl

if [[ "$(docker network ls | grep "${networkName}")" == "" ]] ; then
  docker network create "${networkName}"
fi

if [[ "$(docker volume ls | grep "${volumeFEBuilt}")" == "" ]] ; then
  docker volume create "${volumeFEBuilt}"
fi

if [[ "$(docker volume ls | grep "${volumeSSL}")" == "" ]] ; then
  docker volume create "${volumeSSL}"
fi
