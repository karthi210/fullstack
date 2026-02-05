FROM node:18

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

COPY backend ./backend
COPY frontend ./frontend

EXPOSE 8000

CMD ["node", "backend/server.js"]
