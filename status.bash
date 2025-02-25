#!/bin/bash

running_containers=$(docker ps -q)

if [ -z "$running_containers" ]; then
    echo "No running containers detected, shutting down server."
    sudo shutdown -h now
fi