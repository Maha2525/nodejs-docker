FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install --production



FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8080
CMD ["node", "server.js"]
