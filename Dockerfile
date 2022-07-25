FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]


# desta forma cria-se uma imagem do projeto que nos permite rodar/instalar em containers