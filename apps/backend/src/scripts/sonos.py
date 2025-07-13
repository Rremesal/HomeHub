import argparse
import time
from soco import *

parser = argparse.ArgumentParser(description="Control Sonos devices")

parser.add_argument("-ip", action="store", help="The ip of the sonos device")

parser.add_argument("-d", "-discover", action="store_true", help="Discover all Sonos devices near you")

parser.add_argument("-p", "--play", action="store_true", help="Plays the selected sonos device")

parser.add_argument("-vol", "--volume", action="store", help="Sets the volume of the Sonos device")

parser.add_argument("-s", "--stop", action="store_true", help="Stops the currently played song")

args = parser.parse_args()

if args.d:
    devices = discover()
    device_list = []
    if devices is None:
        print("No devices were found")
    else:
      for device in devices:
          status = device.get_current_transport_info()
          device_object = {}
          device_object["volume"] = device.volume
          device_object["status"] = status["current_transport_state"]
          device_object["name"] = device.player_name
          device_object["ip_address"] = device.ip_address
          device_list.append(device_object)
      print(device_list, end='')
      exit()

if args.ip:
    zone = SoCo(args.ip)

    if args.play:
      zone.play()

    elif args.volume:
      zone.volume = args.volume
      time.sleep(0.7)

    elif args.stop:
       zone.pause()

    device_object = {}
    device_object["volume"] = zone.volume
    status = zone.get_current_transport_info()
    device_object["status"] = status["current_transport_state"]
    device_object["name"] = zone.player_name
    device_object["ip_address"] = zone.ip_address
    print(device_object, end='')


# if args.play and args.ip:
#     zone = SoCo(args.ip)
#     zone.play()
    
#     device_object = {}
#     status = zone.get_current_transport_info()
#     device_object["volume"] = zone.volume
#     device_object["status"] = status["current_transport_state"]
#     device_object["name"] = zone.player_name
#     device_object["ip_address"] = zone.ip_address
#     print(device_object, end='')

# if args.ip and args.volume:
#   zone = SoCo(args.ip)
#   zone.volume = args.volume

#   device_object = {}
#   device_object["volume"] = zone.volume
#   status = zone.get_current_transport_info()
#   device_object["status"] = status["current_transport_state"]
#   device_object["name"] = zone.player_name
#   device_object["ip_address"] = zone.ip_address
#   print(device_object, end='')

# if args.ip and args.stop:
#     zone = SoCo(args.ip)
#     zone.stop()

#     device_object = {}
#     device_object["volume"] = zone.volume
#     status = zone.get_current_transport_info()
#     device_object["status"] = status["current_transport_state"]
#     device_object["name"] = zone.player_name
#     device_object["ip_address"] = zone.ip_address
#     print(device_object, end='')

      



