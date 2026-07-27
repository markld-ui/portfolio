FROM nginx:1.27-alpine

RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appgroup site/ /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx /var/run && \
    chown -R appuser:appgroup /var/cache/nginx /var/run && \
    rm -f /etc/nginx/conf.d/default.conf.bak

USER appuser

EXPOSE 8080 8443

CMD ["nginx", "-g", "daemon off;"]