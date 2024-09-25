let imprime
    let tamanhos= ""
    let a = new URLSearchParams(location.search)
    let id = a.get('id')
    produto = produtos.find (function (elem) {return elem.malefemale == id})


    window.onload = function (){
        imprimeTitulo ()
        carregaProdutos ()
        exibePop ()

        // Aba filtro
        const filtroIcon = document.querySelector('.filtro');
        if (filtroIcon) {
            filtroIcon.addEventListener('click', function() {
                const aside = document.querySelector('aside.fixed');
                if (aside) {
                    aside.classList.toggle('open');
                }
            });
        }

        function carregaProdutos() {
            // Obtém o estado dos checkboxes de ordenação
            const ascending = document.getElementById('cres').checked;
            const descending = document.getElementById('decre').checked;
            const maxPrice = parseFloat(document.getElementById('price-slider').value);
        
            // Filtra produtos com base no gênero selecionado
            let filteredProducts = produtos.filter(p => p.malefemale == id || p.malefemale == 2);
        
            // Ordena os produtos com base no filtro selecionado
            let sortedProducts = [...filteredProducts]; // Cria uma cópia da lista de produtos
            if (ascending || descending) {
                sortedProducts = sortProducts(sortedProducts, ascending);
            }
        
            // Atualiza o filtro de preço
            sortedProducts = sortedProducts.filter(p => p.Preco <= maxPrice);
        
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
        
            // Atualiza o estado dos botões após a renderização dos produtos
            updateSortingButtons();
        }

        // Filtro de preço


        // Função para ordenar produtos por preço
        function sortProducts(products, ascending) {
            return products.sort((a, b) => {
                const priceA = parseFloat(a.Preco);
                const priceB = parseFloat(b.Preco);

                if (ascending) {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });
        }

        // Função para gerenciar o estado dos botões de ordenação
        function updateSortingButtons() {
            const ascending = document.getElementById('cres').checked;
            const descending = document.getElementById('decre').checked;

            document.getElementById('cres').disabled = descending;
            document.getElementById('decre').disabled = ascending;
        }

        // Atualiza a função carregaProdutos para incluir ordenação e gerenciar estado dos botões
        function carregaProdutos() {
            // Obtém o estado dos checkboxes de ordenação
            const ascending = document.getElementById('cres').checked;
            const descending = document.getElementById('decre').checked;
            const maxPrice = parseFloat(document.getElementById('price-slider').value);
        
            // Filtra produtos com base no gênero selecionado
            let filteredProducts = produtos.filter(p => p.malefemale == id || p.malefemale == 2);
        
            // Ordena os produtos com base no filtro selecionado
            let sortedProducts = [...filteredProducts]; // Cria uma cópia da lista de produtos
            if (ascending || descending) {
                sortedProducts = sortProducts(sortedProducts, ascending);
            }
        
            // Atualiza o filtro de preço
            sortedProducts = sortedProducts.filter(p => p.Preco <= maxPrice);
        
            let mostra = '';
            for (let i = 0; i < sortedProducts.length; i++) {
                mostra += `
                <a href="index.html?id=${sortedProducts[i].id}">
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
        
            // Atualiza o estado dos botões após a renderização dos produtos
            updateSortingButtons();
        }
        

        // Adiciona event listeners aos checkboxes de ordenação
        document.getElementById('cres').addEventListener('change', carregaProdutos);
        document.getElementById('decre').addEventListener('change', carregaProdutos);

        // Atualiza a função de filtro de preço para recarregar os produtos
        function filterProducts(maxPrice) {
            const individuos = document.querySelectorAll(".individuo");
        
            for (let i = 0; i < individuos.length; i++) {
                let individuo = individuos[i];
                let precoProduto = parseFloat(individuo.querySelector("p").textContent.replace('R$', '').replace(',', '.'));
        
                if (precoProduto <= maxPrice) {
                    individuo.classList.remove("fadeOut"); // Mostra o produto
                } else {
                    individuo.classList.add("fadeOut"); // Oculta o produto
                }
            }
        }


        // Obtém os elementos do DOM
        const priceSlider = document.getElementById('price-slider');
        const minPriceLabel = document.getElementById('min-price');
        const maxPriceLabel = document.getElementById('max-price');
        const productsList = document.getElementById('products-list');

        // Atualiza os labels de preço e filtra produtos
        priceSlider.addEventListener('input', () => {
            const maxPrice = parseFloat(priceSlider.value);
            maxPriceLabel.textContent = `R$${maxPrice.toFixed(2)}`;
            filterProducts(maxPrice);
        });

        function filterProducts(maxPrice) {
            // Obtém a lista atualizada de indivíduos
            const individuos = document.querySelectorAll(".individuo");

            for (let i = 0; i < produtos.length; i++) {
                let individuo = individuos[i];
                if (individuo) {
                    if (maxPrice >= produtos[i].Preco) {
                        individuo.classList.remove("fadeOut"); // Mostra o produto
                    } else {
                        individuo.classList.add("fadeOut"); // Oculta o produto
                    }
                }
            }
        }

        // Função para filtrar produtos com base na cor selecionada
        function filterByColor(color) {
            const individuos = document.querySelectorAll(".individuo");

            for (let i = 0; i < produtos.length; i++) {
                let individuo = individuos[i];
                if (individuo) {
                    if (produtos[i].Cor === color) {
                        individuo.classList.remove("fadeOut"); // Mostra o produto
                    } else {
                        individuo.classList.add("fadeOut"); // Oculta o produto
                    }
                }
            }
        }

        // Adiciona event listeners para os ícones de cor
        const colorIcons = document.querySelectorAll('.cor');
        colorIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const selectedColor = this.getAttribute('data-color');
                filterByColor(selectedColor);
            });
        });

        // Função para remover o filtro de cor e mostrar todos os produtos
        function resetColorFilter() {
            const individuos = document.querySelectorAll(".individuo");

            individuos.forEach(individuo => {
                individuo.classList.remove("fadeOut"); // Mostra todos os produtos
            });
        }

        // Adiciona o event listener ao botão de reset de filtro
        const resetButton = document.querySelector('.fa-circle-xmark');
        resetButton.addEventListener('click', resetColorFilter);

        // Filtro de marca

        // Função para filtrar produtos com base nas marcas selecionadas
        function filterByBrand() {
            const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
            const individuos = document.querySelectorAll(".individuo");

            for (let i = 0; i < produtos.length; i++) {
                let individuo = individuos[i];
                if (individuo) {
                    if (selectedBrands.length === 0 || selectedBrands.includes(produtos[i].marca)) {
                        individuo.classList.remove("fadeOut"); // Mostra o produto
                    } else {
                        individuo.classList.add("fadeOut"); // Oculta o produto
                    }
                }
            }
        }

        // Adiciona event listeners para os checkboxes de marca
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterByBrand);
        });

        // Função para filtrar produtos com base no tipo selecionado
function filterByType() {
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
    const individuos = document.querySelectorAll(".individuo");

    for (let i = 0; i < produtos.length; i++) {
        let individuo = individuos[i];
        if (individuo) {
            if (selectedTypes.length === 0 || selectedTypes.includes(produtos[i].Tipo)) {
                individuo.classList.remove("fadeOut"); // Mostra o produto
            } else {
                individuo.classList.add("fadeOut"); // Oculta o produto
            }
        }
    }
}

// Adiciona event listeners para os checkboxes de tipo
const typeCheckboxes = document.querySelectorAll('input[name="type"]');
typeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterByType);
});

        //*******************************//
    };

    function imprimeTitulo() {
        let mostra = ''
        if (id == 1){
            mostra = `
             <div class="maior">
                <h1 class="colecao">Feminino</h1>
                <div class="pesquisa">
        <label for="filtrar-tenis">Filtre:</label>
        <input type="text" name="filtros" id="filtrar-tenis" placeholder="Meu tênis">
        <i class='bx bx-slider-alt filtro'></i>
      </div> 
             </div>
             <aside class="fixed">
                <div class="container_aside">
                    <div class="title">
                    <h2>FILTROS:</h2>
                    </div>
                    <div class="filters">
                    <h3>Faixa de Preço:</h3>
                    <div class="slider-container">
                        <div class="slider-label">
                            <span id="min-price">R$0</span>
                            <span id="max-price">R$1000</span>
                        </div>
                        <input type="range" id="price-slider" class="slider" min="0" max="1000" value="1000" step="10">
                    </div>
                    <div>
                        <label>
                        <i class='bx bxs-up-arrow opacidade' ></i>
                            <input type="checkbox" id="decre" />
                            Ordem decrescente
                        </label>
                        <label>
                        <i class='bx bxs-down-arrow opacidade' ></i>
                            <input type="checkbox" id="cres" />
                            Ordem crescente
                        </label>
                    </div>

                    <h3>Marca:</h3>
                    <label><input type="checkbox" name="brand" value="Nike"> Nike</label>
                    <label><input type="checkbox" name="brand" value="Adidas"> Adidas</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Puma</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Olympikus</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Misuno</label>
                    
                    <h3>Tipo de Tênis:</h3>
                    <label><input type="checkbox" name="type" value="Corrida"> Corrida</label>
                    <label><input type="checkbox" name="type" value="Casual"> Casual</label>
                    <label><input type="checkbox" name="type" value="Esportivo"> Esportivo</label>
                    
                    <h3>Cores:</h3>
                    <div class="colors">
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #000000; --fa-rotate-angle: 45deg;" data-color="Preto"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #74e665; --fa-rotate-angle: 45deg;" data-color="Verde"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #fc73ea; --fa-rotate-angle: 45deg;" data-color="Rosa"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #74C0FC; --fa-rotate-angle: 45deg;" data-color="Azul"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #FFD43B; --fa-rotate-angle: 45deg;" data-color="Amarelo"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #ff3b3b; --fa-rotate-angle: 45deg;" data-color="Vermelho"></i>
                        <i class="fa-regular fa-circle-xmark cor" style="color: #000000;"></i>
                    </div>
                    </div>
                </div>
            </aside>
            `
        }
        if(id == 0){
            mostra = `
             <div class="maior">
                <h1 class="colecao">Masculino</h1>
                <div class="pesquisa">
        <label for="filtrar-tenis">Filtre:</label>
        <input type="text" name="filtros" id="filtrar-tenis" placeholder="Meu tênis">
        <i class='bx bx-slider-alt filtro'></i>
      </div> 
             </div>
             <aside class="fixed">
                <div class="container_aside">
                    <div class="title">
                    <h2>FILTROS:</h2>
                    </div>
                    <div class="filters">
                    <h3>Faixa de Preço:</h3>
                    <div class="slider-container">
                        <div class="slider-label">
                            <span id="min-price">R$0</span>
                            <span id="max-price">R$1000</span>
                        </div>
                        <input type="range" id="price-slider" class="slider" min="0" max="1000" value="1000" step="10">
                    </div>
                    <div>
                        <label>
                        <i class='bx bxs-up-arrow opacidade' ></i>
                            <input type="checkbox" id="decre" />
                            Ordem decrescente
                        </label>
                        <label>
                        <i class='bx bxs-down-arrow opacidade' ></i>
                            <input type="checkbox" id="cres" />
                            Ordem crescente
                        </label>
                    </div>

                    <h3>Marca:</h3>
                    <label><input type="checkbox" name="brand" value="Nike"> Nike</label>
                    <label><input type="checkbox" name="brand" value="Adidas"> Adidas</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Puma</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Olympikus</label>
                    <label><input type="checkbox" name="brand" value="Puma"> Misuno</label>
                    
                    <h3>Tipo de Tênis:</h3>
                    <label><input type="checkbox" name="type" value="Corrida"> Corrida</label>
                    <label><input type="checkbox" name="type" value="Casual"> Casual</label>
                    <label><input type="checkbox" name="type" value="Esportivo"> Esportivo</label>
                    
                    <h3>Cores:</h3>
                    <div class="colors">
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #000000; --fa-rotate-angle: 45deg;" data-color="Preto"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #74e665; --fa-rotate-angle: 45deg;" data-color="Verde"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #fc73ea; --fa-rotate-angle: 45deg;" data-color="Rosa"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #74C0FC; --fa-rotate-angle: 45deg;" data-color="Azul"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #FFD43B; --fa-rotate-angle: 45deg;" data-color="Amarelo"></i>
                        <i class="fa-solid fa-circle-half-stroke fa-rotate-by cor" style="color: #ff3b3b; --fa-rotate-angle: 45deg;" data-color="Vermelho"></i>
                        <i class="fa-regular fa-circle-xmark cor" style="color: #000000;"></i>
                    </div>
                    </div>
                </div>
            </aside>
            `
        }
        document.getElementById('titulo').innerHTML = mostra
    }


        function carregaProdutos (){
            let mostra = ''
            for(let i = 0; i < produtos.length; i++){
                verifica = produtos[i]
                if(verifica.malefemale == id || verifica.malefemale == 2){
                mostra += `
                <a href="index.html?id=${produtos[i].id}">
                <div class="cards individuo">
                    
                    <img src="${produtos[i].img}">
                    <div id="conteudo">
                    <h6>${produtos[i].Nome}</h6>
                    <div class="lugar">
                        <div class="alinhar">
                            <p>R$ ${produtos[i].Preco}</p>
                            <p id="frete">${produtos[i].Frete}</p>
                        </div>
                    </div>
                    
                    <button id="btnSaber">Saber mais</button>
                    </div>
                </div>
                </a>
        
                ` 
                }
            }
            document.getElementById('tela').innerHTML = mostra
        }
        
        const ativo = document.getElementById("active");
        const container = document.getElementById("container");


        ativo.addEventListener("click", () => {
            if (container.classList.contains("active")) {
                container.classList.remove("active"); // Se estiver ativo, desativa
            } else {
                container.classList.add("active"); // Se não estiver ativo, ativa
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

// Filtros

// Nome 
var verificarCampoFiltro = setInterval(function() {
    var campoFiltro = document.querySelector("#filtrar-tenis");
    
    if (campoFiltro) {
        // Quando o campo for encontrado, pare o intervalo
        clearInterval(verificarCampoFiltro);

        // Adiciona o evento de input ao campo
        campoFiltro.addEventListener("input", function() {
            var individuos = document.querySelectorAll(".individuo"); // Seleciona todos os elementos com a classe .individuo
            
            for (var i = 0; i < produtos.length; i++) {
                var nomeTenis = produtos[i].Nome.toLowerCase();
                var valorFiltro = this.value.toLowerCase();
                
                var individuo = individuos[i]; // Seleciona o elemento correspondente na lista

                if(individuos[i]){
                    if (nomeTenis.includes(valorFiltro)) {
                    individuo.classList.remove("fadeOut"); // Mostra o produto
                    } else {
                    individuo.classList.add("fadeOut"); // Oculta o produto
                    }
                }
                
            }
        });
    }
}, 100); // Verifica a cada 100ms



