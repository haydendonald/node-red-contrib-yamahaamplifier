# node-red-contrib-yamahaamplifier
Tested Using the XMV4280

# In the testing phase, might have bugs, use at your own risk.

This is not completed. The current commands that can be sent are:
# Turn the amp on / off
* msg.payload.command = "power:standby"
* msg.payload.direction = "set/get"
* msg.payload.value = "off/standby"

# Mute a channel
* msg.payload.command = "volume:mute"
* msg.payload.direction = "set/get"
* msg.payload.xPosition = "0-4"
* msg.payload.value = "on/off"

# Set a channels volume
* msg.payload.command = "volume:ATT"
* msg.payload.direction = "set/get"
* msg.payload.xPosition = "0-4"
* msg.payload.value = "-99-0"

There are no working friendly "updates" from the unit (changing the volueme else where). I may add them in the future, but for my use i don't need them, sorry.
All of the above will respond if you get the values etc.