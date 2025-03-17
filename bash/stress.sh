#!/bin/bash

while [ 1 ]
do
        stress-ng --cpu 2 --io 2 --vm 2 --hdd 2 --netdev 2 -t 10s
        wait
        sleep 10
done