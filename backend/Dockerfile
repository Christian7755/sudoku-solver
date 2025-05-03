# -------- Build‑Stage --------
    FROM maven:3.9.6-eclipse-temurin-21 AS build
    WORKDIR /workspace
    
    # 1️⃣  Nur POM zuerst kopieren → Dependency‑Layer wird gecacht
    COPY pom.xml .
    
    # 2️⃣  Dependencies herunterladen
    RUN mvn -B -q dependency:go-offline
    
    # 3️⃣  Jetzt den restlichen Code
    COPY src src
    RUN mvn -B -q package -DskipTests
    
    # -------- Runtime‑Stage --------
    FROM eclipse-temurin:21-jre
    WORKDIR /app
    COPY --from=build /workspace/target/*.jar app.jar
    EXPOSE 8080
    ENTRYPOINT ["java","-jar","app.jar"]
    