# =========================
# Build
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copio tutta la solution
COPY . .

# Restore delle dipendenze dell'API.
# I ProjectReference verso Core e Infrastructure
# verranno risolti automaticamente.
RUN dotnet restore "TDPCompetitions.Api/TDPCompetitions.Api.csproj"

# Publish
RUN dotnet publish "TDPCompetitions.Api/TDPCompetitions.Api.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore


# =========================
# Runtime
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

# Cloud Run utilizza la porta indicata dalla variabile PORT.
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "TDPCompetitions.Api.dll"]