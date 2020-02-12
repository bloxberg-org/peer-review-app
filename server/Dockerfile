FROM node:12.14.1-buster

USER 0:0
RUN groupadd -r -g 999 docker
RUN useradd -m -d /home/node/app -u 999 -g docker -s /bin/bash -r docker
RUN npm install forever -g
RUN mkdir -p ./home/node/app/
COPY / ./home/node/app/
RUN chown -R 999.999 ./home/node
EXPOSE 3000

USER 999:999
WORKDIR /home/node/app
RUN npm install

CMD ["npm", "start"]