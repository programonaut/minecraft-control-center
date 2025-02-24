export default defineEventHandler(async (event) => {
  const apiKey = process.env.HETZNER_API_KEY;
  const serverId = process.env.HETZNER_SERVER_ID;

  if (!apiKey) {
    throw new Error("No API key set");
  }

  const res = await $fetch<{ server: { status: string } }>(
    "https://api.hetzner.cloud/v1/servers/" + serverId,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const isRunning = res.server.status === "running";
  console.log(res);

  setResponseStatus(event, 201);
  return {
    isRunning,
  };
});
