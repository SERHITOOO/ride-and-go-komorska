# Ride&Go Komorska

Pakiet startowy pod wynajem rowerów elektrycznych dla kurierów Glovo, Uber Eats, Wolt i Bolt Food.

## Co jest w środku

- `index.html` - gotowa strona statyczna z ofertą, CTA telefon/WhatsApp i formularzem mailowym.
- `assets/brand/` - nowe logo Ride&Go, znak i favicon w SVG.
- `assets/marketing/` - ulotka A5, poster A3, baner social media i wizytówka w SVG.
- `data/ridego-config.json` - robocze dane firmy, telefonu, domeny, ceny i floty.

## Uruchomienie

```bash
npm run assets
npm run check
npm run dev
```

Strona lokalnie: `http://localhost:5173`

## Ważne przed drukiem

W projekcie są robocze dane z mockupu:

- telefon: `+48 888 123 456`
- e-mail: `kontakt@ridego.pl`
- domena: `ridego.pl`
- adres: `Komorska 55, Warszawa`

Przed drukiem i reklamą trzeba potwierdzić numer, domenę, adres, regulamin najmu, kaucję oraz finalne modele Jobobike. Po zmianie danych w `data/ridego-config.json` uruchom:

```bash
npm run assets
```

Strona ma dane wpisane bezpośrednio w HTML, więc przy zmianie telefonu/domeny trzeba podmienić je także w `index.html`.
