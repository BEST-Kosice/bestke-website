# 🚀 QUICKSTART - mimi ITWG Hackathon

Tento dokument ťa krok za krokom prevedie najrýchlejším spôsobom, ako naklonovať a pripraviť si projekt pre účasť.

## Potrebné prostredie

K tomu, aby ti bežal celý projekt a vedel si s ním pracovať, musíš mať na počítači v prvom rade nainštalované:
- **Node.js**
- **Git**

## Základný Git Workflow

Na prácu na tvojom projekte budeš využívať vlastnú vetvu. 

1. **Vytvor si kópiu tohto repozitára vo svojom počítači (klonovanie):**
   ```bash
   git clone https://github.com/kitnew/bestke-website.git
   cd bestke-website
   ```

2. **Založ si a preni sa na SVOJU VLASTNÚ vetvu (DÔLEŽITÉ):**
   Niekto by mohol zmeniť kód iným súťažiacim. Odlíš sa od ostatných vytvorením vetvy v predpísanom formáte (napr. `dev/moje-meno`).
   ```bash
   git checkout -b dev/tvôj-nick-alebo-nazov-tímu
   ```

3. **Ako si uložiť rozpracovanú prácu z tvojho PC na online server:**
   Zmeny, ktoré vyprodukuješ, nezabudni priebežne pushovať!
   ```bash
   git add .
   git commit -m "Sem napíšeš, akú zmenu si spravil"
   git push -u origin dev/tvôj-nick-alebo-nazov-tímu
   ```

## Inštalácia všetkých závislostí

Pred začatím štruktúrovania stránky si stiahni všetky NPM moduly.
Použi na to nasledovný inštalačný príkaz z hlavného root priečinka:
```bash
npm run install:all
```

## Spustenie frontend aplikácie

Po inštalácii začni svoj vývoj priamo s frontend kódom (Next.js serverom). Z hlavného priečinka jednoducho napíš:
```bash
npm run dev:frontend
```
Vo webovom prehliadači si otvor adresu [http://localhost:3000](http://localhost:3000) a skontroluj tvoju úvodnú stránku.

## Spustenie backendu (Voliteľné)

Backend postavený na Strapi sa síce na hackathone explicitne nevyžaduje, avšak ak ho pre svoje nápady budeš potrebovať prebudiť k životu, inštrukcie sú nasledovné:

1. Najskôr nakopíruj pripravené konfigurácie environment variables:
   **Na Linux/Mac:** `cp backend/.env.example backend/.env`
   **Na Windows (Powershell):** `Copy-Item backend/.env.example -Destination backend/.env`
2. Spusti samotný server:
   ```bash
   npm run dev:backend
   ```
Server sa prebudí a po úspešnom načítaní bude dostupný na prístavnom webe [http://localhost:1337](http://localhost:1337). Administrátorská zóna sa otvára doplnením `/admin`.

---

**🔥 DÔLEŽITÉ UPOZORNENIE PRED ODOVZDANÍM 🔥**
Tvojou povinnosťou vo vlastnej vetve je prepracovať tvoj `README.md`. Nenechaj ho pôvodný – zmeň ho tak, aby plne popisoval architektúru, inštrukcie na spustenie a dôvody rozhodnutí vo vývoji, tak ako je špecifikované v pravidlách podujatia. Porota si tento `README` prečíta ako prvé!

Veľa šťastia!
