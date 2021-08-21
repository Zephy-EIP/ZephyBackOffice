FROM node:lts
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
EXPOSE 3000
CMD ["yarn", "dev"]