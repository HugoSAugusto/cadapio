// Estado do carrinho
let carrinhoItens = [];

// Elementos do DOM
const cardapioSection = document.getElementById("cardapio");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalEl = document.getElementById("total");
const tabButtons = document.querySelectorAll(".tabs button");

// Função para atualizar o carrinho
function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinhoItens.forEach((item, index) => {
    const li = document.createElement("li");
    let detalhes = "";

    if(item.categoria === "pizzas") {
      detalhes = `(${item.tamanho}) Sabores: ${item.sabores.join(", ")} ${item.bordaRecheada ? "| Borda Recheada" : ""}`;
    } else if(item.categoria === "massas") {
      detalhes = `(${item.tamanho})`;
    } else if(item.categoria === "bebidas") {
      detalhes = `(${item.tamanho})`;
    }

    li.innerHTML = `${item.nome} ${detalhes} <span>R$ ${item.preco.toFixed(2)}</span> <button data-index="${index}">X</button>`;
    itensCarrinho.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = total.toFixed(2);

  // Remover item do carrinho
  itensCarrinho.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      carrinhoItens.splice(idx, 1);
      atualizarCarrinho();
    });
  });
}

// Inicializa a aba de pizzas por padrão
renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);

// Eventos das abas
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if(btn.dataset.tab === "pizzas") {
      renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
    } else if(btn.dataset.tab === "massas") {
      renderMassasPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
    } else if(btn.dataset.tab === "bebidas") {
      renderBebidas(cardapioSection, carrinhoItens, atualizarCarrinho);
    }
  });
});
