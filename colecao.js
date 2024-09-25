function carregaProdutos (){
    let mostra = ''
    for(let i = 0; i < produtos.length; i++){
        mostra += `
        <a href="/ecommerce-product-page-main/html/index.html?id=${produtos[i].id}">
        <div class="cards individuo">
            <div id="conteudo">
                <img src="${produtos[i].img}">
                <h6>${produtos[i].Nome}</h6>
            </div>
            <div class="lugar">
                <div class="alinhar">
                    <p>R$ ${produtos[i].Preco}</p>
                    <p id="frete">${produtos[i].Frete}</p>
                </div>
                <button id="btnSaber">Saber mais</button>
            </div>
            
            
            </div>
        
        </a>

        `
    }
    document.getElementById('tela').innerHTML = mostra
}

// Popup carrinho
const ativo = document.getElementById("active");
const container = document.getElementById("container");

// Função para abrir e fechar o popup
function togglePopup() {
    if (container.classList.contains("active")) {
        container.classList.remove("active"); // Se estiver ativo, desativa
    } else {
        container.classList.add("active"); // Se não estiver ativo, ativa
    }
}

// Adiciona evento de clique ao botão para abrir e fechar o popup
ativo.addEventListener("click", (event) => {
    event.stopPropagation(); // Evita que o clique no botão feche o popup imediatamente
    togglePopup();
});

// Adiciona evento de clique ao documento para fechar o popup se o clique for fora
document.addEventListener("click", (event) => {
    if (container.classList.contains("active") && !container.contains(event.target) && event.target !== ativo) {
        container.classList.remove("active");
    }
});

// Formata dinheiro
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Requisição GET
async function exibePop() {
    try {
        const response = await fetch('https://frontend-mentor-json.vercel.app/produtos');
        const data = await response.json();
        console.log('Dados recebidos:', data);

        let mostrar = '';

        for (let i = 0; i < data.length; i++) {
            const produto = data[i];
            const precoTotal = produto.preco * produto.quantidade;
            const precoFormatado = formatCurrency(precoTotal);
            mostrar += `
                <div class="produto">
                    <img src="${produto.img}" height="80">
                    <div>
                        <h6>${produto.nome}</h6>
                        <h6>${precoFormatado}</h6>
                    </div>
                    <button id="dois">
                        <span>${produto.quantidade}</span>
                    </button>
                    <button type="button" class="btnRemove"><i class='bx bx-trash'></i></button>
                </div>
            `;
            
        }

        

        // Exibe os produtos no popup
        document.getElementById('popup').innerHTML = mostrar;
        remove();
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }

}

function remove() {
    // Adiciona evento de remoção para cada botão
    const btnsRemove = document.querySelectorAll('.btnRemove');
    btnsRemove.forEach(btn => {
        btn.addEventListener('click', async function() {
            // Identifique o elemento relacionado ao botão de remoção clicado
            const produtoElemento = btn.closest('.produto');

            // Pegue o nome do produto (ou outro identificador único)
            const nomeProduto = produtoElemento.querySelector('h6').textContent;

            // Remover do JSON e da tela usando o nome como identificador
            await removeFromJson(nomeProduto, produtoElemento);

            // Recarregar a página após a remoção
            window.location.reload();
        });
    });
}

