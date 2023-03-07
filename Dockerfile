FROM node:14.17.0

# Create app directory
WORKDIR /usr/src/app

# add dependencies
COPY package*.json ./

# install dependencies
RUN npm install
# RUN npm ci --only=production

# add app source
COPY . .

#seed initial database
RUN npx prisma migrate dev --name init

#expose local port
EXPOSE 3000

#start server
CMD [ "node", "src/server.js" ]
