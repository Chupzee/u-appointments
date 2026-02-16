# ---- Build stage ----
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Install Node.js (needed because bootJar triggers npm build)
RUN apt-get update \
  && apt-get install -y curl ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && node --version \
  && npm --version \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN chmod +x backend/gradlew && \
    cd backend && \
    ./gradlew bootJar --no-daemon

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /app/backend/build/libs/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
