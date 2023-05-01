## Prequistes

- node/npm installed
- First time running need to install dependencies for both client and server folder, go to each folder and run ` npm install `

## For client

- To start client, in client folder type command ` npm run dev `
- Server will be hosted at http://localhost:5173/ (can see the UI)

## For server

- To start server, in server folder type command ` npm run dev `
- Backend will run at port 5000, can send request to http://localhost:2358/ to add user or questions etc.

## For initializing Judge0 (HTTP)

- Install Docker and Docker Compose.
- Download and extract the release archive:

` wget https://github.com/judge0/judge0/releases/download/v1.13.0/judge0-v1.13.0.zip `
- unzip judge0-v1.13.0.zip
- Run all services and wait a few seconds until everything is initialized:

<code> cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s </code>

### Just for reference
- Instance of Judge0 CE v1.13.0 is now available at "http://localhost:2358" (can send request like backend for more info refer to Judge0 API docs https://ce.judge0.com/)
- language_id used for c(GCC 9.2.0) is id 50
- "/submissions/" encode source code to base64 and set to true => check token don't need set to true