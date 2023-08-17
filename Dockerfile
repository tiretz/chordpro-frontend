FROM node:latest as builder
COPY . /app
WORKDIR /app
RUN npm i && npm run build

FROM nginx:latest
EXPOSE 80
COPY --from=builder /app/dist/chordpro /usr/share/nginx/html