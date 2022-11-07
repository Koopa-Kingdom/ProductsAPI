FROM node:19

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]