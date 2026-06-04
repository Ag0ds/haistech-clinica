# Stage 1: Build da aplicacao usando Maven
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Baixa as dependencias do maven, aproveitando cache
RUN mvn dependency:go-offline

COPY src ./src
# Faz o build pulando testes para ir mais rapido no Docker build
RUN mvn clean package -DskipTests

# Stage 2: Cria a imagem final mais enxuta apenas com o JRE
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia o .jar gerado do estagio anterior
COPY --from=build /app/target/clinica-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
