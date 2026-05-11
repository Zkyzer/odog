/* =========================================================
   Ô DOG — Hot Dog & Batatas
   Arquivo principal de interações do projeto
   ========================================================= */

/* ===== JS EXISTENTE ===== */
// Futuras interações podem ser adicionadas aqui.



/* ===== INTERATIVIDADE MONTAGEM Ô DOG ===== */
document.addEventListener("DOMContentLoaded", () => {
  const opcoes = document.querySelectorAll(".montagem-opcao");
  const botaoResetar = document.getElementById("botaoResetarMontagem");
  const resumoBase = document.getElementById("resumoBase");
  const resumoExtras = document.getElementById("resumoExtras");
  const resumoTotal = document.getElementById("resumoTotal");
  const botaoFinalizar = document.getElementById("botaoFinalizarMontagem");
  const barraProgresso = document.getElementById("barraProgressoMontagem");

  const camadas = {
    cheddar: document.getElementById("camadaCheddar"),
    batata: document.getElementById("camadaBatata"),
    fritas: document.getElementById("camadaFritas"),
    bebida: document.getElementById("camadaBebida"),
    salsicha: document.getElementById("camadaSalsicha"),
  };

  if (!opcoes.length || !resumoBase || !resumoTotal) {
    return;
  }

  const estadoMontagem = {
    base: {
      nome: "Tradicional",
      preco: 13,
    },
    extras: [],
  };

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function calcularTotal() {
    const totalExtras = estadoMontagem.extras.reduce((total, extra) => {
      return total + extra.preco;
    }, 0);

    return estadoMontagem.base.preco + totalExtras;
  }

  function atualizarSalsichaVisual() {
    if (!camadas.salsicha) return;

    const larguraPorBase = {
      Tradicional: "80%",
      Duplo: "86%",
      Triplo: "92%",
    };

    const alturaPorBase = {
      Tradicional: "2.5rem",
      Duplo: "3rem",
      Triplo: "3.5rem",
    };

    camadas.salsicha.style.width = larguraPorBase[estadoMontagem.base.nome] || "80%";
    camadas.salsicha.style.height = alturaPorBase[estadoMontagem.base.nome] || "2.5rem";
  }

  function atualizarCamada(nomeExtra, elemento, nomesValidos) {
    if (!elemento) return;

    const estaSelecionado = estadoMontagem.extras.some((extra) => {
      return nomesValidos.includes(extra.nome);
    });

    elemento.classList.toggle("visivel", estaSelecionado);
  }

  function atualizarPreview() {
    atualizarSalsichaVisual();

    atualizarCamada("Cheddar", camadas.cheddar, ["Cheddar"]);
    atualizarCamada("Batata", camadas.batata, ["Batata palha"]);
    atualizarCamada("Fritas", camadas.fritas, ["Fritas 50g"]);
    atualizarCamada("Bebida", camadas.bebida, ["Coca mini"]);
  }

  function atualizarResumo() {
    const total = calcularTotal();
    const quantidadeSelecionada = 1 + estadoMontagem.extras.length;
    const progresso = Math.min((quantidadeSelecionada / 5) * 100, 100);

    resumoBase.textContent = estadoMontagem.base.nome;

    resumoExtras.textContent = estadoMontagem.extras.length
      ? estadoMontagem.extras.map((extra) => extra.nome).join(", ")
      : "Nenhum adicional selecionado";

    resumoTotal.textContent = formatarPreco(total);

    if (barraProgresso) {
      barraProgresso.style.width = `${progresso}%`;
    }

    if (botaoFinalizar) {
      const extrasTexto = estadoMontagem.extras.length
        ? estadoMontagem.extras.map((extra) => extra.nome).join(", ")
        : "sem adicionais";

      const mensagem = `Olá! Quero montar um Ô DOG:%0A%0ABase: ${estadoMontagem.base.nome}%0AAdicionais: ${extrasTexto}%0ATotal aproximado: ${formatarPreco(total)}`;

      botaoFinalizar.href = `https://wa.me/?text=${mensagem}`;
    }

    atualizarPreview();
  }

  function selecionarBase(botao) {
    const botoesBase = document.querySelectorAll('.montagem-opcao[data-grupo="base"]');

    botoesBase.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");

    estadoMontagem.base = {
      nome: botao.dataset.nome,
      preco: Number(botao.dataset.preco),
    };

    atualizarResumo();
  }

  function alternarExtra(botao) {
    const nome = botao.dataset.nome;
    const preco = Number(botao.dataset.preco);
    const existe = estadoMontagem.extras.some((extra) => extra.nome === nome);

    if (existe) {
      estadoMontagem.extras = estadoMontagem.extras.filter((extra) => extra.nome !== nome);
      botao.classList.remove("ativo");
    } else {
      estadoMontagem.extras.push({ nome, preco });
      botao.classList.add("ativo");
    }

    atualizarResumo();
  }

  function resetarMontagem() {
    estadoMontagem.base = {
      nome: "Tradicional",
      preco: 13,
    };

    estadoMontagem.extras = [];

    opcoes.forEach((botao) => {
      botao.classList.remove("ativo");

      if (botao.dataset.grupo === "base" && botao.dataset.nome === "Tradicional") {
        botao.classList.add("ativo");
      }
    });

    atualizarResumo();
  }

  opcoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      if (botao.dataset.grupo === "base") {
        selecionarBase(botao);
        return;
      }

      alternarExtra(botao);
    });
  });

  if (botaoResetar) {
    botaoResetar.addEventListener("click", resetarMontagem);
  }

  atualizarResumo();
});



