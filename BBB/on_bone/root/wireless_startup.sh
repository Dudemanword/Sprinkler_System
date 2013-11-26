echo 'Entered Script' > script.log
systemctl stop wpa_supplicant
ifconfig wlan0 up
wpa_supplicant -Dwext -iwlan0 -c /etc/wpa_supplicant.conf

