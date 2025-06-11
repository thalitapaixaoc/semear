
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) { window.location.href = url; }
    });

    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display', 'flex');
        } else {
            $("#myBtn").css('display', 'none');
        }
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if ($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }


    if ($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
    }
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
    }

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function () {
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display', 'none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function () {
                if ($(this).css('display') == 'block') {
                    console.log('hello');
                    $(this).css('display', 'none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });

        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function () {
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity', '0');
    });

    $('.js-hide-modal-search').on('click', function () {
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity', '1');
    });

    $('.container-search-header').on('click', function (e) {
        e.stopPropagation();
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click', function () {
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if ($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }
    });

    $('.js-show-search').on('click', function () {
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if ($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }
    });




    /*==================================================================
    [ Cart ] ********** aqui ativa o resumo lateral do carrinho*/
    $('.js-show-cart').on('click', function () {
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function () {
        var numProduct = Number($(this).next().val());
        if (numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function () {
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function () {
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function () {
            var index = item.index(this);
            var i = 0;
            for (i = 0; i <= index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function () {
            var index = item.index(this);
            rated = index;
            $(input).val(index + 1);
        });

        $(this).on('mouseleave', function () {
            var i = 0;
            for (i = 0; i <= rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });

    /*==================================================================
    // [ Show modal1 ]*/
    // $('.js-show-modal1').on('click',function(e){
    //     e.preventDefault();
    //     $('.js-modal1').addClass('show-modal1');
    // });

    $('.js-hide-modal1').on('click', function () {
        $('.js-modal1').removeClass('show-modal1');
    });

    $('.js-show-modal2').on('click', function (e) {
        e.preventDefault();
        $('.js-modal2').addClass('show-modal2');
    });

    $('.js-hide-modal2').on('click', function () {
        $('.js-modal2').removeClass('show-modal2');
    });
})(jQuery);

// Funções de validação de formulários

function validarEmail(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    let emailContent = emailInput.value;
    let conteudo = document.querySelector('#validacao-email');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(emailContent))
        conteudo.innerHTML = "Insira um email válido";
    else {
        conteudo.innerHTML = "";
        emailInput.value = '';
        alert("Inscrição efetuada com sucesso.");
    }
}

function validarFormContato() {
    let nome = document.querySelector('#contact #nomeContact');
    let email = document.querySelector('#contact #emailContact');
    let msg = document.querySelector('#contact #msgContact');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome.value)
        nome.classList.add('border', 'border-danger');
    else
        nome.classList.remove('border', 'border-danger');

    if (!regex.test(email.value))
        email.classList.add('border', 'border-danger');
    else
        email.classList.remove('border', 'border-danger');
    if (!msg.value)
        msg.classList.add('border', 'border-danger');
    else
        msg.classList.remove('border', 'border-danger');
}

function validaLogin() {
    let email = document.querySelector('#formlogin #email');
    let senha = document.querySelector('#formlogin #password');
    let conteudoEmail = document.querySelector('#formlogin #emailFormLogin');
    let conteudoSenha = document.querySelector('#formlogin #pswFormLogin');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email.value) && senha.value) {
        window.location.href = "./minhaconta.html";
    } else {
        if (!regex.test(email.value)) {
            email.classList.add('border', 'border-danger');
            conteudoEmail.innerHTML = "Insira um email válido";
        } else {
            conteudoEmail.innerHTML = "";
            email.classList.remove('border', 'border-danger');
        }

        if (!senha.value) {
            senha.classList.add('border', 'border-danger');
            conteudoSenha.innerHTML = "Insira uma senha";
        } else {
            conteudoSenha.innerHTML = "";
            senha.classList.remove('border', 'border-danger');
        }
    }
}

function resetSenha() {
    let email = document.querySelector('#formlogin #email');
    let conteudoEmail = document.querySelector('#formlogin #emailFormLogin');

    if (!email.value) {
        email.classList.add('border', 'border-danger');
        conteudoEmail.innerHTML = "Insira um email válido";
    } else {
        alert("Um email foi enviado para " + email.value + " com instruções para redefinir sua senha.");
        email.classList.remove('border', 'border-danger');
        conteudoEmail.innerHTML = "";
        window.location.href = "../index.html";
    }
}

function finalizarCompra() {

    if (compra()) {
        Swal.fire({
            icon: "success",
            title: "Pedido finalizado com Sucesso",
            timer: 15000,
            timerProgressBar: true,
            customClass: {
                confirmButton: 'btn-success'
            }
        });
    }
}

function compra() {
    let cidade = document.querySelector('#formCompra #cidade');
    let cep = document.querySelector('#formCompra #cep');
    let contCidade = document.querySelector('#formCompra #spanCdd');
    let contCep = document.querySelector('#formCompra #spanCEP');
    let estado = document.querySelector('#formCompra #estado');

    if (!estado.value) {
        const estadoWrapper = document.querySelector('.rs2-select2');
        estadoWrapper.classList.add('border', 'border-danger');
        const existingValidationMessage = document.querySelector('#estado-validacao');
        if (existingValidationMessage) {
            existingValidationMessage.remove();
        }
        estadoWrapper.insertAdjacentHTML('afterend', '<span id="estado-validacao" class="text-danger">Informe um estado</span>');
    }
    else {
        const estadoWrapper = document.querySelector('.rs2-select2');
        estadoWrapper.classList.remove('border', 'border-danger');
        const existingValidationMessage = document.querySelector('#estado-validacao');
        if (existingValidationMessage) {
            existingValidationMessage.remove();
        }
    }

    if (!cidade.value) {
        cidade.classList.add('border', 'border-danger');
        contCidade.innerHTML = 'Informe uma cidade';
    } else {
        cidade.classList.remove('border', 'border-danger');
        contCidade.innerHTML = '';
    }
    if (!cep.value) {
        cep.classList.add('border', 'border-danger');
        contCep.innerHTML = 'Informe um CEP';
    } else {
        cep.classList.remove('border', 'border-danger');
        contCep.innerHTML = '';
    }
    return cidade.value && cep.value && estado.value;
}

/* */
