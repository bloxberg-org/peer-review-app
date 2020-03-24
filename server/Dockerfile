FROM node:12.14.1-buster

# Create and cd the directory
WORKDIR /home/node/app
COPY . .

EXPOSE 3000
RUN npm install -g forever && npm install --production 

CMD ["forever", "server.js"]