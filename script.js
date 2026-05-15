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
  const resumoProduto = document.getElementById("resumoProduto");
  const resumoDescricaoProduto = document.getElementById("resumoDescricaoProduto");
  const resumoBebida = document.getElementById("resumoBebida");
  const resumoRetirados = document.getElementById("resumoRetirados");
  const resumoTotal = document.getElementById("resumoTotal");
  const botaoFinalizar = document.getElementById("botaoFinalizarMontagem");
  const barraProgresso = document.getElementById("barraProgressoMontagem");

  if (!opcoes.length || !resumoProduto || !resumoTotal) {
    return;
  }

  const estadoMontagem = {
    produto: {
      tipo: "Combo",
      nome: "Combo Caramelo",
      descricao: "Hot Dog Tradicional com 1 salsicha, 50g de fritas e 1 Coca-Cola 200ml",
      preco: 18,
    },
    bebida: "Coca-Cola 200ml",
    retirados: [],
  };

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function atualizarResumo() {
    const retiradosTexto = estadoMontagem.retirados.length
      ? estadoMontagem.retirados.join(", ")
      : "completo";

    const etapasCompletas = 2 + (estadoMontagem.retirados.length ? 1 : 0);
    const progresso = Math.min((etapasCompletas / 3) * 100, 100);

    resumoProduto.textContent = estadoMontagem.produto.nome;

    if (resumoDescricaoProduto) {
      resumoDescricaoProduto.textContent = estadoMontagem.produto.descricao;
    }

    if (resumoBebida) {
      resumoBebida.textContent = estadoMontagem.bebida;
    }

    if (resumoRetirados) {
      resumoRetirados.textContent = retiradosTexto;
    }

    resumoTotal.textContent = formatarPreco(estadoMontagem.produto.preco);

    if (barraProgresso) {
      barraProgresso.style.width = `${progresso}%`;
    }

    if (botaoFinalizar) {
      const mensagem = [
        "Olá! Quero fazer um pedido na Ô DOG:",
        "",
        `Item: ${estadoMontagem.produto.nome}`,
        `Descrição: ${estadoMontagem.produto.descricao}`,
        `Bebida: ${estadoMontagem.bebida}`,
        `Ingredientes retirados: ${retiradosTexto}`,
        `Valor do item: ${formatarPreco(estadoMontagem.produto.preco)}`,
      ].join("\n");

      botaoFinalizar.href = `https://wa.me/5548988672880?text=${encodeURIComponent(mensagem)}`;
    }
  }

  function selecionarProduto(botao) {
    const botoesProduto = document.querySelectorAll('.montagem-opcao[data-grupo="produto"]');

    botoesProduto.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");

    estadoMontagem.produto = {
      tipo: botao.dataset.tipo || "Lanche",
      nome: botao.dataset.nome,
      descricao: botao.dataset.descricao || botao.dataset.nome,
      preco: Number(botao.dataset.preco),
    };

    atualizarResumo();
  }

  function selecionarBebida(botao) {
    const botoesBebida = document.querySelectorAll('.montagem-opcao[data-grupo="bebida"]');

    botoesBebida.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");

    estadoMontagem.bebida = botao.dataset.nome || "Sem bebida";

    atualizarResumo();
  }

  function alternarIngredienteRetirado(botao) {
    const nome = botao.dataset.nome;
    const existe = estadoMontagem.retirados.includes(nome);

    if (existe) {
      estadoMontagem.retirados = estadoMontagem.retirados.filter((ingrediente) => ingrediente !== nome);
      botao.classList.remove("ativo");
    } else {
      estadoMontagem.retirados.push(nome);
      botao.classList.add("ativo");
    }

    atualizarResumo();
  }

  function resetarMontagem() {
    estadoMontagem.produto = {
      tipo: "Combo",
      nome: "Combo Caramelo",
      descricao: "Hot Dog Tradicional com 1 salsicha, 50g de fritas e 1 Coca-Cola 200ml",
      preco: 18,
    };
    estadoMontagem.bebida = "Coca-Cola 200ml";
    estadoMontagem.retirados = [];

    opcoes.forEach((botao) => {
      botao.classList.remove("ativo");

      if (botao.dataset.grupo === "produto" && botao.dataset.nome === "Combo Caramelo") {
        botao.classList.add("ativo");
      }

      if (botao.dataset.grupo === "bebida" && botao.dataset.nome === "Coca-Cola 200ml") {
        botao.classList.add("ativo");
      }
    });

    atualizarResumo();
  }

  opcoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      if (botao.dataset.grupo === "produto") {
        selecionarProduto(botao);
        return;
      }

      if (botao.dataset.grupo === "bebida") {
        selecionarBebida(botao);
        return;
      }

      alternarIngredienteRetirado(botao);
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
const logo = document.getElementById("logoParallax");
const podeUsarParallax = logo
  && window.matchMedia("(pointer: fine)").matches
  && window.matchMedia("(min-width: 769px)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (podeUsarParallax) {
  let quadroParallax = null;
  let ultimoMouse = { x: 0, y: 0 };

  document.addEventListener("mousemove", (evento) => {
    ultimoMouse = {
      x: (window.innerWidth / 2 - evento.clientX) / 45,
      y: (window.innerHeight / 2 - evento.clientY) / 45,
    };

    if (quadroParallax) {
      return;
    }

    quadroParallax = window.requestAnimationFrame(() => {
      logo.style.transform = `translate3d(${ultimoMouse.x}px, ${ultimoMouse.y}px, 0)`;
      quadroParallax = null;
    });
  }, { passive: true });
}


/* ===== FILTRO FUNCIONAL DO CARDÁPIO - SEM BEBIDAS ===== */
document.addEventListener("DOMContentLoaded", () => {
  const cardapio = document.getElementById("cardapio");
  const botoesCategoriaCardapio = cardapio ? cardapio.querySelectorAll("[data-categoria-cardapio]") : [];
  const itensCardapio = cardapio ? cardapio.querySelectorAll("[data-item-cardapio]") : [];

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
  const numeroWhatsappOdog = "5548988672880";

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


/* =========================================================
   OTIMIZAÇÃO DE PERFORMANCE MOBILE — Ô DOG
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const dispositivoMobile = window.innerWidth <= 768;

  if (!dispositivoMobile) {
    return;
  }

  /* Remove efeitos muito pesados no mobile */
  const elementosAnimados = document.querySelectorAll(
    ".lanche-flutuante, .botao-whatsapp-flutuante, .imagem-logo-principal"
  );

  elementosAnimados.forEach((elemento) => {
    elemento.style.animation = "none";
  });

  /* Lazy render visual */
  const imagens = document.querySelectorAll("img");

  imagens.forEach((imagem) => {
    if (!imagem.loading) {
      imagem.loading = "lazy";
    }

    imagem.decoding = "async";
  });

});
