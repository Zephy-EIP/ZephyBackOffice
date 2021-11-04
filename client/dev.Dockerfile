FROM node:lts

ENV NODE_ENV development

EXPOSE 3000

WORKDIR /app
CMD ["/bin/sh", "/app/start.sh"]
