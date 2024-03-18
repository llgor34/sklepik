# FRONTEND
FROM node:alpine AS frontendBuilder

WORKDIR /app

COPY frontend .

RUN npm install

RUN npm install --global @angular/cli

RUN ng build

# BACKEND
FROM node:alpine

WORKDIR /app

COPY backend .

RUN npm install

COPY --from=frontendBuilder /app/dist /app/dist

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]