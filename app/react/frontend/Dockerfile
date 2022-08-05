FROM node:15.13-alpine

COPY . /react

WORKDIR /react

RUN npm install
RUN npm i @react-google-maps/api

RUN npm run build --verbose

