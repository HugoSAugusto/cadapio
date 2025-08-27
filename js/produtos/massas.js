// Lista de massas
const massas = [
    { nome: "Carbonara", preco: 39.90 },
    { nome: "Bolognesa", preco: 42.90 },
    { nome: "Frango com Catupiry", preco: 41.50 },
    { nome: "Bolonhesa com Queijo", preco: 43.90 },
    { nome: "Alfredo", preco: 40.00 },
    { nome: "Lasanha à Bolonhesa", preco: 45.00 },
    { nome: "Ravioli de Queijo", preco: 44.00 },
    { nome: "Espaguete ao Molho Pesto", preco: 38.50 },
    { nome: "Fettuccine Alfredo", preco: 42.00 },
    { nome: "Nhoque ao Sugo", preco: 39.00 },
];

// Configuração de tamanhos para massas
const tamanhosMassas = [
  { nome: "Pequena", acrescimo: 0 },
  { nome: "Média", acrescimo: 8 },
  { nome: "Grande", acrescimo: 15 }
];

/**
 * Passo 1: escolher tamanho
 */
function renderMassasPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho) {
  cardapioSection.innerHTML = "<h2>Escolha o tamanho da massa</h2>";

  tamanhosMassas.forEach((tamanho) => {
    const btn = document.createElement("button");
    btn.textContent = `${tamanho.nome} (+R$${tamanho.acrescimo})`;
    btn.addEventListener("click", () => {
      renderEscolhaMassas(cardapioSection, carrinhoItens, atualizarCarrinho, tamanho);
    });
    cardapioSection.appendChild(btn);
  });
}

/**
 * Passo 2: escolher tipo de massa
 */
function renderEscolhaMassas(cardapioSection, carrinhoItens, atualizarCarrinho, configTamanho) {
  cardapioSection.innerHTML = `<h2>Escolha o tipo de massa (${configTamanho.nome})</h2>`;

  massas.forEach((massa) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h3>${massa.nome} - R$ ${(massa.preco + configTamanho.acrescimo).toFixed(2)}</h3>
      <button>Adicionar</button>
    `;
    cardapioSection.appendChild(div);

    div.querySelector("button").addEventListener("click", () => {
      const precoTotal = massa.preco + configTamanho.acrescimo;
      carrinhoItens.push({
        nome: massa.nome,
        categoria: "massas",
        tamanho: configTamanho.nome,
        preco: precoTotal
      });
      atualizarCarrinho();
      renderMassasPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
    });
  });

  // Botão voltar para escolher tamanho
  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar";
  btnVoltar.classList.add("btn-voltar");
  btnVoltar.addEventListener("click", () => {
    renderMassasPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
  });
  cardapioSection.appendChild(btnVoltar);
}
