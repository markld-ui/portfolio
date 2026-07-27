FROM nginx:1.27-alpine

RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --chown=appuser:appgroup . /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx /var/run && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /etc/nginx/conf.d && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    rm -f /etc/nginx/conf.d/default.conf

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]