#Set pin 24 as UART transmit: XBEE
echo 'Configuring Pin 24: XBEE Tx'
echo 0 > /sys/kernel/debug/omap_mux/uart1_txd

#Set pin 26 as UART receive: XBEE
echo 'Configuring Pin 26: XBEE Rx'
echo 20 > /sys/kernel/debug/omap_mux/uart1_rxd

#Set pin 21 as UART transmit: WiFly
echo 'Configuring Pin 21: WiFly Tx'
echo 1 > /sys/kernel/debug/omap_mux/spi0_d0

#Set pin 22 as UART transmit: WiFly
echo 'Configuring Pin 22: WiFly Rx'
echo 21 > /sys/kernel/debug/omap_mux/spi0_sclk2
