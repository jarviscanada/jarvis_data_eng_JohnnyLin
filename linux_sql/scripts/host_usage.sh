#! /bin/bash

# ./scripts/host_usage.sh psql_host psql_port db_name psql_user psql_password
# A script used to capture resource usage into a psql instance

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

#retrieve resource usage
vmstat_mb=$(vmstat --unit M)
hostname=$(hostname -f)

memory_free=$(echo "$vmstat_mb" | tail -n1 | awk '{print $4}' | xargs)
cpu_idle=$(echo "$vmstat_mb" | tail -n1 | awk '{print $15}' | xargs)
cpu_kernel=$(echo "$vmstat_mb" | tail -n1 | awk '{print $14}' | xargs)
disk_io=$(vmstat -d | tail -1 | awk '{print $10}' | xargs)
disk_available=$(df -BM / | tail -1 | awk '{print $4}' | sed 's/M//' | xargs)
timestamp=$(date --utc +"%Y-%m-%d %H:%M:%S")

# subquery
host_id="(SELECT id FROM host_info WHERE hostname='$hostname')"

# construct query
insert_stmt="INSERT INTO host_usage (timestamp, host_id, memory_free, cpu_idle, cpu_kernel, disk_io, disk_available)
             VALUES ('$timestamp', $host_id, '$memory_free', '$cpu_idle',
                     '$cpu_kernel', '$disk_io', '$disk_available');"

# set env var
export PGPASSWORD=$psql_password
# run query in psql instance
psql -h "$psql_host" -p "$psql_port" -d "$db_name" -U "$psql_user" -c "$insert_stmt"
exit $?