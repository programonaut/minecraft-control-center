# Minecraft Control Center
A simple utility to let your friends start a Hetzner server that is running Minecraft inside a Docker container.

## Prequesites
1. Hetzner Server -> Server id
2. Hetzner API Key
3. Docker and docker compose installed

## Steps
1. Add a service that start a certain docker container when starting the server:
   1. `sudo nano /etc/systemd/system/docker-container-minecraft.service`
   2. add the contents of `service.txt`
   3. `sudo systemctl daemon-reload`
   4. `sudo systemctl enable docker-container-minecraft.service`
2. Run `docker compose up -d` on the docker compose file
3. Create a cron job that check for running containers every minute:
   1. `crontab -e`
   2. `* * * * * bash ~/projects/status.bash`