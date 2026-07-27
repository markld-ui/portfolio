FROM nginx:1.27-alpine

RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appgroup *.html /usr/share/nginx/html/
COPY --chown=appuser:appgroup assets/ /usr/share/nginx/html/assets/

RUN mkdir -p /var/cache/nginx /tmp/nginx && \
    chown -R appuser:appgroup /var/cache/nginx /tmp/nginx

USER appuser

EXPOSE 8080 8443

CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]