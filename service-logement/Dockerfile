FROM maven:3.8.4-openjdk-11-slim AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
 
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/logement-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","./logement-0.0.1-SNAPSHOT.jar", "-Dspring.config.location='file:./src/main/resources/application.properties'"]