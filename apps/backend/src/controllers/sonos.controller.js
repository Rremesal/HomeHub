import { exec } from "child_process"
import path, { dirname } from "path";

import errors from "../utils/errors.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = path.resolve(__dirname, "../scripts")

class SonosController {

  async discover(req, res) {
    const scriptPath = path.resolve(__dirname, "../scripts")
    exec("python sonos.py -d", { cwd: scriptPath }, (error, out, stderr) => {
      if (error) {
        console.log(error)
        return res.status(500).json(errors.SOMETHING_WENT_WRONG);
      }

      if (stderr) {
        console.log(stderr)
        return res.status(500).json(errors.SOMETHING_WENT_WRONG);
      }

      console.log(out)
      const formattedOutput = out.replace(/'/g, '"');
      const ipArray = JSON.parse(formattedOutput);
      return res.status(200).json(ipArray);
    })
  }

  async control(req, res) {
    const { action, ip, volume } = req.body;

    console.log(`python sonos.py -ip=${ip} ${volume && `-vol=${volume}`} ${action === "play" ? "-p" : "-s"}`)

    exec(`python sonos.py -ip=${ip} ${volume ? `-vol=${volume}` : ""} ${action === "play" ? "-p" : "-s"}`, { cwd: scriptPath }, (error, out, stderr) => {
      if (error) {
        console.log("error", error)
        return res.status(500).json(errors.SOMETHING_WENT_WRONG);
      }

      if (stderr) {
        console.log("std error", stderr)
        return res.status(500).json(errors.SOMETHING_WENT_WRONG);
      }

      const formattedOutput = out.replace(/'/g, '"');
      const device = JSON.parse(formattedOutput);
      console.log("updated state of device", device)
      return res.status(200).json(device);
    })
  }
}

export default SonosController;
