const produtos = [
{
    nome:"Revelry",
    descricao: "Perfume com toque amadeirado marcante." ,
    preco: 250.00,
    categoria: "Amadeirado",
    imagem:"img/Amadeirado.jpg"
},


{
    nome:"Chanel",
    descricao: "Perfume citrico com toque suave que deixa marcado o dia todo." ,
    preco: 300.00,
    categoria: "Citrico",
    imagem:"img/Cítrico.jpg"
},

{
    nome:"Bvlgari - Rose Goldea",
    descricao: "Perfume com notas adocicadas, perfeito para usar a noite." ,
    preco: 200.00,
    categoria: "Doce",
    imagem:"img/Doce.jpg"
},

{
    nome:"Solare",
    descricao: "Perfume Arabe intenso com forte presença e um toque de especiárias." ,
    preco: 400.00,
    categoria: "Arabe",
    imagem:"img/Arabe.jpg"
},

{
    nome: "Fire in the Dark",
    descricao: "Perfume com toque amadeirado marcante." ,
    preco: 300.00,
    categoria: "Amadeirado",
    imagem:"img/Amadeirado2.jpg"
},

{
    nome:"Cedrát",
    descricao: "Perfume citrico com toque suave que deixa marcado o dia todo." ,
    preco: 300.00,
    categoria: "Citrico",
    imagem:"img/Cítrico2.jpg"
},

{
    nome:"Miss Dior",
    descricao: "O verdadeiro aroma do luxo." ,
    preco: 400.00,
    categoria: "Doce",
    imagem:"img/Doce2.jpg"
},

{
    nome:"Chanel",
    descricao: "Notas florais que refrescam o dia." ,
    preco: 280.00,
    categoria: "Floral",
    imagem:"img/Floral3.jpg"
},

{
    nome:"Narciso Rodriguez",
    descricao: "Notas florais que refrescam o dia." ,
    preco: 320.00,
    categoria: "floral",
    imagem:"img/Floral4.jpg"
},

];


let carrinho = [];

// Pega todos os botões de adicionar ao carrinho da página
const botoesCarrinho = document.querySelectorAll('.btn-carrinho');

// Para cada botão, adiciona um evento de clique
botoesCarrinho.forEach(function(botao) {
    botao.addEventListener('click', function() {

        // Encontra o card do produto correspondente ao botão clicado
        const  card = botao.closest('.card');
        
        // Pega o texto do preço e converte para número (ex: "R$ 250,00" vira 250.00)
        const precoTexto = card.querySelector('.preco').innerText;
        const precoNumero = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));

        // Pega o nome do produto que está guardado no atributo data-nome do HTML
        const nome = card.dataset.nome;

        // Adiciona o produto (nome e preço) dentro da lista/array do carrinho
        carrinho.push ({ nome: nome, preco: precoNumero });

        // Chama a função para atualizar o painel visual do carrinho
        atualizarCarrinho(); 

        // Mostra o carrinho no console do navegador para conferência
        console.log(carrinho); 
    
    })
})

// Seleciona os elementos de busca e os cards de produtos na tela
const inputBusca = document.getElementById('busca');
const cards = document.querySelectorAll('.card');
const selectCategoria = document.getElementById('filtroCategoria');

// Função principal que filtra os produtos por nome e categoria
function aplicarFiltros() {

    // Pega o que foi digitado na busca e passa para letras minúsculas
    const termo = inputBusca.value.toLowerCase();

    // Pega a categoria selecionada no select
    const categoria = selectCategoria.value;
    const mensagemVazia = document.getElementById('mensagemVazia');

    let contador = 0; // Conta quantos produtos correspondem ao filtro

    // Olha cada card de produto para ver se deve aparecer ou sumir
    cards.forEach(function(card) {
        const nome = card.dataset.nome.toLowerCase();
        const categoriaCard = card.dataset.categoria;

        // Verifica se o nome bate com a busca e se a categoria confere
        const bateNome = nome.includes(termo);
        const bateCategoria = categoria === 'todos' || categoriaCard === categoria;

        // Se bater os dois, mostra o card e soma no contador; senão, esconde
        if (bateNome && bateCategoria) {
            card.style.display = '';
            contador++;
            
        }else {
            card.style.display = 'none';
        }
    })

        // Se nenhum produto passou pelo filtro, mostra a mensagem de "nenhum encontrado"
        if (contador === 0) {
            mensagemVazia.style.display = '';
    }   else {
            mensagemVazia.style.display = 'none';
}
}

// Ouve quando o usuário digita na busca ou muda a categoria para rodar o filtro
inputBusca.addEventListener('input', aplicarFiltros);
selectCategoria.addEventListener('change', aplicarFiltros);


// Função para redesenhar o carrinho na tela e recalcular os valores
function atualizarCarrinho() {
    document.getElementById('contadorCarrinho').innerHTML = carrinho.length;

    // Atualiza a quantidade de itens no ícone do topo
    const listacarrinho = document.getElementById('listaCarrinho');
    listacarrinho.innerHTML = '';

    // Cria o HTML de cada item dentro da lista do painel lateral
    carrinho.forEach(function(item) {
        listacarrinho.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;

    });

    // Soma o preço de todos os itens do carrinho para achar o valor total
    let total = 0;
    carrinho.forEach(function(item) {
        total += item.preco;
    })

    // Exibe o preço total formatado na tela
    document.getElementById('totalCarrinho').innerHTML = 'Total: R$ ' + total.toFixed(2);
}

// Seleciona os elementos que abrem e fecham o painel lateral do carrinho
const iconeCarrinho = document.getElementById('iconeCarrinho');
const painelCarrinho = document.getElementById('painelCarrinho');
const botaoFechar = document.getElementById('fecharCarrinho');

// Alterna entre mostrar ou esconder o painel ao clicar no ícone do carrinho
iconeCarrinho.addEventListener('click', function(){
    if (painelCarrinho.style.display === 'block') {
        painelCarrinho.style.display = 'none';
    } else {
        painelCarrinho.style.display = 'block';
    }
})

//Fechar o carrinho clicando no x
botaoFechar.addEventListener('click', function(){
    painelCarrinho.style.display = 'none';
});

// Seleciona o botão de limpar carrinho
const btnLimparCarrinho = document.getElementById('btnLimparCarrinho');

// Adiciona o evento de clique para esvaziar o array e atualizar a tela
btnLimparCarrinho.addEventListener('click', function() {
    carrinho = []; // Esvazia a lista do carrinho
    atualizarCarrinho(); // Atualiza a visualização (zera o contador e o total)
});