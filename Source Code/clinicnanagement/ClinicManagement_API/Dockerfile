#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ClinicManagement_API/API_ClinicManagement.csproj", "ClinicManagement_API/"]
COPY ["ClinicManagement_Model/ClinicManagement_Model.csproj", "ClinicManagement_Model/"]
RUN dotnet restore "ClinicManagement_API/API_ClinicManagement.csproj"
COPY . .
WORKDIR "/src/ClinicManagement_API"
RUN dotnet build "API_ClinicManagement.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API_ClinicManagement.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API_ClinicManagement.dll"]