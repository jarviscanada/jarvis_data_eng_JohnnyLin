#! /bin/bash

# ./scripts/psql_docker.sh start|stop|create [db_username] [db_password]
# A script that can start, stop or create a psql docker container

# capture CLI arguments
cmd=$1
db_username=$2
db_password=$3

# start docker if not already running
sudo systemctl status docker || sudo systemctl start docker

# check container status
docker container inspect jrvs-psql
container_status=$?

# switch case to handle create|stop|start operations
case $cmd in
  create)
    # check if container is created
    if [ $container_status -eq 0 ]; then
        echo 'Container already exists'
        exit 1
    fi

    # check # of CLI arguments
    if [ $# -ne 3 ]; then
        echo 'Create requires username and password'
        exit 1
    fi

    # create container
    docker volume create pgdata
    docker run --name jrvs-psql -e POSTGRES_USER="$db_username" -e POSTGRES_PASSWORD="$db_password" -d -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:9.6-alpine
    exit $?
    ;;

  start|stop)
    # check if container is created
    if [ $container_status -ne 0 ]; then
        echo 'Container does not exist'
        exit 1
    fi

    # start/stop container
    docker container "$cmd" jrvs-psql
    exit $?
    ;;

  # handle illegal command argument
  *)
    echo 'Illegal command'
    echo 'Commands: start|stop|create'
    exit 1
    ;;
esac