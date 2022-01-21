FROM node:16-alpine
RUN apk add python3
RUN npm install -g npm
RUN mkdir -p /usr/src/musicbot
WORKDIR /usr/src/musicbot
COPY package.json /usr/src/musicbot
RUN npm install
COPY . /usr/src/musicbot
EXPOSE 9100
CMD ["node","main.js"]
