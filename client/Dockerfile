FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY .   .

ENV PORT 3002

RUN apt-get update && apt-get -y install mc

EXPOSE 3002

CMD npm run serve