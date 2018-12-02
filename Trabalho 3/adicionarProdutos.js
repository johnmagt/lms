let listaProdutos = [
    {
        nome: 'RELÓGIO ARMANI EXCHANGE MASCULINO',
        valor: 675,
        id: 01,
        imagem: 'relogio1.jpg',
    },
    {
        nome: 'RELÓGIO ARMANI EXCHANGE MASCULINO',
        valor: 498,
        id: 02,
        imagem: 'relogio2.jpg',
    },
    {
        nome: 'RELÓGIO ARMANI EXCHANGE MASCULINO',
        valor: 678,
        id: 03,
        imagem: 'relogio3.jpg',
    },
    {
        nome: 'KIT RELÓGIO CHAMPION MASCULINO',
        valor: 219,
        id: 04,
        imagem: 'relogio4.jpg',
    },
    {
        nome: 'RELÓGIO CLUSE LA BOHEME',
        valor: 319,
        id: 05,
        imagem: 'relogio5.jpg',
    },
    {
        nome: 'RELÓGIO CASIO',
        valor: 159,
        id: 06,
        imagem: 'relogio6.jpg',
    },
    {
        nome: 'RELÓGIO MICHAEL KORS FEMININO',
        valor: 849,
        id: 07,
        imagem: 'relogio7.jpg',
    },
    {
        nome: ' RELÓGIO MICHAEL KORS FEMININO ACESS SOFIE ROSE',
        valor: 949,
        id: 08,
        imagem: 'relogio8.jpg',
    }
];

$(function () {

    $cardsProdutos = $("#cards-produtos");

    function adicionarProdutos() {
        $cardsProdutos.html("");
        for (let i = 0, len = listaProdutos.length; i < len; i++) {
            adicionarProduto(listaProdutos[i]);
        }
    }

    function adicionarProduto(produto) {
        let card = [
            '<div class = "col-sm-3" id="produto' + produto.id + '">',
                '<article class = "col-item" >',
                    '<div class = "photo">',
                        '<form class = "form carrinho"role = "form" >',
                            '<div class = "options" >',
                                '<input type = "number" class = "form-control input-sm quantidade "value = "1" min = "1" >',
                            '</div>',
                            '<div class = "options-cart" >',
                                '<button class = "btn btn-default item-carrinho" title = "Add to cart" >',
        					       '<span class = "fa fa-shopping-cart " >', '</span>',
        				        '</button>',
                            '</div>',
                        '</form>',
                        '<a href = "#" >',
                            '<img src = "img/' + produto.imagem + ' " class = "img-responsive", alt = "Product Image"/>',
                        '</a>',
                    '</div>',
                    '<div class = "info" >',
                        '<div class = "row" >',
                            '<div class = "price-details col-md-6" >',
                                '<p class = "details" >' + produto.nome + '</p>',
                                '<span class = "price-new">R$' + produto.valor + ',00</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</article>',
            '</div>'
        ].join('');

        $cardsProdutos.append(card);

        $("form", "#produto" + produto.id).submit(function () {
            let quantidade = $("input", this).val();
            quantidade = parseInt(quantidade);
            adicionarCarrinho(produto, quantidade);
            mostrarProdutosCarrinho();
            return false;
        });
    }


    adicionarProdutos();
});
