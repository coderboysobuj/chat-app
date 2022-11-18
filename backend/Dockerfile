FROM node:18

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://jisan:dsbSEO8WQkmrQIkuC0srlGHEn8JuyCfu@dpg-cdr8q3pgp3jnj84tfad0-a.singapore-postgres.render.com/chat_app_c3vh

ENV ACCESS_TOKEN_SECRET=hellodsfdfs
ENV REFRESH_TOKEN_SECRET=sdfjidsfwe

ENV CLIENT_URL=http://127.0.0.1:4173

# Work dir
WORKDIR /usr/src/app

# copy packer json file

COPY package*.json ./

# run npm install
RUN npm install


# copy source file
COPY . .

# build
RUN npm run build

# Expose the api port
EXPOSE 1337

CMD [ "node", "dist/server.js" ]
