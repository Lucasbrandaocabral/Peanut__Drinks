/**
 * ============================================================
 *  ACRESCENTADO EM 2026 — não faz parte do projeto original.
 * ============================================================
 *
 * A versão de 2025 é preservada aqui como registro do "antes". O único
 * acréscimo é esta faixa, que dá o caminho de volta para a versão atual:
 * sem ela, quem chega aqui só sai pelo botão voltar do navegador.
 *
 * Fica em um arquivo separado, injetado por uma única linha em cada
 * página, para que o HTML de 2025 continue praticamente intacto.
 */
;(function () {
  'use strict'

  // De legacy/index.html sobe um nível; de legacy/Pages/*.html, dois.
  var appUrl = (location.pathname.indexOf('/legacy/Pages/') !== -1 ? '../../' : '../')

  var reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  var css = [
    '.pd26-bar{position:fixed;top:0;left:0;right:0;z-index:9999;display:flex;',
    'align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;',
    'padding:10px 16px;background:#191612;color:#f5f2ea;',
    "font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.3;box-sizing:border-box}",
    '.pd26-bar *{font-size:inherit;color:inherit;box-sizing:border-box}',
    '.pd26-tag{display:inline-flex;align-items:center;gap:8px;opacity:.75}',
    '.pd26-dot{width:7px;height:7px;border-radius:50%;background:#f2a65a;flex:0 0 auto}',
    '.pd26-btn{display:inline-flex;align-items:center;gap:7px;padding:7px 16px;',
    'border:0;border-radius:999px;background:#f2a65a;color:#191612;cursor:pointer;',
    "font-family:inherit;font-weight:600;text-decoration:none;transition:filter .2s}",
    '.pd26-btn:hover{filter:brightness(1.1)}',
    '.pd26-btn:focus-visible{outline:2px solid #f5f2ea;outline-offset:2px}',
    '.pd26-veil{position:fixed;inset:0;z-index:10000;display:flex;flex-direction:column;',
    'align-items:center;justify-content:center;gap:14px;background:#100e0b;color:#f5f2ea;',
    'opacity:0;animation:pd26-in .28s ease forwards}',
    '.pd26-year{font-family:"League Spartan",Inter,system-ui,sans-serif;font-weight:800;',
    'font-size:clamp(56px,12vw,104px);line-height:1;font-variant-numeric:tabular-nums}',
    '.pd26-year span{display:block;animation:pd26-up .5s cubic-bezier(.22,1,.36,1) forwards}',
    '.pd26-note{font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.6}',
    '@keyframes pd26-in{to{opacity:1}}',
    '@keyframes pd26-up{from{transform:translateY(60%);opacity:0}to{transform:translateY(0);opacity:1}}',
    '@media (prefers-reduced-motion:reduce){.pd26-veil,.pd26-year span{animation:none;opacity:1}}',
  ].join('')

  var style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)

  var bar = document.createElement('div')
  bar.className = 'pd26-bar'
  bar.setAttribute('role', 'region')
  bar.setAttribute('aria-label', 'Aviso de versão')
  bar.innerHTML =
    '<span class="pd26-tag"><span class="pd26-dot"></span>' +
    'Você está na versão original de 2025</span>' +
    '<a class="pd26-btn" href="' +
    appUrl +
    '">Ir para a versão atual &rarr;</a>'

  function mount() {
    document.body.insertBefore(bar, document.body.firstChild)
    // Empurra a página para baixo, em vez de cobrir o topo do layout antigo.
    document.body.style.paddingTop = bar.offsetHeight + 'px'
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount)
  } else {
    mount()
  }

  window.addEventListener('resize', function () {
    document.body.style.paddingTop = bar.offsetHeight + 'px'
  })

  bar.querySelector('.pd26-btn').addEventListener('click', function (event) {
    // Deixa passar ctrl+clique e clique do meio: nova aba não deve animar esta.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    if (reduceMotion) return

    event.preventDefault()

    var veil = document.createElement('div')
    veil.className = 'pd26-veil'
    veil.setAttribute('role', 'status')
    veil.innerHTML =
      '<div class="pd26-year"><span>2025</span></div>' +
      '<p class="pd26-note">Avançando para a versão atual</p>'
    document.body.appendChild(veil)

    var year = veil.querySelector('.pd26-year span')
    setTimeout(function () {
      year.textContent = '2026'
      year.style.color = '#f2a65a'
      // Reinicia a animação para o novo número subir como o anterior.
      year.style.animation = 'none'
      void year.offsetWidth
      year.style.animation = ''
    }, 420)

    setTimeout(function () {
      location.href = appUrl
    }, 1250)
  })
})()
