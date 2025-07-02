import { addMinutes } from "date-fns";
import { config } from "dotenv";
import { Redis } from "ioredis";

config();

class RedisClient {
  connection = new Redis();

  /**
   * 
   * @param {string} sessionToken - The session token generated on the server
   * @param {string} userId - The id of the user that is signing in
   * @param {string} ip - the ip of the user that is signing in
   * @returns void
   */
  createSession = (sessionToken, userId, ip) => {
    const session = {
      aud: process.env.APP_DOMAIN,
      expiry: addMinutes(new Date(), 30),
      userId,
      ip
    }

    this.connection.set(`session:${sessionToken}`, JSON.stringify(session));
  }

  /**
   * @param {string} sessionToken - the session token that is sent with the request
   * @returns The session associated with the given session token
   */
  getSession = async (sessionToken) => {
    const session = await this.connection.get(`session:${sessionToken}`);
    return JSON.parse(session);
  }

  /**
   * 
   */
  deleteSession = async (sessionToken) => {
    return await this.connection.del(`session:${sessionToken}`);
  }
}

export default RedisClient;


