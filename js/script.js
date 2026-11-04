// ===== Menu mobile =====
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ===== Efeito de digitação =====
const papeis = [
  "Desenvolvedor em formação",
  "C# · Python · JavaScript",
  "Estagiário em Meta Ads",
  "Suporte e manutenção de PCs",
];
const alvo = document.getElementById("typed");
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduzirMovimento) {
  alvo.textContent = papeis[0];
} else {
  let indice = 0;
  let letra = 0;
  let apagando = false;

  function digitar() {
    const texto = papeis[indice];
    alvo.textContent = texto.slice(0, letra);

    let espera = apagando ? 40 : 80;

    if (!apagando && letra === texto.length) {
      apagando = true;
      espera = 1600;
    } else if (apagando && letra === 0) {
      apagando = false;
      indice = (indice + 1) % papeis.length;
      espera = 400;
    } else {
      letra += apagando ? -1 : 1;
    }
    setTimeout(digitar, espera);
  }
  digitar();
}

// ===== Destaque do link do menu conforme a seção =====
const secoes = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav a");

const observadorMenu = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entrada.target.id));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
secoes.forEach((s) => observadorMenu.observe(s));

// ===== Animação de entrada ao rolar =====
const itens = document.querySelectorAll(".section h2, .about, .skill-group, .project, .timeline li, .links li");
itens.forEach((el) => el.classList.add("reveal"));

const observadorReveal = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observadorReveal.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);
itens.forEach((el) => observadorReveal.observe(el));

// ===== Ano no rodapé =====
document.getElementById("year").textContent = new Date().getFullYear();
