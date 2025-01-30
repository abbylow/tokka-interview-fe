# Build the Docker image
docker build -t frontend-app:local .

# Note: 
The docker-compose.yaml is on the backend repo ()

# After running the docker-compose file on backend side, you can test if this frontend app works by accessing:
http://localhost:3000/