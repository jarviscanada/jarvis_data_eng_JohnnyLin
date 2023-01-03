#! /bin/bash

# ./scripts/host_info.sh psql_host psql_port db_name psql_user psql_password
# A script used to capture hardware specs into a psql instance

# capture CLI arguments
psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

# check # of CLI arguments
if [ $# -ne 5 ]; then
    echo "Not enough arguments"
    exit 1;
fi

# retrieve hardware specifications
lscpu_out=$(lscpu)

hostname=$(hostname -f)
cpu_number=$(echo "$lscpu_out" | grep -E "^CPU\(s\):" | awk '{print $2}' | xargs)
cpu_architecture=$(echo "$lscpu_out" | grep -E "^Architecture:" | awk '{print $2}' | xargs)
cpu_model=$(echo "$lscpu_out" | grep -E "^Model name:" | awk '{$1="";$2="";print}' | xargs)
cpu_mhz=$(echo "$lscpu_out" | grep -E "^CPU MHz:" | awk '{print $3}' | xargs)
l2_cache=$(echo "$lscpu_out" | grep -E "^L2 cache:" | awk '{print $3}' | sed 's/K//' | xargs)
total_mem=$(grep -E "^MemTotal" < /proc/meminfo | awk '{print $2}' | xargs)
timestamp=$(date --utc +"%Y-%m-%d %H:%M:%S")

# construct query
insert_stmt="INSERT INTO host_info (hostname, cpu_number, cpu_architecture, cpu_model, cpu_mhz,
                                    l2_cache, total_mem, timestamp)
             VALUES ('$hostname', '$cpu_number', '$cpu_architecture', '$cpu_model', '$cpu_mhz',
                     '$l2_cache', '$total_mem', '$timestamp');"

# set env var
export PGPASSWORD=$psql_password
# run query in psql instance
psql -h "$psql_host" -p "$psql_port" -d "$db_name" -U "$psql_user" -c "$insert_stmt"
exit $?