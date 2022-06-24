FROM node:15.13-alpine

WORKDIR /react

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build