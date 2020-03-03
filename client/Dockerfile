FROM node:12.14.1-buster as builder
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install --production
RUN npm run build


FROM nginx:alpine
# Copy the build folder from react to the root of nginx (www)
COPY --from=builder /home/node/app/build /usr/share/nginx/html
# If you are using react router you need to overwrite the default nginx configurations 
# Remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# Replace with custom one
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]