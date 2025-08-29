// Estado do carrinho
let carrinhoItens = [];

// Elementos do carrinho
const itensCarrinho = document.getElementById("itens-carrinho");
const totalEl = document.getElementById("total");
const btnFinalizar = document.getElementById("finalizarPedido");
const cartIcon = document.getElementById("cartIcon");
const carrinho = document.querySelector("aside.carrinho");

// Criar modal wrapper
const modal = document.createElement("div");
modal.classList.add("carrinho-modal");
document.body.appendChild(modal);
modal.appendChild(carrinho);

// =============================
// 🚀 Funções do Carrinho
// =============================

// Atualizar carrinho visual
function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinhoItens.forEach((item, index) => {
    const li = document.createElement("li");
    let detalhes = "";

    if (item.categoria === "pizzas") {
      detalhes = `(${item.tamanho}) Sabores: ${item.sabores.join(", ")} ${item.bordaRecheada ? "| Borda Recheada" : ""}`;
    } else if (item.categoria === "massas" || item.categoria === "bebidas") {
      detalhes = `(${item.tamanho})`;
    }

    li.innerHTML = `${item.nome} ${detalhes} 
      <span>R$ ${item.preco.toFixed(2)}</span> 
      <button data-index="${index}">X</button>`;
    
    itensCarrinho.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = total.toFixed(2);
  atualizarContadorCarrinho();

  // Remover item
  itensCarrinho.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      carrinhoItens.splice(idx, 1);
      atualizarCarrinho();
    });
  });
}

// Atualizar contador do ícone
function atualizarContadorCarrinho() {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = carrinhoItens.length;
}

// Abrir modal
cartIcon.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fechar modal clicando fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Finalizar Pedido
btnFinalizar.addEventListener("click", () => {
  if (carrinhoItens.length === 0) {
    alert("⚠️ Seu carrinho está vazio!");
    return;
  }
  enviarPedidoWhatsApp(carrinhoItens);
});
