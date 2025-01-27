FROM node:19-alpine AS firststage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .


FROM firststage AS final
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
