FROM node:18.20.2

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .

CMD ["node","main.js"]
