---
layout: default
title: "Kompilacja"
---

Z uwagi no to, że nie jest łatwa aplikacja kompilacja, też nie jest trywialna.
Mamy tak naprawdę 4 projekty w jednym: frontend, backend(w trzech procesach).
Dodatkowo dochodzi baza danych.

## Baza danych

Pliki baz danych znajdują się w folderze `./src/database`.

Każda baza danych jest folderem z następującą strukturą:

 - `dbname` - nazwa bazy danych
   - `.env` - plik typu dotenv zawierający następujące zmienne:
      - `IMAGE_NAME` - nazwa obrazu dockera
      - `CONTAINER_NAME` - nazwa konteneru dockera
      - `ADMIN_PASSWORD` - hałso administratora, użytkownik to `postgres`
      - `BACKEND_DATABASE` - nazwa bazy danych
      - `BACKEND_USERNAME` - nazwa użytkownika bazy danych
      - `BACKEND_PASSWORD` - hasło użytkownika bazy danych
      - `DB_PORT` - port bazy danych
   - `Dockerfile`
   - `init.sh`
   - `init.sql`
   - `model.dbm` - plik bazy programu PgModeler
   - `model.png` - model bazy danych w formie obrazka

Zarządzanie bazą danych:

 - `create.sh` - tworzenie docker'a
 - `start.sh` -  uruchamianie docker'a
 - `stop.sh` - zatrzymanie docker'a
 - `remove.sh` - usuwanie docker'a
 
Każdy skrypt bierze jeden argument nazwy bazy danych.
 
Przykłady użycia:

```bash
./src/database/create.sh main
./src/database/start.sh main
./src/database/stop.sh main
./src/database/remove.sh main
```

UWAGA!!!

Po utworzeniu kontenerów z bazą danych pliki `init.sql` nie wykonują się.
Nie wiemy dlaczego.
Więc należy je wykonać ręcznie.

## Serwisy

Aby zbudować projekt jednorazowo:
```
npm run-script bulid
```

W przypadku kiedy wprawadzamy zmiany na bieżąco, ta komenda będzie na rekompilowała cały projekt gdy pliki źródłowe zostaną zmienione. 
```
npm run-script dev-bulid
```

## Uruchamianie

Uruchamianie można przeprowadzić na pomocą komend: 
```
npm run-script server-auth
npm run-script server-cdn
npm run-script server-main
```

Ale z uwagi na to, że musieliśmy by uruchamiać to za każdym razem po kompilacji, możemy też:
```
npm run-script dev-server-auth
npm run-script dev-server-cdn
npm run-script dev-server-main
```
Co będzie resetowało serwer po kompilacji.

## Przygotowanie środowiska deweloperskiego

```bash

# zainstaluj moduły npm
npm i

# utwórz bazy danych
./src/database/create.sh main
./src/database/create.sh user

# wystartuj bazy danych
./src/database/start.sh main
./src/database/start.sh user

# wykonaj skrypty init.sql na bazach danych (zanim wykonasz skrypt sprawdz czy przypadkiem nie jest wszystko poprawnie)
dbs=('main' 'user')
for db in "${dbs[@]}"
do
    source ./src/database/$db/.env
    PGPASSWORD=$ADMIN_PASSWORD
    psql -h "localhost:${DB_PORT}" -U postgres -d "${BACKEND_DATABASE}" -a -f ./src/database/$db/init.sql
done

# uruchom automatyczne budowanie
npm run-script dev-bulid

# uruchom serwisy
npm run-script dev-server-auth
npm run-script dev-server-cdn
npm run-script dev-server-main
```

# Stawianie skonteneryzowanej wersji

Wymagane pakiety:
```
docker
docker-compose
```

Ponizsza komenda stworzy wszystkie potrzebne obrazy dla baz, serwerow oraz load balancera.

```bash
docker-compose up
```

Po wprowadzeniu zmian w plikach, aby postawić kontenery jeszcze raz, najlepiej wywołać skrypt.

```bash
./docker-compose-restart.sh
```

Zamyka on wcześniejsze wersje i umożliwia usuniecie zbednych obrazow oraz uruchamia nowe wersję

Zatrzymanie działania kontenerów.
```bash
docker-compose down
```