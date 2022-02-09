$(function() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "formselectwrap":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        // first item is a placeholder
        a.classList.toggle("placeholder-value", selElmnt.selectedIndex == 0);
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, selectInput, h, sl, yl;
                selectInput = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = selectInput.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (selectInput.options[i].innerHTML == this.innerHTML) {
                        selectInput.selectedIndex = i;
                        selectInput.dispatchEvent(new Event('change'));
                        h.innerHTML = this.innerHTML;
                        h.classList.toggle("placeholder-value", h.selectedIndex == 0);
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

});

/**
 * carousel setup
 */
$(function() {
    if ($('.owl-carousel').length > 0) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 25,
            responsiveClass: true,
            autoplay: false,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 40
                },
                720: {
                    items: 3,
                    stagePadding: 60
                },
                1050: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        })
    }
});


/**
 * File picker
 */
$(function() {
    $('#attachment-file-input').on('change', function(e) {
        $('.attachment-file-name').text(this.files[0].name)
    });

    $('.chose-attachment-file-btn').on('click', function(e) {
        e.preventDefault();
        $("#attachment-file-input").click();
    })
})


/*
 DO NOT USER THIS CODE IN THE REAL PROJECT
 It handles ?rtl=true query param for testing rtl.
*/
$(function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.rtl == 'true') {
        $('html').attr('lang', 'ar');
        $('html').attr('dir', 'rtl');

        $('link[rel=stylesheet]').each(function() {
            console.log(this);
            this.disabled = true;
        });

        $('head').append('<link rel="stylesheet" href="css/bootstrap.rtl.min.css">');
        $('head').append('<link rel="stylesheet" href="css/style.css"></link>');
    }
});


/**
 * Navbar toggler
 */
$(function() {
    var menuToggler = document.querySelector('.navbar .dropdown-toggle');
    var navbar = document.querySelector('.navbar');
    if (!navbar || !menuToggler) return;

    menuToggler.addEventListener('shown.bs.dropdown', function () {
        navbar.classList.add('menu-visible')
    });

    menuToggler.addEventListener('hidden.bs.dropdown', function () {
        navbar.classList.remove('menu-visible')
    });
});

/**
 * Search controller
 */
 $(function() {
    var searchForm = $(".search-form");
    var url = searchForm.attr('data-url');
    if (!searchForm.length || !url) {
        return;
    }

    searchForm.find("#query").autocomplete({
        serviceUrl: url,
        paramName: 'q',
        type: "GET",
        onSelect: function(keyword) {
            window.location.href = `search-result.html?q=${keyword}`;
        },
        transformResult: function(response) {
            console.log(response);
            response = JSON.parse(response);
            return {
                suggestions: response
            }
        },
        minChars: 2,
        showNoSuggestionNotice: true
    });

    $(".search-form").on("submit",function(a) {
        a.preventDefault();
        var query = $(this).find('#query').val().trim()
        if (query) {
            window.location.href = `search-result.html?q=${query}`;
        }
        return false;
    })
});