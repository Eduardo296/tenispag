function carregaUMproduto(){
    let imprime
    let tamanhos= ""
    let a = new URLSearchParams(location.search)
    let id = a.get('id')
    produtos = produtos.find (function (elem) {return elem.id == id})
    if(produtos){
            imprime = `
    <div class="main">
      <div class="img">
        <img src="${produtos.img}" id="trocarimg" height="500" width="500">
        <div class="todas">
          <img id="img1" src="${produtos.tumb1}">
          <img id="img2" src="${produtos.tumb2}">
          <img id="img3" src="${produtos.tumb3}">
          <img id="img4" src="${produtos.tumb4}">
        </div>
      </div>
      <div class="conteudo">
        <h2>Sneaker Company</h5>

          <h1>${produtos.Nome}</h1>
          <p>${produtos.descricao}</p>
          <div class="preco">
            <h1 class="din">R$${produtos.Preco}</h1>
            <button>50%</button>
          </div>

          <h3>R$${produtos.Preco * 2}</h3>
            
          <div class="tamanho" id="tam">
          
          </div>

          <p id="frete">${produtos.Frete}</p>
          <div class="resto">
            <div class="bg-group" role="group" aria-label="Basic example">
              
                <div class="background">
                  <div class="tudo">
                  <button class="botao" id="menos">
                    <span>-</span>
                  </button>
                  <button class="botao" id="num">
                    <span>0</span>
                  </button>
                  <button class="botao" id="mais">
                    <span>+</span>
                  </button>
                </div>
                </div>
              
            </div>
            <div class="cart">
              <button type="button" id="btnAdicionar"><i class='bx bx-cart-add' ></i> Add to cart</button>
            </div>
          </div>

      </div>
    </div>
            `
        for (let i = 0; i < produtos.tamanho.length; i++) {
            tamanhos += `
            <button class="clicavel" data-tamanho="${produtos.tamanho[i]}">${produtos.tamanho[i]}</button>
            `;
        }
        
    } else {
        imprime = `<h1> DEU ERRO!!!!!!!!!!********* </h1>`
    }
    document.getElementById('tudo').innerHTML = imprime
    document.getElementById('tam').innerHTML = tamanhos

    let botoesTamanho = document.querySelectorAll('.clicavel');
    botoesTamanho.forEach(function (botao) {
        botao.addEventListener('click', function () {
            let estaMarcado = botao.classList.contains('ativo');

            botoesTamanho.forEach(function (btn) {
                btn.classList.remove('ativo');
                btn.style.color = "";
                btn.style.fontSize = "";
                btn.style.borderRadius = "";
                btn.style.backgroundColor = "";
                btn.style.border = "";
            });

            if (!estaMarcado) {
                botao.classList.add('ativo');
                botao.style.color = "rgb(255, 255, 255)";
                botao.style.fontSize = "22px";
                botao.style.borderRadius = "10px";
                botao.style.backgroundColor = "hsl(26, 100%, 50%)";
                botao.style.border = "1px solid hsl(231, 23%, 94%)";
            }
        });
    });





    const num = document.getElementById('num');
    const maisButton = document.getElementById('mais');
    const menosButton = document.getElementById('menos');

    const updatenum = () => {
        num.innerHTML = count;
    };

    let count = 0;
    let intervalId = 0;

    maisButton.addEventListener('mousedown', () => {
        intervalId = setInterval(() => {
            count += 1;
            updatenum()
        }, 80);
    });
    
    document.addEventListener('mouseup', () => clearInterval(intervalId));

    menosButton.addEventListener('mousedown', () => {
        intervalId = setInterval(() => {
            if (count > 0) { // Verifica se o contador é maior que 0
                count -= 1;
                updatenum()
            }
        }, 80);
    });

    document.addEventListener('mouseup', () => clearInterval(intervalId));

    function img1 (){
        document.getElementById("trocarimg").src = `${produtos.tumb1}`;
    }
    function img2 (){
        document.getElementById("trocarimg").src = `${produtos.tumb2}`;
    }
    function img3 (){
        document.getElementById("trocarimg").src = `${produtos.tumb3}`;
    }
    function img4 (){
        document.getElementById("trocarimg").src = `${produtos.tumb4}`;
    }
    let imagem1 = document.getElementById('img1');
    imagem1.addEventListener('click', img1);
    let imagem2 = document.getElementById('img2');
    imagem2.addEventListener('click', img2);
    let imagem3 = document.getElementById('img3');
    imagem3.addEventListener('click', img3);
    let imagem4 = document.getElementById('img4');
    imagem4.addEventListener('click', img4);



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


    document.getElementById('btnAdicionar').addEventListener('click', async function (event) {
        // Impede o comportamento padrão do botão (recarregar a página)
        event.preventDefault();
    
        // Verifica se algum botão de tamanho está marcado
        if (document.querySelector('.clicavel.ativo')) {
            // Chama a função popup se houver um tamanho selecionado e count for maior que 0
            if (count > 0) {
                await popup(); // Aguarda a função popup completar
                window.location.reload();
            } else {
                alert('Selecione a quantidade antes de adicionar ao carrinho.');
            }
        } else {
            alert('Selecione um tamanho antes de adicionar ao carrinho.');
        }
    });
    
    async function popup() {
        // Criando o objeto a ser enviado ao banco de dados JSON
        const tamanhoSelecionado = document.querySelector('.clicavel.ativo').getAttribute('data-tamanho');
        const dataToPost = {
            img: produtos.img,
            nome: produtos.Nome,
            preco: produtos.Preco,
            quantidade: count,
            tamanho: tamanhoSelecionado
        };
    
        try {
            // Função para enviar os dados via POST
            const response = await fetch('https://frontend-mentor-json.vercel.app/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            });
            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);
    
            // Após enviar, buscar os dados do servidor e exibi-los
            await getAndDisplayData();
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    }
    
}

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

window.onload = function(){
    carregaUMproduto()
    exibePop()
}
