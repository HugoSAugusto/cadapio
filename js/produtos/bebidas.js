// Lista de bebidas com preços por tamanho
const bebidas = [
    {
        nome: "Coca-Cola",
        tamanhos: [
            { tamanho: "2L", preco: 10.00 },
            { tamanho: "1L", preco: 6.00 },
        ]
    },
    {
        nome: "Pepsi",
        tamanhos: [
            { tamanho: "2L", preco: 10.00 },
            { tamanho: "1L", preco: 6.00 },
        ]
    },
    {
        nome: "Guaraná Antarctica",
        tamanhos: [
            { tamanho: "2L", preco: 9.50 },
            { tamanho: "1L", preco: 5.50 },
        ]
    },
    {
        nome: "Fanta Laranja",
        tamanhos: [
            { tamanho: "2L", preco: 9.50 },
            { tamanho: "1L", preco: 5.50 },
            { tamanho: "500ml", preco: 4.00 }
        ]
    },
    {
        nome: "Fanta Uva",
        tamanhos: [
            { tamanho: "2L", preco: 9.50 },
            { tamanho: "1L", preco: 5.50 },
            { tamanho: "500ml", preco: 4.00 }
        ]
    },
    {
        nome: "Sprite",
        tamanhos: [
            { tamanho: "2L", preco: 9.50 },

        ]
    },
    {
        nome: "Schweppes Citrus",
        tamanhos: [
            { tamanho: "500ml", preco: 4.50 }
        ]
    },
    {
        nome: "H2OH!",
        tamanhos: [
            { tamanho: "500ml", preco: 4.50 }
        ]
    },
];

/**
 * Função para renderizar bebidas com seleção de tamanho
 */
function renderBebidas(cardapioSection, carrinhoItens, atualizarCarrinho) {
    cardapioSection.innerHTML = "<h2>Escolha sua bebida</h2>";

    bebidas.forEach((bebida, bebidaIndex) => {
        const div = document.createElement("div");
        div.className = "item";

        // Cria dropdown de tamanhos
        let opcoesTamanho = bebida.tamanhos.map((t, index) => {
            return `<option value="${index}">${t.tamanho} - R$ ${t.preco.toFixed(2)}</option>`;
        }).join("");

        div.innerHTML = `
            <h3>${bebida.nome}</h3>
            <select class="select-tamanho">
                ${opcoesTamanho}
            </select>
            <button>Adicionar</button>
        `;

        cardapioSection.appendChild(div);

        // Evento adicionar ao carrinho
        const btn = div.querySelector("button");
        const select = div.querySelector("select");

        btn.addEventListener("click", () => {
            const tamanhoSelecionado = bebida.tamanhos[parseInt(select.value)];
            carrinhoItens.push({
                nome: bebida.nome,
                categoria: "bebidas",
                tamanho: tamanhoSelecionado.tamanho,
                preco: tamanhoSelecionado.preco
            });
            atualizarCarrinho();
        });
    });
}
