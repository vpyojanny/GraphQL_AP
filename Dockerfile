# Etapa 1: Construcción de la aplicación
FROM node:18 AS build

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Construcción de la imagen final
FROM node:18

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para la ejecución
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install --only=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
