FROM node:22-alpine AS frontend
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src ./src
COPY scripts ./scripts
COPY public ./public
COPY assets/roman.jpg ./public/assets/roman.jpg
RUN npm test
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS backend
WORKDIR /src
COPY Portfolio.Api/Portfolio.Api.csproj Portfolio.Api/
RUN dotnet restore Portfolio.Api/Portfolio.Api.csproj
COPY Portfolio.Api/ Portfolio.Api/
RUN dotnet publish Portfolio.Api/Portfolio.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine
WORKDIR /app
COPY --from=backend /app .
COPY --from=frontend /src/dist ./wwwroot
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
