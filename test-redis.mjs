import { createClient } from "redis";

const client = createClient({
  url: "redis://default:86dJFD3IdakRJVgqkS91FskO6qZ9hoJX@redis-12444.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:12444",
});

client.on("error", (err) => console.error("❌ Redis error:", err));

try {
  await client.connect();
  console.log("✅ Connected to Redis!");
} catch (err) {
  console.error("❌ Connection failed:", err);
} finally {
  await client.quit();
}
