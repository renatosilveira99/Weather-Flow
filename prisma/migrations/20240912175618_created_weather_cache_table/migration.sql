-- CreateTable
CREATE TABLE "WeatherCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "temperatureInCelsius" REAL NOT NULL,
    "temperatureInFahrenheit" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherCache_city_date_key" ON "WeatherCache"("city", "date");
