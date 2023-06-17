FROM node:18

RUN apt update && \
    apt install -y wget netcat-openbsd && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
