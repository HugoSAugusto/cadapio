function finalizarPedido() {
  if (carrinhoItens.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const mesa = prompt("Digite o número da mesa:");
  if (!mesa) return;

  let bebidas = [];
  let pizzas = [];
  let massas = [];
  let total = 0;

  carrinhoItens.forEach((item) => {
    total += item.preco;

    if (item.categoria === "bebidas") {
      bebidas.push(`${item.nome} (${item.tamanho}) -> R$ ${item.preco.toFixed(2)}`);
    } else if (item.categoria === "pizzas") {
      pizzas.push(`${item.nome} (${item.tamanho}) | Sabores: ${item.sabores.join(", ")}${item.bordaRecheada ? " | Borda Recheada" : ""} -> R$ ${item.preco.toFixed(2)}`);
    } else if (item.categoria === "massas") {
      massas.push(`${item.nome} (${item.tamanho}) -> R$ ${item.preco.toFixed(2)}`);
    }
  });

  let mensagem = `Pedido\nMesa = ${mesa}\n\n`;

  if (pizzas.length > 0) {
    mensagem += `Comida (Pizzas):\n${pizzas.join("\n")}\n\n`;
  }

  if (massas.length > 0) {
    mensagem += `Comida (Massas):\n${massas.join("\n")}\n\n`;
  }

  if (bebidas.length > 0) {
    mensagem += `Bebidas:\n${bebidas.join("\n")}\n\n`;
  }

  mensagem += `Total = R$ ${total.toFixed(2)}`;

  const numeroWhatsApp = "5521976279796"; // Numero whatsApp
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

document.getElementById("finalizarPedido").addEventListener("click", finalizarPedido);
