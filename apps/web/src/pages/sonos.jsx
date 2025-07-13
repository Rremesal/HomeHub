import { useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/default.layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSonosDevices } from "@/queries/sonos";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import Icon from "@/components/icon";
import { controlPlayer } from "@/mutations/sonos";
import { Slider } from "@heroui/slider";


function SonosPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: getSonosDevices
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["play", "pause"],
    mutationFn: controlPlayer,
  })

  const [currentDevice, setCurrentDevice] = useState(null);
  const [currentVolume, setCurrentVolume] = useState();

  useEffect(() => {
    setCurrentVolume(currentDevice?.volume)
  }, [currentDevice])

  if (!data) return "loading..."

  const handleChange = (keys) => {
    const matchDevice = data.find(item => item.ip_address === keys.currentKey)
    setCurrentDevice(matchDevice);
  }

  const handleControl = async (status) => {
    let action;
    if (status === "PAUSED_PLAYBACK" || status === "STOPPED") {
      action = "play"
    } else {
      action = "pause"
    }

    try {
      const updatedDeviceState = await mutateAsync({ action, ip: currentDevice.ip_address });
      console.log("updated state", updatedDeviceState);
      setCurrentDevice(updatedDeviceState);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleVolume = async (volume) => {
    setCurrentVolume(volume)
    try {
      const updatedDeviceState = await mutateAsync({ ip: currentDevice.ip_address, volume });
      setCurrentDevice(updatedDeviceState);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <DefaultLayout>
      <Select aria-label="select device" items={data} placeholder="Select device" onSelectionChange={handleChange}>
        {data.map(device => (
          <SelectItem key={device.ip_address} textValue={device.name}  className="text-foreground">
            {`${device.name} - ${device.status}`}
          </SelectItem>
        ))}
      </Select>

      <div className="flex flex-col">
        <div>
          <Button isDisabled={isLoading} onPress={() => handleControl(currentDevice?.status)} isIconOnly>
            <Icon name={currentDevice?.status === "STOPPED" || currentDevice?.status === "PAUSED_PLAYBACK"  ? "play" : "pause"} />
          </Button>
        </div>

        <Slider isDisabled={isLoading} aria-label="volume" value={currentVolume} onChange={handleVolume} maxValue={100} step={1} />
        <p>{`Current volume: ${currentVolume}`}</p>

      </div>


    </DefaultLayout>
  )
}

export default SonosPage;