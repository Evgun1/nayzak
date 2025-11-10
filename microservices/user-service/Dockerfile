FROM node:24-alpine as build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate 
RUN npm run build


FROM node:24-alpine 
COPY package.json package-lock.json ./
COPY --from=build /dist ./dist
COPY --from=build /src/prisma ./prisma
RUN npm ci --omit=dev
EXPOSE 11000
CMD ["sh", "-c", "npm run db:deploy && node dist/scripts/createUsers/createUsers.js && npm run kafka:deploy  && node dist/main.js"]






