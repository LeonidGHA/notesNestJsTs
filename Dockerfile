FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4040

VOLUME [ "/app/data" ]

CMD [ "npm", "run", "start:dev" ]

