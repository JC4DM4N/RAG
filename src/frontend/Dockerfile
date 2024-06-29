FROM node:18-alpine

WORKDIR /app/src/frontend

COPY . /app/src/frontend/.

# Install curl
RUN apk add --no-cache curl

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]