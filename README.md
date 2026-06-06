# LogiKron - Sistema Gare Matematiche

Piattaforma completa per la gestione delle gare matematiche a squadre tra Istituti Comprensivi.

## Struttura del Sistema

```
LOGIKRON SISTEMA COMPLETO
=========================

Fase 1: INTENZIONI          Fase 2: ISCRIZIONI         Fase 3: GARA              Fase 4: POST-GARA
+------------------+        +------------------+        +------------------+       +------------------+
| intenzioni.html  |  --->  | iscrizioni.html  |  --->  | gara.html        | --->  | Attestati + Stats|
| Docenti esprimono|        | Docenti iscrivono|        | Squadre giocano  |       | PDF + Email auto |
| interesse        |        | studenti         |        | Tabellone live   |       |                  |
+------------------+        +------------------+        +------------------+       +------------------+
         |                          |                          |                          |
         +-------------+------------+-------------+------------+-------------+------------+
                       |                          |                          |
                       v                          v                          v
               +---------------------------------------------------------------+
               |                    GOOGLE SHEET MASTER                        |
               |              (proprietario: animatoredigitale@)               |
               |                                                               |
               | Fogli: Intenzioni | Squadre | Studenti | Gare | Risultati    |
               +---------------------------------------------------------------+
```

## File del Progetto

### Frontend (PWA - GitHub Pages)
- `index.html` - Home page pubblica
- `admin.html` - Pannello admin (solo Fabio, con password)
- `intenzioni.html` - Form raccolta intenzioni docenti
- `iscrizioni.html` - Form iscrizione squadre (ex LogiKron2025)
- `gara.html` - Pannello squadre durante la gara
- `tabellone.html` - Tabellone live pubblico
- `css/style.css` - Stili condivisi
- `js/config.js` - Configurazione centralizzata

### Backend (Apps Script - fabiorizzotto75@gmail.com)
- Da creare nella cartella `apps-script/`

## Configurazione

Tutti i parametri sono in `js/config.js`:
- Anno scolastico
- ID cartelle Drive
- ID Sheet Master
- Parametri gare (durata, punti, bonus)
- Lista Istituti e Plessi

## Proprietà e Privacy

| Elemento | Proprietario | Motivo |
|----------|--------------|--------|
| Script Apps Script | fabiorizzotto75@gmail.com | Scalabilità futura |
| PWA/Sito | EduTechLab GitHub | Visibilità pubblica |
| Sheet + Dati | animatoredigitale@icgottolengo.edu.it | Privacy GDPR scuola |

## Deploy

1. Pubblicare su GitHub: `EduTechLab-ita/logikron-gare`
2. Abilitare GitHub Pages
3. URL: `https://edutechlab-ita.github.io/logikron-gare/`

## TODO

- [ ] Completare backend Apps Script
- [ ] Collegare form intenzioni a Sheet
- [ ] Integrare LogiKron2025 esistente
- [ ] Implementare gara live con polling
- [ ] Sistema generazione attestati PDF
- [ ] Invio email automatico
- [ ] Statistiche e grafici

---

**Versione**: 0.1.0 (Struttura Base)
**Data**: Febbraio 2026
**Autore**: Fabio Rizzotto / EduTechLab
