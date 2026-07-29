FROM node:22-alpine AS frontend
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src ./src
COPY scripts ./scripts
COPY public ./public
COPY assets/roman.jpg ./public/assets/roman.jpg
RUN npm test \
    && npm run build \
    && find dist -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.xml' -o -name '*.txt' \) -exec gzip -9 -k {} \;

FROM nginx:1.27-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /src/dist /usr/share/nginx/html
EXPOSE 8080 8443
