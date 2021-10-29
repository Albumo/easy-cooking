$(document).ready(function () {
    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 50) {
            $('.js-header').addClass('is-scroll');
        } else {
            $('.js-header').removeClass('is-scroll');
        }
    });


    $('.popup-btn').click(function () {
        $('.popup').addClass('open');
    });

    $('.js-close').click(function () {
        $('.popup').removeClass('open');
    });

    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')

        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 120
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(':focus')) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });

    $('.nav__menu a').bind('click', function (e) {
        if ($('.nav__checkbox:checked')) {
            $('.nav__checkbox').prop('checked', false);
        }
    });
});

var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
    autoAlpha: 1, y: -40, ease: Expo.inOut, paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    for (var i = 0, count = arrInput.length; i < count; i++) {
        arrInput[i].classList.remove('inputerror');
    }
    event.target.querySelector('button').disabled = true;
    showMsg('Wait. Sending...', '#b1b1b1');
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
        event.target.querySelector('button').disabled = false;
        if (req.status >= 200 && req.status < 400) {
            const json = JSON.parse(this.response);
            if (json.result === 'success') {
                showMsg('Message send', '#36AE46', '1000');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                event.target.reset();
            } else if (json.result === 'email') {
                showMsg('Error. Need email', '#DC352F');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                document.querySelector('#email').classList.add('inputerror');
            }
        } else {
            showMsg('Server error. number: ' + req.status, '#DC352F');
            setTimeout(function () {
                document.getElementsByClassName('msg')[0].style.opacity = '0';
            }, 2000);
        }
    };

    req.onerror = function () {
        showMsg('Error sending request', '#DC352F');
    };
    req.send(new FormData(event.target));
}

function showMsg(message, color) {
    msg.innerText = message;
    msg.style.background = color;
    gsapMsg.restart();
}

function inputFile(e) {
    var el = e.target.parentNode.querySelector('.count');
    if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;
    else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].addEventListener('focus', function () {
        this.nextElementSibling.classList.add('active');
    });
    arrInput[i].addEventListener('blur', function () {
        if (this.value === false) { this.nextElementSibling.classList.remove('active'); }
    });
}

window.onload = function () {
    var loadPage = gsap.timeline();
    loadPage.to('#form', 0.7, { autoAlpha: 1, y: 0, ease: Expo.inOut });
    loadPage.to('.link', 0.7, { autoAlpha: 1, y: 0, ease: Expo.inOut }, 0);
    loadPage.to('.input-wrap', 0.5, {
        stagger: 0.15, autoAlpha: 1, y: 0, ease: Expo.inOut
    }, 0.35);
    loadPage.to('.file-wrap, .button', 0.5, {
        stagger: 0.15, autoAlpha: 1, x: 0, ease: Expo.inOut
    }, 0.6);
};
