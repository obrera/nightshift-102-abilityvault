FROM oven/bun:1.3.12 AS install
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM oven/bun:1.3.12 AS build
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.3.12
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV PUBLIC_BASE_URL=https://abilityvault102.colmena.dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/abilityvault ./src/abilityvault
COPY --from=install /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["bun", "server/index.ts"]
