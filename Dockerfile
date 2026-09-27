# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-bullseye AS build-stage

WORKDIR /listshop-webclient

COPY package*.json /listshop-webclient/

RUN npm install

COPY ./ /listshop-webclient/
#ARG configuration=production

RUN npm run build -- --output-path=./dist/out --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*
COPY --from=build-stage /listshop-webclient/dist/out/ /usr/share/nginx/html

# Copy a default nginx.conf for Angular apps
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

COPY ./build/entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["sh","/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
