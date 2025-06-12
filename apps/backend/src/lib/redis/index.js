import { addMinutes, differenceInMilliseconds } from "date-fns";
import Redis from "ioredis";

const client = new Redis();

class Session {

  async createSession(sessionToken, userId, req) {
    try {
      const session = {
        user_id: userId,
        ip: req.ip,
        session_started_at: new Date(),
        session_valid_until: addMinutes(new Date(), 30)
      };
      client.set(`session:${sessionToken}`, JSON.stringify(session));
      return differenceInMilliseconds(session.session_valid_until, session.session_started_at);
    } catch (error) {
      return null;
    }
  }

  async getSession(sessionToken) {
    const session = await client.get(`session:${sessionToken}`);
    return JSON.parse(session);
  }

  async deleteSession(sessionToken) {
    const isDeleted = await client.del(`session:${sessionToken}`);

    return !!isDeleted;
  }

  async getAllSessionKeys() {
    return await client.keys("*");
  }
}





export default Session;

