FROM node:13-alpine
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install
RUN npm run build
CMD npm start
EXPOSE 3000