async function removeFromJson(nomeProduto, produtoElemento) {
    try {
        // Primeiramente, obtenha os dados do servidor
        const response = await fetch('https://frontend-mentor-json.vercel.app/produtos');
        const data = await response.json();

        // Encontre o produto que deseja remover
        const produto = data.find(item => item.nome === nomeProduto);

        if (produto) {
            // Envie uma requisição DELETE para remover o produto
            const deleteResponse = await fetch(`https://frontend-mentor-json.vercel.app/produtos/${produto.id}`, {
                method: 'DELETE'
            });
            if (deleteResponse.ok) {
                console.log(`Produto ${nomeProduto} removido com sucesso`);

                // Remove o elemento do DOM após a remoção bem-sucedida do servidor
                produtoElemento.remove();
            } else {
                console.error('Erro ao remover o produto');
            }
        } else {
            console.error('Produto não encontrado no JSON');
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

document.querySelector('.filtro').addEventListener('click', function() {
    const aside = document.querySelector('aside.fixed');
    aside.classList.toggle('open');
});

// Filtros

// Função para atualizar a exibição dos produtos com base nos filtros
function updateProductDisplay() {
    const searchValue = document.querySelector("#filtrar-tenis").value.toLowerCase();
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
    const selectedColor = document.querySelector('.cor.selected')?.getAttribute('data-color');
    const maxPrice = parseFloat(document.getElementById('price-slider').value);
    
    // Atualiza o texto do preço
    document.getElementById('max-price').textContent = `R$${maxPrice.toFixed(2)}`;
    
    // Seleciona todos os elementos com a classe .individuo
    const individuos = document.querySelectorAll(".individuo");

    for (let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];
        let individuo = individuos[i];

        // Verifica se o produto corresponde a todos os filtros aplicados
        const matchesName = produto.Nome.toLowerCase().includes(searchValue);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(produto.marca);
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(produto.Tipo);
        const matchesColor = !selectedColor || produto.Cor === selectedColor;
        const matchesPrice = maxPrice >= parseFloat(produto.Preco);

        if (matchesName && matchesBrand && matchesType && matchesColor && matchesPrice) {
            individuo.classList.remove("fadeOut"); // Mostra o produto
        } else {
            individuo.classList.add("fadeOut"); // Oculta o produto
        }
    }
}

// Adiciona event listeners aos filtros
document.querySelector("#filtrar-tenis").addEventListener("input", updateProductDisplay);

document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateProductDisplay);
});

document.querySelectorAll('input[name="type"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateProductDisplay);
});

document.querySelectorAll('.cor').forEach(icon => {
    icon.addEventListener('click', function() {
        document.querySelectorAll('.cor').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        updateProductDisplay();
    });
});

document.querySelector('.fa-circle-xmark').addEventListener('click', function() {
    document.querySelectorAll('.cor').forEach(c => c.classList.remove('selected'));
    updateProductDisplay();
});

document.getElementById('price-slider').addEventListener('input', updateProductDisplay);

// Filtro de ordenação
function sortProducts(products, ascending) {
    return products.sort((a, b) => {
        const priceA = parseFloat(a.Preco);
        const priceB = parseFloat(b.Preco);
        return ascending ? priceA - priceB : priceB - priceA;
    });
}

function carregaProdutos() {
    const ascending = document.getElementById('cres').checked;
    const descending = document.getElementById('decre').checked;
    let sortedProducts = [...produtos];
    if (ascending || descending) {
        sortedProducts = sortProducts(sortedProducts, ascending);
    }

    let mostra = '';
    for (let i = 0; i < sortedProducts.length; i++) {
        mostra += `
        <a href="/ecommerce-product-page-main/html/index.html?id=${sortedProducts[i].id}">
        <div class="cards individuo">
            <div id="conteudo">
                <img src="${sortedProducts[i].img}">
                <h6>${sortedProducts[i].Nome}</h6>
            </div>
            <div class="lugar">
                <div class="alinhar">
                    <p>R$ ${sortedProducts[i].Preco}</p>
                    <p id="frete">${sortedProducts[i].Frete}</p>
                </div>
                <button id="btnSaber">Saber mais</button>
            </div>
        </div>
        </a>
        `;
    }
    document.getElementById('tela').innerHTML = mostra;

    // Atualiza os filtros após a ordenação
    updateProductDisplay();
}

document.getElementById('cres').addEventListener('change', carregaProdutos);
document.getElementById('decre').addEventListener('change', carregaProdutos);

// Inicializa os produtos na primeira carga
carregaProdutos();


window.onload = function (){
    carregaProdutos ()
    exibePop()
};




