document.addEventListener("DOMContentLoaded", () => {


    ////////////////
    //
    //  Variables
    //
    ////////////////


    let fastFuturesContainer = document.querySelector('.fast-futures_main-container'),
        startPlay = document.querySelector('.fast-futures_start-play'),
        menu_btn =  document.querySelector('.fast-futures_menu_btn'),
        menu_items =  document.querySelectorAll('.fast-futures_menu_item'),
        close_btn =  document.querySelectorAll('.close-btn'),
        withdraw_btn = document.querySelector('.withdraw-btn'),
        menu = document.querySelector('.fast-futures_menu');


    ////////////////
    //
    //  Page elements
    //
    ////////////////

    let pageElements = {
        'default': [
            '.fast-futures_price-board.hidden',
            '.fast-futures_indicator.hidden',
            '.feature-game-slider.hidden',
            '.fast-futures_balance-info.hidden',
            '.fast-futures_buttons.hidden'
        ],
        'percentage': [
            '.fast-futures_price-board.hidden',
            '.fast-futures_indicator.hidden',
            '.feature-game-slider.hidden',
            '.fast-futures_balance-info.hidden',
            '.fast-futures_buttons.hidden'
        ],
        'schedule': [
            '.fast-futures_bet-on-price.hidden',
            '.fast-futures_bottom-info.hidden'
        ],
        'leaderboard': [
            '.fast-futures_leaderboard.hidden',
            '.fast-futures_bottom-info.hidden'
        ],
        'withdraw':[
            '.fast-futures_withdraw.hidden'
        ],
        'withdraw-info':[
            '.response.hidden'
        ]
    };



    ////////////////
    //
    //  Start game
    //
    ////////////////

    startPlay.onclick = () => {

        let p = document.querySelector('.fast-futures_title p');
        fastFuturesContainer.classList.add('game-started');

        menu.style.display = "flex";
        startPlay.style.display = "none";
        p.style.display = "none";

        elementsVisibleControl("default", customFunctionForPage);

    }



    ////////////////
    //
    //  Hide or display elements
    //
    ////////////////

    let elementsVisibleControl = (selectedItemName, callback) => {

        let hideArray = reviewElements( document.querySelectorAll('.fast-futures_game .visible') );

        // hide unnecessary elements
        anime({
            targets: hideArray,
            opacity: [1, 0],
            duration: '100',
            easing: 'easeOutCubic',
            begin: function(anim) {
                anim.animatables.forEach((an)=>{
                    an.target.classList.add('hidden');
                    an.target.classList.remove('visible');
                });
            },
            complete:function() {
                displayElements();
            }
        });

        // display elements
        let displayElements = () => {
            anime({
                targets: pageElements[selectedItemName],
                opacity: [0, 1],
                translateY: [100, 0],
                duration: '200',
                easing: 'easeOutCubic',
                delay: anime.stagger(50),
                begin: function(anim) {
                    anim.animatables.forEach((an)=>{
                        an.target.classList.remove('hidden');
                        an.target.classList.add('visible');
                        jQuery('.feature-game-slider').slick('resize');
                        jQuery('.feature-game-slider').slick('refresh');
                    });
                }
            });
        }

        // slick
        if(selectedItemName==="percentage"){
            jQuery('.feature-game-slider').slick('slickGoTo',1);
        }else {
            jQuery('.feature-game-slider').slick('slickGoTo',0);
        }

        callback(selectedItemName);

    }



    ////////////////
    //
    //  Before display or hide we review if elements already display or hidden
    //
    ////////////////

    let reviewElements = (elements) => {

        let newArray = [];
        let classList = pageElements[currentPage()].join();

        elements.forEach((el)=>{

            const id = el.getAttribute('id');
            const index = classList.indexOf( id );

            if( el.classList.contains('visible') && index < 0 ) newArray.push(el);

        });

        return newArray;

    }


    ////////////////
    //
    //  Get current page
    //
    ////////////////

    let currentPage = () => {

        let selectedItemName = "default";
        let selectedItem = document.querySelector('.fast-futures_menu_item.active');

        if(selectedItem) {
            selectedItemName = selectedItem.getAttribute('data-menu-name');
        }

        return selectedItemName;

    }



    ////////////////
    //
    //  Menu
    //
    ////////////////

    menu_btn.onclick = () => {
        menu.classList.toggle('active');
    }

    menu_items.forEach(( menu_item) => {

        menu_item.onclick = (event) => {
            const Attr = event.currentTarget.getAttribute('data-menu-name');
            if( (Attr != "telegram") && (Attr != "help") ) {
                event.currentTarget.classList.toggle('active');
                unCheckItems(  Attr );
                elementsVisibleControl( currentPage(), customFunctionForPage );
            }
            if(menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }

    })

    close_btn.forEach((close)=>{
        close.onclick = (e) => {

            if(e.target.classList.contains('close-ratio-table')){
                document.querySelector('.fast-futures_menu_item.active').classList.remove('active')
                jQuery('.feature-game-slider').slick('slickGoTo',0);
            }else{
                unCheckItems( "" );
            }

            elementsVisibleControl( 'default', customFunctionForPage );

        }
    });

    let unCheckItems = (selectedItem) => {

        menu_items.forEach(( menu_item) => {
            const Attr = menu_item.getAttribute('data-menu-name');
            if( selectedItem != Attr ) menu_item.classList.remove('active');
        })

    }



    ////////////////
    //
    //  Slick
    //
    ////////////////

    let slickOptions = {
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };
    jQuery('.feature-game-slider').slick(slickOptions);

    window.onresize = () => {
        jQuery('.feature-game-slider').slick('refresh');
    }

    ////////////////
    //
    //  Withdraw
    //
    ////////////////

    withdraw_btn.onclick = () => {

        // here you need to process the withdraw

        document.querySelector('.response').classList.add('success'); // or error
        document.querySelector('.response p').innerHTML = "You placed the bet successfully!";

        elementsVisibleControl( 'withdraw-info', customFunctionForPage );

    }



    ////////////////
    //
    //  Callback after page loading. Update info better in this function
    //
    ////////////////

    let customFunctionForPage = (page) => {
        console.log("callback - "+page);
    }

});