# FRONTEND
FROM node:alpine AS frontendBuilder

WORKDIR /app
COPY frontend .

RUN npm install
RUN npm install --global @angular/cli
RUN ng build


# BACKEND
FROM node:alpine as backendBuilder

WORKDIR /app
COPY backend .

RUN npm install --omit=dev


# APP
FROM node:alpine as appBuilder

RUN adduser --disabled-password --home /home/container container
USER container

WORKDIR /home/container

COPY --from=frontendBuilder /app/dist /home/container/dist
COPY --from=backendBuilder /app /home/container

EXPOSE 3000

CMD ["npm", "run", "start"]