# Use a imagem base com Node.js
FROM node:20

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Gere o Prisma schema
RUN npx prisma generate --schema=prisma/schema.prisma

# Execute as migrações do Prisma
RUN npx prisma migrate deploy --schema=prisma/schema.prisma

# Exponha a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]