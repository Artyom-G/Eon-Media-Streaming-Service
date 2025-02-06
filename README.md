# YouFlix

![alt text](https://github.com/Artyom-G/Eon-Media-Streaming-Service/blob/main/Screenshot1.jpg?raw=true)

## You can try out the demo here:

[https://youflix.artyomg.com](https://youflix.artyomg.com)

NOTE: I am using a free tier to host the backend, and that means the server shuts down due to inactivity, it starts automatically on use but it takes a minute

## Video of the demo can be found here:

[https://youtu.be/v8dRREWRz8Q](https://youtu.be/v8dRREWRz8Q)


## Tech Stack

### Backend

- Node.js

- Express.js

- Postman

- Mongoose

- ElasticSearch (with AWS OpenSearch)

- Render (for deployment)


#### Endpoints

The backend can be found at [https://eon-media-streaming-service.onrender.com](https://eon-media-streaming-service.onrender.com) with endpoints:

- /api/v1/videos [POST]

- /api/v1/videos [GET]

- /api/v1/search [GET] (?query=keyword)

- /api/v1/videos/id [GET]

### Frontend

- React.js
- SASS
- Cybrancee (for deployment)

### Database

- MongoDB


# Clonning the repo

```
git clone https://github.com/Artyom-G/Eon-Media-Streaming-Service.git
```

# Running the Servers

## Frontend

Setting up the frontend can be done with

```
cd frontend
npm install
cd ..
```

Running is done with:

```
cd frontend
npm start
cd ..
```

## Backend

Setting up the backend can be done with

```
cd backend
npm install
cd ..
```

Running is done with

```
./backend/main.py/
```