$('.hamburger').click(function (e) { 
    $('.header-links').toggleClass('active')
    $(this).toggleClass('active')
    $('html').toggleClass('overflow-hidden')
})