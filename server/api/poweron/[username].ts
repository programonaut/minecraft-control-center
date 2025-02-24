export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const allowedUsernames = (process.env.ALLOWED_USERNAMES ?? "").split(",");

  console.log(allowedUsernames);

  if (username && allowedUsernames.includes(username)) {
    const apiKey = process.env.HETZNER_API_KEY;
    const serverId = process.env.HETZNER_SERVER_ID;

    if (!apiKey) {
      throw new Error("No API key set");
    }

    const statusRes = await $fetch<{ server: { status: string } }>(
      "https://api.hetzner.cloud/v1/servers/" + serverId,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const isRunning = statusRes.server.status === "running";
    console.log(statusRes);

    if (isRunning) {
      throw createError({
        statusCode: 500,
        statusMessage: "The server is already running!",
      });
    }

    const startRes = await $fetch<{ server: { status: string } }>(
      "https://api.hetzner.cloud/v1/servers/" + serverId + "/actions/poweron",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    setResponseStatus(event, 201);
    return {
      started: true,
    };
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "No access",
    });
  }
});
