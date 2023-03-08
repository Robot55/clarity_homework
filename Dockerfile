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

#seed initial database (we will remoe this on production)
RUN npx prisma migrate dev --name init

#run tests
RUN echo "running tests"
CMD [ "npm", "test" ]

#expose local port
EXPOSE 3000

#start server
CMD [ "node", "src/server.js" ]
