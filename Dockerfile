FROM node:20
WORKDIR /app
ENV PORT 3000
ENV MODEL_URL 'https://storage.googleapis.com/melly-model-mlgc-ezra/model.json'
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]