# Zadanie rekrutacyjne
_Mateusz Zając_

Kod źródłowy aplikacji napisany jest w języku TypeScript. Kod skompilowany do języka JavaScript znajdzie się w folderze "dist". Plikiem wejściowym programu jest "index.js".

### 1. Zawartość repozytorium
- Główna aplikacja (app) - kod realizujący funkcje załączone w mailu
- Serwer tstowy (test_server) - serwer służący do testów zachowania aplikacji

### 2. Instalacja

**Wymagania:**

- Node.js 21.7.1 (lub późniejsze)

1. Uruchom terminal.
2. Przejdź do folderu "app".
3. Uruchom w terminalu:
    
```
  npm install
```

4. Utwórz plik ".env" w katalogu projektu i uzupełnij go:

```
  API_URL=https://your_url_to_fetch_data_from
  API_CONTENT_TYPE=application/vnd.orangeott.v1+json
  X=10
  Y=5
  PING_URL=your_url_to_ping
  PING_PACKETS=4
```

**API_URL** - URL, z którego ma być pobierana odpowiedź API.
**API_CONTENT** - Content-Type, który ma być akceptowany.
**X** - Ilość zapytań, która ma być wysyłana do serwera.
**Y** - Czas pomiędzy grupami zapytań.
**PING_URL** - URL, który ma być używany do pingu.
**PING_PACKETS** - Ilość pamietów ping wysyłanych do powyższego serwera.

5. Zbuduj projekt:
```
  npm run build
```

6. Uruchom program:

```
  npm start
```

### 3. Pozostałe informacje:

- Program wysyła X zapytań jedno po drugim i wyświetla ich wyniki. Potem wyświetlają się wyniki polecenia ping. Następnie jest pauza na Y sekund. Po tym czasie cykl powtarza się.

- Logi wyświetlają się na konsoli, ale również zapisują się w pliku "logs/log.txt". Plik z logami ma ograniczenie na 10MB. Po przekroczeniu limitu jest rotowany.

- Jeśli chcesz skorzystać z testowego serwera, ale z innym portem niż domyślny (7357), 
utwórz plik .env w folderze test_server i uzupełnij go:

```
  PORT=7357
```

- Serwer testowy jest tylko do sprawdzania zachowania aplikacji. Nie stanowi integralnej części projektu.

- Użyte biblioteki można znaleźć w pliku package.json, w sekcji 'dependencies'.