/* ===== MICRO INTERAÇÕES PREMIUM Ô DOG ===== */
document.addEventListener("DOMContentLoaded", () => {
  const elementosRevelar = document.querySelectorAll(".revelar-odog");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    });

    elementosRevelar.forEach((elemento) => observador.observe(elemento));
  } else {
    elementosRevelar.forEach((elemento) => elemento.classList.add("visivel"));
  }

  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = document.querySelector(link.getAttribute("href"));

      if (!destino) return;

      evento.preventDefault();

      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});

/* ===== JS EXTRAÍDO DO HTML ===== */
const logo = document.getElementById('logoParallax');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  logo.style.transform = `translate(${x}px, ${y}px)`;
});


/* ===== FILTRO FUNCIONAL DO CARDÁPIO - SEM BEBIDAS ===== */
document.addEventListener("DOMContentLoaded", () => {
  const botoesCategoriaCardapio = document.querySelectorAll("[data-categoria-cardapio]");
  const itensCardapio = document.querySelectorAll("[data-item-cardapio]");

  if (!botoesCategoriaCardapio.length || !itensCardapio.length) {
    return;
  }

  function filtrarCardapio(categoriaSelecionada) {
    itensCardapio.forEach((itemCardapio) => {
      const categoriaItem = itemCardapio.getAttribute("data-categoria-item");
      const deveMostrar = categoriaItem === categoriaSelecionada;

      itemCardapio.classList.toggle("item-cardapio-oculto", !deveMostrar);
      itemCardapio.setAttribute("aria-hidden", String(!deveMostrar));
    });

    botoesCategoriaCardapio.forEach((botaoCategoria) => {
      const estaAtivo = botaoCategoria.getAttribute("data-categoria-cardapio") === categoriaSelecionada;
      botaoCategoria.classList.toggle("ativo", estaAtivo);
    });
  }

  botoesCategoriaCardapio.forEach((botaoCategoria) => {
    botaoCategoria.addEventListener("click", () => {
      filtrarCardapio(botaoCategoria.getAttribute("data-categoria-cardapio"));
    });
  });

  filtrarCardapio("combos");
});


/* ===== INTERATIVIDADE WHATSAPP Ô DOG ===== */
document.addEventListener("DOMContentLoaded", () => {
  /*
    Coloque aqui o número real da lanchonete.
    Formato recomendado: 55 + DDD + número, somente números.
    Exemplo: const numeroWhatsappOdog = "5548999999999";
  */
  const numeroWhatsappOdog = "";

  function criarLinkWhatsapp(mensagem) {
    const textoMensagem = encodeURIComponent(mensagem);

    if (numeroWhatsappOdog) {
      return `https://wa.me/${numeroWhatsappOdog}?text=${textoMensagem}`;
    }

    return `https://wa.me/?text=${textoMensagem}`;
  }

  function abrirWhatsapp(mensagem) {
    window.open(criarLinkWhatsapp(mensagem), "_blank", "noopener,noreferrer");
  }

  const botoesProdutoWhatsapp = document.querySelectorAll("[data-produto-whatsapp]");

  botoesProdutoWhatsapp.forEach((botaoProduto) => {
    botaoProduto.addEventListener("click", () => {
      const nomeProduto = botaoProduto.getAttribute("data-produto-whatsapp") || "Produto Ô DOG";
      const precoProduto = botaoProduto.getAttribute("data-preco-whatsapp") || "";

      const mensagem = [
        "Olá! Quero fazer um pedido na Ô DOG.",
        "",
        `Produto: ${nomeProduto}`,
        precoProduto ? `Valor: ${precoProduto}` : "",
        "",
        "Pode me passar mais informações?"
      ].filter(Boolean).join("\n");

      abrirWhatsapp(mensagem);
    });
  });

  const botoesWhatsappGeral = document.querySelectorAll("[data-whatsapp-geral]");

  botoesWhatsappGeral.forEach((botaoWhatsapp) => {
    botaoWhatsapp.addEventListener("click", (evento) => {
      evento.preventDefault();

      abrirWhatsapp("Olá! Vim pelo site da Ô DOG e quero fazer um pedido.");
    });
  });

  const botaoFinalizarMontagem = document.getElementById("botaoFinalizarMontagem");

  if (botaoFinalizarMontagem) {
    botaoFinalizarMontagem.addEventListener("click", (evento) => {
      const hrefAtual = botaoFinalizarMontagem.getAttribute("href");

      if (!hrefAtual || hrefAtual === "#") {
        evento.preventDefault();
        abrirWhatsapp("Olá! Quero montar um Ô DOG pelo site.");
      }
    });
  }
});

