/**
 * LOGIKRON - Animazione sfondo con simboli matematici
 * Genera simboli e numeri che fluttuano sullo sfondo di ogni pagina.
 */
(function() {
  const symbols = [
    '0','1','2','3','4','5','6','7','8','9',
    '+','\u2212','\u00d7','\u00f7','=','\u03c0','\u221a',
    '\u2211','\u221e','\u0394','\u222b','\u2260','\u2264','\u2265','\u00b1','%'
  ];

  const container = document.createElement('div');
  container.className = 'math-bg-container';
  document.body.prepend(container);

  const count = 30;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'math-bg-symbol';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = (Math.random() * 100) + '%';
    el.style.fontSize = (16 + Math.random() * 28) + 'px';
    el.style.animationDuration = (18 + Math.random() * 30) + 's';
    el.style.animationDelay = -(Math.random() * 48) + 's';
    el.style.opacity = 0.03 + Math.random() * 0.04;
    container.appendChild(el);
  }
})();
