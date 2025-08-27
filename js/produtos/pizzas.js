// Lista de pizzas
const pizzas = [
    { nome: "Margherita", precoBase: 30.00 },
    { nome: "Calabresa", precoBase: 32.00 },
    { nome: "Quatro Queijos", precoBase: 35.00 },
    { nome: "Frango com Catupiry", precoBase: 36.00 },
    { nome: "Portuguesa", precoBase: 34.00 },
    { nome: "Pepperoni", precoBase: 37.00 },
    { nome: "Bacon", precoBase: 38.00 },
    { nome: "Napolitana", precoBase: 33.00 },
    { nome: "Carne Seca com Catupiry", precoBase: 39.00 },
    { nome: "Brócolis com Alho", precoBase: 34.00 },
    { nome: "Palmito", precoBase: 35.00 },
    { nome: "Veggie (Vegetariana)", precoBase: 33.00 },
    { nome: "Atum", precoBase: 36.00 },
    { nome: "Camarão", precoBase: 42.00 },
    { nome: "Mexicana", precoBase: 38.00 },
    { nome: "Strogonoff de Frango", precoBase: 40.00 },
];

const limiteSaboresPorTamanho = {
  pequena: 2,
  media: 3,
  grande: 4
};

// Configuração dos tamanhos
const tamanhosPizza = [
    { nome: "Brotinho", maxSabores: 2, acrescimo: 0 },
    { nome: "Média", maxSabores: 3, acrescimo: 10 },
    { nome: "Grande", maxSabores: 4, acrescimo: 20 },
    { nome: "Gigante", maxSabores: 4, acrescimo: 30 }
];

const acrescimoBorda = 5;

/**
 * Passo 1: escolher tamanho
 */
function renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho) {
  cardapioSection.innerHTML = "<h2>Escolha o tamanho da pizza</h2>";
  
  tamanhosPizza.forEach((tamanho) => {
    const btn = document.createElement("button");
    btn.textContent = `${tamanho.nome} (+R$${tamanho.acrescimo})`;
    btn.addEventListener("click", () => {
      renderEscolhaPizza(cardapioSection, carrinhoItens, atualizarCarrinho, tamanho);
    });
    cardapioSection.appendChild(btn);
  });
}

/**
 * Passo 2: escolher sabores e borda
 */
function renderEscolhaPizza(cardapioSection, carrinhoItens, atualizarCarrinho, configTamanho) {
  cardapioSection.innerHTML = `<h2>Escolha os sabores da pizza (${configTamanho.nome}, máx ${configTamanho.maxSabores})</h2>`;

  pizzas.forEach((pizza) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <label>
        <input type="checkbox" class="sabor" value="${pizza.nome}"> ${pizza.nome} - R$ ${pizza.precoBase.toFixed(2)}
      </label>
    `;
    cardapioSection.appendChild(div);
  });

  // Limita a quantidade de sabores marcada
    const checkboxes = Array.from(document.querySelectorAll(".sabor"));
    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            const selecionados = checkboxes.filter(c => c.checked);
            if (selecionados.length > configTamanho.maxSabores) {
                cb.checked = false; // desmarca o último clicado
                alert(`Você só pode escolher até ${configTamanho.maxSabores} sabores!`);
            }
        });
    });

  // Borda recheada
  const bordaLabel = document.createElement("label");
  bordaLabel.innerHTML = `Borda Recheada (+R$${acrescimoBorda}) <input type="checkbox" id="bordaRecheada">`;
  cardapioSection.appendChild(bordaLabel);

  // Botão adicionar ao carrinho
  const btnAdd = document.createElement("button");
  btnAdd.textContent = "Adicionar ao Carrinho";
  btnAdd.classList.add("btn-add");
  cardapioSection.appendChild(btnAdd);

  // Botão voltar
  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar";
  btnVoltar.classList.add("btn-voltar");
  cardapioSection.appendChild(btnVoltar);

  // Evento adicionar ao carrinho
  btnAdd.addEventListener("click", () => {
    const selecionados = Array.from(document.querySelectorAll(".sabor:checked")).map(i => i.value);

    if(selecionados.length === 0) return alert("Selecione pelo menos um sabor!");
    if(selecionados.length > configTamanho.maxSabores) return alert(`Você só pode escolher até ${configTamanho.maxSabores} sabores!`);

    const borda = document.getElementById("bordaRecheada").checked;

    // Soma todos os preços dos sabores
    let precoSabores = selecionados.reduce((total, sabor) => {
      return total + pizzas.find(p => p.nome === sabor).precoBase;
    }, 0);

    const precoTotal = precoSabores + configTamanho.acrescimo + (borda ? acrescimoBorda : 0);

    carrinhoItens.push({
      nome: selecionados.join(" / "),
      categoria: "pizzas",
      tamanho: configTamanho.nome,
      sabores: selecionados,
      bordaRecheada: borda,
      preco: precoTotal
    });

    atualizarCarrinho();
    renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
  });

  // Evento voltar
  btnVoltar.addEventListener("click", () => {
    renderPizzaPassoAPasso(cardapioSection, carrinhoItens, atualizarCarrinho);
  });
}
