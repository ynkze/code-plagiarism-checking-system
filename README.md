## For client

` npm run dev `

## For Judge0 ref with HTTP

Install Docker and Docker Compose.
Download and extract the release archive:
wget https://github.com/judge0/judge0/releases/download/v1.13.0/judge0-v1.13.0.zip
unzip judge0-v1.13.0.zip
Run all services and wait a few seconds until everything is initialized:
` cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s `
Your instance of Judge0 CE v1.13.0 is now available at http://<IP ADDRESS OF YOUR SERVER>:2358.

language_id for c++: {
    "id": 50,
    "name": "C (GCC 9.2.0)"
}

"/submissions/" encode source code to base64 and set to true => check token dont need set to true