FROM alpine
COPY . .
RUN apk add --update nodejs npm
RUN npm install --save discord-player
CMD ["npm", "start"]