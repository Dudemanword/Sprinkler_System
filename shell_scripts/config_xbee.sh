#!/bin/bash
sudo stty 9600 cs8 </dev/ttyUSB0
echo "Finished Here"
echo -en "+++" > /dev/ttyUSB0 
echo "finished sending command"
#while read -r line < /dev/ttyUSB0; do
#	echo $result > /dev/ttyUSB0
#done
cat -v /dev/ttyUSB0 > output
echo "done"
