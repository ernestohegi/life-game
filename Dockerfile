FROM node:18-alpine
COPY . app/
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start
