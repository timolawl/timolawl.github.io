/* ***********************************************
 * This segment if I don't use liquid templating *
 *************************************************
 *
if(window.location.pathname == "/") {
    // show home logo
    $('.logo--basic').toggleClass('is-hidden');
    $('.logo--at-home').toggleClass('is-hidden');

    //show hover logo on hover
    $('.site__title').on(
       'mouseenter', function() {
            $('.logo--at-home').addClass('is-hidden');
            $('.logo--hover').removeClass('is-hidden');
    },
        'mouseleave', function() {
            $('.logo--at-home').removeClass('is-hidden');
            $('.logo--hover').addClass('is-hidden');
    });
}
else {
    //show hover logo from a page other than home (swap out default logo)
    $('.site__title').on(
       'mouseenter', function() {
            $('.logo--basic').addClass('is-hidden');
            $('.logo--hover').removeClass('is-hidden');
    },
        'mouseleave', function() {
            $('.logo--basic').removeClass('is-hidden');
            $('.logo--hover').addClass('is-hidden');
    });
}
*/

/*********************************************************************
* JS implementation of site logo hover effects                       *
* Pros: Better for things that require more control + content stuff  *
* Cons: jQuery library overhead ~ currently 150 - 400ms              *
**********************************************************************/
/*
$('.site__title').on('mouseenter', function () {
    $('.logo--hover').toggleClass('is-hidden');
    if(window.location.pathname === "/") {
        $('.logo--at-home').toggleClass('is-hidden');
    }
    else {
        $('.logo--basic').toggleClass('is-hidden');
    }
}).on('mouseleave', function () {
    $('.logo--hover').toggleClass('is-hidden');
    if(window.location.pathname === "/") {
        $('.logo--at-home').toggleClass('is-hidden');
    }
    else {
        $('.logo--basic').toggleClass('is-hidden');
    }
});
*/
