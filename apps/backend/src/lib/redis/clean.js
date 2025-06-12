import Redis from "ioredis";

const client = new Redis();

const cleanRedis = async () => {
  const amountOfKeys =  await client.keys("*").length || 0;
  await client.flushdb();
  return amountOfKeys;
};

cleanRedis()
.then(data => {
  console.log(`Removed ${data} keys from redis`);
  process.exit();
})
.catch(error => console.log(`[ERROR]: ${error}`));