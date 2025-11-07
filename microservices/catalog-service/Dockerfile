FROM node:24-alpine as build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:24-alpine as production
COPY package.json package-lock.json ./
COPY --from=build /dist ./dist
COPY --from=build /src/prisma ./prisma
RUN npm ci --omit=dev
EXPOSE 14000
CMD ["sh", "-c", "npm run db:deploy && npm run kafka:deploy && npm run faker:deploy  && node dist/main.js"]






