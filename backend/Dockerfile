# Stage 1: install production dependencies
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev \
    && npm cache clean --force


# Stage 2: production runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Remove npm and npx from the runtime image
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack

EXPOSE 3000

CMD ["node", "server.js"]