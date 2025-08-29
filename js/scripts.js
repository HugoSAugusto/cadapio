// Elementos gerais
const cardapioSection = document.getElementById("cardapio");
const tabButtons = document.querySelectorAll(".tabs button");

// Renderizar cardápio inicial (pizzas)
renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);

// Troca de abas
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.tab === "pizzas") {
      renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
    } else if (btn.dataset.tab === "massas") {
      renderMassasPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
    } else if (btn.dataset.tab === "bebidas") {
      renderBebidas(cardapioSection, carrinhoItens, atualizarCarrinho);
    }
  });
});
