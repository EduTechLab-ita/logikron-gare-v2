/**
 * LOGIKRON - Configurazione Centralizzata
 * ========================================
 * Questo file contiene tutte le configurazioni del sistema.
 * Modificare qui per cambiare anno scolastico o agganciare altre scuole.
 */

// Anno scolastico calcolato automaticamente dalla data di sistema.
// Regola: mese >= settembre → anno/anno+1 | mese < settembre → anno-1/anno
// Es: giugno 2026 → "2025-2026" | settembre 2026 → "2026-2027"
const _lkAnno = (function() {
  var d = new Date(), y = d.getFullYear(), m = d.getMonth() + 1;
  return m >= 9 ? (y + '-' + (y + 1)) : ((y - 1) + '-' + y);
})();

const LOGIKRON_CONFIG = {
  // ==========================================
  // ANNO SCOLASTICO CORRENTE (calcolato automaticamente)
  // ==========================================
  annoScolastico: _lkAnno,

  // ==========================================
  // FASE ATTIVA (cambiare per aprire/chiudere le fasi)
  // 1 = Intenzioni aperte | 2 = Iscrizioni aperte | 3 = Gara | 4 = Post-gara
  // ==========================================
  faseAttiva: 1,

  // ==========================================
  // NUMERI EDIZIONE PRECEDENTE (riquadro pubblicitario)
  // ==========================================
  // Aggiornare ogni anno con i dati della stagione conclusa
  edizionePrecedente: {
    anno: '2024-2025',
    edizione: '10a',
    istituti: 6,
    classi: 13,
    squadre: 36,
    alunni: 239
  },

  // Edizione corrente (da aggiornare ogni anno PRIMA dell'evento)
  edizioneCorrente: 11,

  // Totali cumulativi di tutte le edizioni (aggiornare ogni anno sommando i nuovi dati)
  totaleStorico: {
    edizioni: 10,
    istituti: 6,
    classi: 13,
    squadre: 36,
    alunni: 239
  },

  // ==========================================
  // API URL — Cloudflare Worker (backend principale)
  // Apps Script mantiene solo: email, Drive, sync notturno
  // ==========================================
  apiUrl: 'https://logikron-api.edutechlab-ita.workers.dev',

  // Legacy (non più usati dal frontend — mantenuti per compatibilità Apps Script)
  webAppUrls: {
    intenzioni: 'https://script.google.com/macros/s/AKfycby0I6cvCglgrVozTqef9tE3l1flVt-IUrygrLYDd7atUw6t3RHCozPKl-XJBFHAvm7K2g/exec',
    iscrizioni: 'https://script.google.com/macros/s/AKfycby0I6cvCglgrVozTqef9tE3l1flVt-IUrygrLYDd7atUw6t3RHCozPKl-XJBFHAvm7K2g/exec',
    gare:       'https://script.google.com/macros/s/AKfycby0I6cvCglgrVozTqef9tE3l1flVt-IUrygrLYDd7atUw6t3RHCozPKl-XJBFHAvm7K2g/exec',
    admin:      'https://script.google.com/macros/s/AKfycby0I6cvCglgrVozTqef9tE3l1flVt-IUrygrLYDd7atUw6t3RHCozPKl-XJBFHAvm7K2g/exec'
  },

  // ==========================================
  // GOOGLE DRIVE - CARTELLE
  // ==========================================
  // Proprietà: animatoredigitale@icgottolengo.edu.it
  // Condiviso con: fabiorizzotto75@gmail.com
  drive: {
    // Cartella root LogiKron nel Drive di animatoredigitale@
    // IL MIO DRIVE > GIOCHI MATEMATICI > LOGIKRON
    rootFolderId: '1RZf2PT8xnLVJnK7EMuKbOhacx0nU0iDw',

    // Cartella anno corrente — popolata da setupNuovoAnno()
    annoFolderId: '',

    // Sheet Master con tutti i dati (unico, permanente, resettato ogni anno)
    sheetMasterId: '1V9_1oV9M1KnIm5GJoKITUR092GX-erFcYaGTbPvvnNE',
  },

  // ==========================================
  // CONFIGURAZIONE GARE
  // ==========================================
  gare: {
    // Parametri di default (modificabili da admin)
    durataMinuti: 60,
    numeroDomande: 10,
    puntiIniziali: 20,
    incrementoPuntiOgniMinuti: 2,
    penalitaRispostaSbagliata: -5,
    bonusProblemaPenalita: 2,
    tempoJollyMinuti: 10,
    tempoDomandeMinuti: 20,

    // Bonus posizionamento (primi 3 a risolvere un quesito)
    bonusPosizionamento: [25, 20, 15],

    // Superbonus completamento (primi 3 a completare tutti)
    bonusCompletamento: [100, 60, 40],

    // Ultimi minuti: tabellone si nasconde
    minutiNascondimento: 5,

    // Formato risposte
    formatoRisposte: '0000-9999'  // Numeri interi 4 cifre
  },

  // ==========================================
  // ISTITUTI COMPRENSIVI PARTECIPANTI
  // ==========================================
  // Questo array viene aggiornato automaticamente
  // dalla App Intenzioni quando i docenti si iscrivono
  istituti: [
    {
      nome: "IC Gottolengo",
      plessi: [
        { nome: "Gottolengo", sigla: "GT" },
        { nome: "Gambara", sigla: "GM" },
        { nome: "Fiesse", sigla: "FS" }
      ]
    },
    {
      nome: "IC Calvisano",
      plessi: [
        { nome: "Calvisano", sigla: "CV" },
        { nome: "Isorella", sigla: "IS" },
        { nome: "Viadana", sigla: "VD" }
      ]
    },
    {
      nome: "IC Pralboino",
      plessi: [
        { nome: "Pralboino", sigla: "PR" },
        { nome: "Pavone del Mella", sigla: "PV" },
        { nome: "Milzano", sigla: "ML" },
        { nome: "Cigole", sigla: "CG" },
        { nome: "Seniga", sigla: "SN" }
      ]
    },
    {
      nome: "IC Ghedi",
      plessi: [
        { nome: "Ghedi", sigla: "GH" }
      ]
    },
    {
      nome: "IC Verolanuova",
      plessi: [
        { nome: "Verolanuova", sigla: "VN" },
        { nome: "Verolavecchia", sigla: "VV" },
        { nome: "Bassano Bresciano", sigla: "BB" },
        { nome: "Cadignano", sigla: "CD" }
      ]
    },
    {
      nome: "IC Orzinuovi",
      plessi: [
        { nome: "Orzinuovi", sigla: "OR" },
        { nome: "Orzivecchi", sigla: "OV" },
        { nome: "Pompiano", sigla: "PM" },
        { nome: "Villachiara", sigla: "VC" }
      ]
    }
  ],

  // ==========================================
  // CLASSI AMMESSE
  // ==========================================
  classi: {
    primaria: [
      { nome: "4^", codice: "4" },
      { nome: "5^", codice: "5" },
      { nome: "Pluriclasse 3^-4^", codice: "3P" },
      { nome: "Pluriclasse 4^-5^", codice: "4P" }
    ],
    secondaria: [
      { nome: "1^", codice: "1S" },
      { nome: "2^", codice: "2S" },
      { nome: "3^", codice: "3S" }
    ]
  },

  // ==========================================
  // TEMPLATE ATTESTATI
  // ==========================================
  attestati: {
    templateDocId: '',   // Da compilare: ID del Google Doc template
    meriti: {
      vincitore: 'Merito',
      partecipante: 'Partecipazione'
    }
  },

  // ==========================================
  // ADMIN
  // ==========================================
  admin: {
    // Password per accesso pagina admin (hash SHA-256)
    // Generare con: CryptoJS.SHA256('tuapassword').toString()
    passwordHash: '',

    // Email admin per notifiche
    emailAdmin: 'fabiorizzotto75@gmail.com'
  }
};

// Esporta per uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LOGIKRON_CONFIG;
}
