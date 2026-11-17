const destaques = [
  { videoId: "60Wt98JYoW0", titulo: "Destaque 01" },
  { videoId: "CM-hjBRQ3Xo", titulo: "Destaque 02" },
  { videoId: "4jvbhbEf9NU", titulo: "Destaque 03" },
  { videoId: "nzjt1qy8gxg", titulo: "Destaque 04" },
  { videoId: "SaI6P1hyBc0", titulo: "Destaque 05" },
  { videoId: "6ckA0bUko_k", titulo: "Destaque 06" },
  { videoId: "uzhFz7GuGi0", titulo: "Destaque 07" },
  { videoId: "6hApsNOzeBU", titulo: "Destaque 08" },
  { videoId: "NStF0E-VYSE", titulo: "Destaque 09" }
];

const todosProjetos = [
  { videoId: "60Wt98JYoW0", titulo: "sendo MOGGADO pelo mod de Demon Slayer no Minecraft" },
  { videoId: "Xz8niRtwxMw", titulo: "ESPECIALISTA em Resident Evil joga Tormented Souls (merece o seu dinheiro?)" },
  { videoId: "3l8g99F4Aig", titulo: "meninas de anime trocando tiro (brutal)" },
  { videoId: "xtyrivd1Gig", titulo: "Resident Evil 7 so que no hotel (aquele jogo br daora lá)" },
  { videoId: "TqyOZIiyenI", titulo: "o jogo DESCONHECIDO do Avatar de PS2" },
  { videoId: "RSPR82TaS7s", titulo: "jogando a tal da temporada 4 do Fortnite" },
  { videoId: "x2t79vrUdDo", titulo: "a GASOSA matadora de zumbi kkkkk" },
  { videoId: "ZcvKWb3rnLQ", titulo: "jogos do PS2 que nunca joguei kkkk" },
  { videoId: "CM-hjBRQ3Xo", titulo: "brigando no jogo e na call" },
  { videoId: "4jvbhbEf9NU", titulo: "as PIORES construções do Build Battle" },
  { videoId: "SaI6P1hyBc0", titulo: "desenhar definitivamente NÃO É o forte deles" },
  { videoId: "6hApsNOzeBU", titulo: "como NÃO jogar Free Fire..." },
  { videoId: "wrwE3EzjWIw", titulo: "criando e julgando memes no Make It Meme" },
  { videoId: "nzjt1qy8gxg", titulo: "jogando FNAF só que no Roblox" },
  { videoId: "6ckA0bUko_k", titulo: "os caba são ruim e ainda se sabotam" },
  { videoId: "BHLtdfkD1TQ", titulo: "Resident Evil 4 mas eu to lascado kkkkkkk" },
  { videoId: "uzhFz7GuGi0", titulo: "abestados jogando MINECRAFT REALMS" },
  { videoId: "ESDUOlx8oW8", titulo: "o jogo do Ben 10 do PS2 que da pra jogar de 2" },
  { videoId: "NStF0E-VYSE", titulo: "a PIOR tripulação do Sea of Thieves..." },
  { videoId: "5NYOH9jH54Y", titulo: "comprei joguinhos BARATOS na Steam e me arrependi... (é sério)" },
  { videoId: "NyW_dvVWIMA", titulo: "como NÃO jogar Fortnite..." }
];

function criarCard(videoId, titulo, mostrarTitulo = true, lista = [], indice = 0) {
  const card = document.createElement("article");
  card.className = "card";
  const urlMaxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const urlHq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  card.innerHTML = `
    <img src="${urlMaxRes}" alt="${titulo}" loading="lazy" data-fallback="${urlHq}" />
    ${mostrarTitulo ? `<div class="card-info"><h3>${titulo}</h3></div>` : ""}
  `;
  const img = card.querySelector("img");
  img.addEventListener("load", function () {
    if (this.naturalWidth <= 120) this.src = this.dataset.fallback;
  });
  img.addEventListener("error", function () {
    if (this.src !== this.dataset.fallback) this.src = this.dataset.fallback;
  });
  card.addEventListener("click", () => abrirModal(lista, indice));
  return card;
}

