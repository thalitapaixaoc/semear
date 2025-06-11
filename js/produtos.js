document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');

    try {
        const data = await fetchData(); 
        window.produtos = data.produtos;

        let produtos = data.produtos;
        const servicos = data.servicos;

        // Mostrando apenas uma parte dos produtos na página inicial
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            const sementes = produtos.filter(produto => produto.categoria === 'Sementes').slice(0, 6);
            const defensivosAgricolas = produtos.filter(produto => produto.categoria === 'Defensivos-Agricolas').slice(0, 2);
            produtos = [...sementes, ...defensivosAgricolas];
        }

        // Renderiza os produtos
        produtos.forEach(produto => {
            const productHTML = `
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${produto.categoria.toLowerCase()}">
                    <div>
                        <div class="hov-img0">
                            <img src="${produto['imagem-principal']}" alt="${produto.nome}" class="product-img">
                        </div>
                        <div class="d-flex p-t-14 justify-content-between align-items-center">
                            <div>
                                <a href="#" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6 d-block">${produto.nome}</a>
                                <span class="stext-105 cl3">${produto.preco}</span>
                            </div>
                            <div>
                                <a href="#" class="flex-c-m stext-103 cl0 size-102 bg3 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" data-produto-id="${produto.id}">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.insertAdjacentHTML('beforeend', productHTML);
        });

        // Renderiza os serviços
        servicos.forEach(servico => {
            const serviceHTML = `
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item service">
                    <div>
                        <div class="hov-img0">
                            <img src="${servico['imagem-principal']}" alt="${servico.nome}" class="product-img">
                        </div>
                        <div class="d-flex p-t-14 justify-content-between align-items-center">
                            <div>
                                <a href="#" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6 d-block">${servico.nome}</a>
                                <span class="stext-105 cl3">${servico.preco}</span>
                            </div>
                            <div>
                                <a href="/pages/contact.html" class="flex-c-m stext-103 cl0 size-102 bg3 bor2 hov-btn1 p-lr-15 trans-04">Consulte</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.insertAdjacentHTML('beforeend', serviceHTML);
        });

        addFilter();

        document.querySelectorAll('.js-show-modal1').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Obtém os dados do produto
                const produtoId = this.getAttribute('data-produto-id');
                const produto = window.produtos.find(p => p.id == produtoId);
                if (!produto) {
                    console.error('Produto não encontrado:', produtoId);
                    return;
                }

                const modal = document.getElementById('produto-modal');
                const modalName = document.getElementById('modal-product-name');
                const modalPrice = document.getElementById('modal-product-price');
                const modalDescription = document.getElementById('modal-product-description');

                // Atualiza o conteúdo do modal
                modalName.textContent = produto.nome;
                modalPrice.textContent = produto.preco;
                modalDescription.textContent = produto.descricao;
                updateGalleryImages(produto.imagens);

                // Exibe o modal
                modal.classList.add('show-modal1');
            });
        });

    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
    function updateGalleryImages(images) {
        destroySlickGallery();
        const gallery = document.getElementById('modal-gallery-product');
        gallery.innerHTML = ''; // Limpa a galeria existente

        images.forEach(image => {
            let templateHtml = `
            <div class="item-slick3" data-thumb="${image}">
                <div class="wrap-pic-w pos-relative">
                    <img src="${image}" alt="Imagem do produto">
                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                        href="${image}">
                        <i class="fa fa-expand"></i>
                    </a>
                </div>
            </div>`;

            gallery.insertAdjacentHTML('beforeend', templateHtml);
        });

        updateSlickGallery();
    }

    function destroySlickGallery() {
        const slickWrapper = $('.wrap-slick3');
        const slickInstance = slickWrapper.find('#modal-gallery-product');
        slickInstance.slick('unslick');
    }

    function updateSlickGallery() {
        const slickWrapper = $('.wrap-slick3');
        const slickInstance = slickWrapper.find('#modal-gallery-product');

        slickWrapper.find('.wrap-slick3-dots').empty();
        slickWrapper.find('.wrap-slick3-arrows').empty();

        slickInstance.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 6000,

            arrows: true,
            appendArrows: slickWrapper.find('.wrap-slick3-arrows'),
            prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',

            dots: true,
            appendDots: slickWrapper.find('.wrap-slick3-dots'),
            dotsClass: 'slick3-dots',
            customPaging: function (slick, index) {
                var portrait = $(slick.$slides[index]).data('thumb');
                return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
            },
        });
    }

    function addFilter() {
        /*==================================================================
 [ Isotope ]*/
        var $topeContainer = $('.isotope-grid');
        var $filter = $('.filter-tope-group');

        // filter items on button click
        $filter.each(function () {
            $filter.on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $topeContainer.isotope({ filter: filterValue });
            });

        });

        // init Isotope
        $(window).on('load', function () {
            var $grid = $topeContainer.each(function () {
                $(this).isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows',
                    percentPosition: true,
                    animationEngine: 'best-available',
                    masonry: {
                        columnWidth: '.isotope-item'
                    }
                });
            });
        });

        var isotopeButton = $('.filter-tope-group button');

        $(isotopeButton).each(function () {
            $(this).on('click', function () {
                for (var i = 0; i < isotopeButton.length; i++) {
                    $(isotopeButton[i]).removeClass('how-active1');
                }

                $(this).addClass('how-active1');
            });
        });

    }
});
