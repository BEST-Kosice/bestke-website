# BEST Košice Webstránka

Vitajte v repozitári oficiálnej webstránky študentskej organizácie BEST Košice.
Tento projekt pozostáva z dvoch hlavných častí:
- **Frontend** (Next.js)
- **Backend** (Strapi CMS)

## 📌 Prerekvizity (Čo je potrebné mať nainštalované)

Pred začatím sa uistite, že máte nainštalované nasledujúce nástroje:
- **Node.js**
- **npm** (správca balíkov, dodáva sa spolu s Node.js)
- **Git**

## 🚀 Inštalácia

1. **Klonovanie repozitára:**
   Otvorte terminál a naklonujte repozitár do svojho počítača:
   ```bash
   git clone https://github.com/kitnew/bestke-website.git
   ```

2. **Prejdite do zložky projektu:**
   ```bash
   cd bestke-website
   ```

3. **Inštalácia závislostí:**
   Projekt využíva npm workspaces, takže môžete nainštalovať všetky potrebné balíčky pre frontend aj backend naraz spustením tohto príkazu v koreňovom adresári repozitára:
   ```bash
   npm run install:all
   ```

## ⚙️ Nastavenie premenných prostredia (Environment Variables)

Pred prvým spustením backendu (Strapi) je nutné nastaviť premenné prostredia.

1. Prejdite do zložky `backend`.
2. Vytvorte kópiu existujúceho súboru `.env.example` a pomenujte ju `.env`.
   V termináli (z koreňového adresára) môžete použiť príkaz:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Tento súbor `.env` obsahuje kľúče a heslá potrebné pre beh aplikácie. Pre lokálny vývoj zvyčajne stačia predvolené hodnoty (databáza je prednastavená na SQLite).

## 💻 Spustenie projektu pre lokálny vývoj

Pre správne fungovanie celej aplikácie je potrebné spustiť backend aj frontend súčasne, ideálne v dvoch samostatných oknách terminálu.
V prípade, že riešite len frontend alebo len backend, môžete spustiť len jeden z nich.

**Spustenie Backendu (Strapi):**
V prvom termináli sa uistite, že ste v koreňovom adresári projektu (`bestke-website`) a spustite:
```bash
npm run dev:backend
```
Backend sa po chvíli spustí a bude bežať na adrese `http://localhost:1337`.  
Do administrátorského rozhrania Strapi sa dostanete cez `http://localhost:1337/admin`.

**Spustenie Frontendu (Next.js):**
V druhom termináli (rovnako z koreňového adresára `bestke-website`) spustite:
```bash
npm run dev:frontend
```
Frontend bude následne prístupný vo vašom prehliadači na adrese `http://localhost:3000`.

---
To by malo stačiť pre úspešné rozbehnutie projektu!