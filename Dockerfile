FROM node:12-alpine
COPY . app/
WORKDIR /app
RUN yarn install
RUN npm run build
EXPOSE 5000
RUN npm run start