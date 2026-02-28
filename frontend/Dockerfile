FROM node:20-alpine
WORKDIR /opt/app
COPY package.json ./
COPY package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0"]
