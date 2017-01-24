FROM mhart/alpine-node
RUN mkdir /test
WORKDIR /test
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm","start","--production"]
