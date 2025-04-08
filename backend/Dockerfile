# Basis-Image für Java 17
FROM eclipse-temurin:17-jdk-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten laden und Anwendung bauen
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve

# Den gesamten Code kopieren und bauen
COPY src ./src
RUN ./mvnw package
RUN ls -R target

# Container startet die Spring Boot Anwendung
CMD ["java", "-jar", "target/backend-1.0-SNAPSHOT.jar"]