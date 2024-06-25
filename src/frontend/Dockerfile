FROM node:18-alpine

WORKDIR /app/src/frontend

COPY . /app/src/frontend/.

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]