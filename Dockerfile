From node:18-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install
RUN npm install typescript

COPY . .

EXPOSE 3000

CMD ["npm", "run","start"]

