# Define a imagem base
FROM nginx

# Copia os arquivos de requisitos para o diretório de trabalho
COPY . /usr/share/nginx/html

#informa a porta que deverá ser liberada na criação do container
EXPOSE 80

# Define o comando de execução do servidor nginx
CMD ["nginx", "-g", "daemon off;"]

