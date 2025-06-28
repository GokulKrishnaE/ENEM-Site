$(document).ready(function () {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let containerWidth = 0;
    const triggerOffset = 30; // user can swipe up to width - 30px
    const triggerThresholdPercent = 0.55; // trigger after 55% swipe

    $('.headerSocialLinks ul li i').on('touchstart', function (event) {
        startX = event.originalEvent.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        containerWidth = $(this).parent().outerWidth();
        $(this).css('transition', 'none');
    });

    $('.headerSocialLinks ul li i').on('touchmove', function (event) {
        if (!isDragging) return;

        currentX = event.originalEvent.touches[0].clientX;
        let diffX = currentX - startX;

        if (diffX > 0) {
            const maxSwipe = containerWidth - triggerOffset;
            diffX = Math.min(diffX, maxSwipe);
            $(this).css('left', diffX + 'px');
        }
    });

    $('.headerSocialLinks ul li i').on('touchend touchcancel', function () {
        if (!isDragging) return;
        isDragging = false;

        const $icon = $(this);
        let diffX = currentX - startX;
        const url = $icon.closest('li').data('url'); // make sure you're using data-url in HTML
        const maxSwipe = containerWidth - triggerOffset;
        const triggerThreshold = containerWidth * triggerThresholdPercent;

        $icon.css('transition', 'left 0.3s ease');

        if (diffX >= triggerThreshold) {
            // If user swipes 55% or more, trigger
            if (url) window.open(url, '_blank');
        }

        // Always reset back to 0
        $icon.css('left', '30px');
    });
     // Hamburger menu (if needed)
    $('.hamburger').click(function () {
        $('.header-links').toggleClass('active');
        $(this).toggleClass('active');
        $('html').toggleClass('overflow-hidden');
    });
    $('#scrollTopButton').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600); // 600ms animation duration
    });

    const scrollBtn = $('#scrollTopButton');
    scrollBtn.hide();

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height()) {
        scrollBtn.fadeIn();
        } else {
        scrollBtn.fadeOut();
        }
    });

});

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');  // Animate in
      } else {
        entry.target.classList.remove('visible'); // Animate out
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));
});