const gridDestaques = document.getElementById("grid-destaques");
destaques.forEach((p, i) => {
  gridDestaques.appendChild(criarCard(p.videoId, p.titulo, false, destaques, i));
});

const gridProjetos = document.getElementById("grid-projetos");
todosProjetos.forEach((p, i) => {
  gridProjetos.appendChild(criarCard(p.videoId, p.titulo, true, todosProjetos, i));
});

let modalAtual = null;
let listaAtual = [];
let indiceAtual = 0;

function abrirModal(lista, indice) {
  listaAtual = lista;
  indiceAtual = indice;
  criarModal();
}

function criarModal() {
  if (modalAtual) modalAtual.remove();

  const videoId = listaAtual[indiceAtual].videoId;
  const total = listaAtual.length;

  const modal = document.createElement("div");
  modal.className = "modal ativo";
  modal.innerHTML = `
    <div class="player-wrap">
      <button class="player-fechar" aria-label="Fechar">✕</button>
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
              allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <div class="player-controles">
        <button class="player-nav player-prev" ${indiceAtual === 0 ? "disabled" : ""}>Anterior</button>
        <span class="player-contador">${indiceAtual + 1} / ${total}</span>
        <button class="player-nav player-next" ${indiceAtual === total - 1 ? "disabled" : ""}>Próximo</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modalAtual = modal;

  modal.querySelector(".player-fechar").addEventListener("click", fecharModal);
  modal.querySelector(".player-prev").addEventListener("click", () => navegar(-1));
  modal.querySelector(".player-next").addEventListener("click", () => navegar(1));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });
}

function navegar(direcao) {
  const novo = indiceAtual + direcao;
  if (novo < 0 || novo >= listaAtual.length) return;
  indiceAtual = novo;
  criarModal();
}

function fecharModal() {
  if (modalAtual) {
    modalAtual.remove();
    modalAtual = null;
  }
}

document.addEventListener("keydown", (e) => {
  if (!modalAtual) return;
  if (e.key === "Escape") fecharModal();
  if (e.key === "ArrowLeft") navegar(-1);
  if (e.key === "ArrowRight") navegar(1);
});

const botoes = document.querySelectorAll("[data-aba]");
const abas = document.querySelectorAll(".aba");
const nav = document.querySelector(".nav");
const ABAS_VALIDAS = ["destaques", "projetos", "ferramentas", "contato", "sobre"];

function abrirAba(nome) {
  abas.forEach(a => a.classList.remove("ativa"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("ativo"));
  const abaAlvo = document.getElementById(nome);
  if (abaAlvo) abaAlvo.classList.add("ativa");
  const btnAlvo = document.querySelector(`.nav-btn[data-aba="${nome}"]`);
  if (btnAlvo) btnAlvo.classList.add("ativo");
  history.replaceState(null, "", "#" + nome);
  nav.classList.remove("aberto");
  window.scrollTo({ top: 0, behavior: "instant" });
}

botoes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nome = btn.dataset.aba;
    if (nome) abrirAba(nome);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "");
  abrirAba(ABAS_VALIDAS.includes(hash) ? hash : "destaques");
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) abrirAba(hash);
});

const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => nav.classList.toggle("aberto"));

document.getElementById("form-contato").addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = new FormData(e.target);
  const assunto = encodeURIComponent(`Contato do portfólio - ${dados.get("nome")}`);
  const corpo = encodeURIComponent(
    `Nome: ${dados.get("nome")}\n` +
    `E-mail: ${dados.get("email")}\n\n` +
    `Mensagem:\n${dados.get("mensagem")}`
  );
  window.location.href = `mailto:limmoneditor@gmail.com?subject=${assunto}&body=${corpo}`;
  e.target.reset();
});