FROM node:24-alpine as build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:24-alpine 
COPY package.json package-lock.json ./
COPY --from=build /dist ./dist
RUN npm ci --omit=dev
EXPOSE 12000
CMD [ "sh", "-c", "npm run kafka:deploy && node dist/main.js"]






