$(function() {

    var os = $.client.os;

    if (os == "Mac") {
    } else {
        window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false; }
    };
    


    $('.google-search').on('tap', function(){
        document.location.reload(true);
    })


  // elements
    var launcherRow = $('.launcher-screen-row'),
        minueOne = $('#minus1'),
        homeIconRow = $('.home-icons-wrapper'),
        navButtonRow = $('.nav-buttons-wrapper');

    setInterval(formatDate, 1000);

    populateNotifications();

    //=================== update widget time ===========

    // open apps on home page
    $("#google-container").on('tap', function(){
        $('.googlefolder-container').addClass('open-folder');
    })


    setScrollerWidth("noedit");
    // initialize the page scroller
    setPageScroll();



   var goFS = document.getElementById("header");

   goFS.addEventListener("click", function() {
        goFS.style.backgrounColor="red"
        document.body.webkitRequestFullscreen();

   }, false);

   $(window).bind('fullscreen', function(ev, is_fullscreen){

    });

    // HIDE HOME BUTTONS 

    // var wl= getWidgetsLength();
    // $('#widget-scroller').css('height', wl+'px');
    
    setWidgetScroll();

 // ====================
 window.addEventListener('devicelight', function(event) {
    console.log("event.value is: ", event.value)

var bodyBg= document.body.style;

//event.value is the lux value returned by the sensor on the device
if (event.value < 100) {

alert('Hey, you! You are working in a dark environment');

bodyBg.backgroundColor="lightgrey";

} else {

bodyBg.backgroundColor="#fff";

}

});

 // ===================== EUI APPS TAPPED TO ADD TO THE RECENT
    
    // code dealwith add an recentapp card
    //data-qa-recentapps="weather"
    $('.qa-recentapps').on("tap", function(){
        var appName = $(this).attr('data-qa-recentapps')
        console.log("The appName is: ", appName)
        if ($.inArray(appName, recentOpenedApps) != -1){
            // console.log("The appName is already in the array")
        } else {
            recentOpenedApps.push($(this).attr('data-qa-recentapps'));
        }
        $('.quickaccess-app-container').addClass('open-quickaccess-app');
        $('.quickaccess-app-container p').text(appName)
        console.log('The recent apps are: ', recentOpenedApps);
        console.log("after click twice: ", $.inArray(appName, recentOpenedApps))
    })
// =========== OPEN QUICK ACCESS PANEL ===================

    // Initialize the variables
    var recentAppPanels,
        recentAppPanelsNo,

        myvar;

    // for adding new recent app panels, initialized with 6 apps
    var recentOpenedApps = [];



    // The top margin arrays of different number of recent apps when open  
    var cardsMargins1 = [125],
        cardsMargins2 = [125, 283],
        cardsMargins3 = [125, 283, 472],
        cardsMargins4 = [78, 150, 327, 517],
        cardsMargins5 = [46, 77, 150, 327, 519],
        cardsMargins6 = [26, 46, 77, 150, 327, 519],
        cardsMargins7 = [17, 26, 46, 77, 150, 327, 519],
        cardsMargins8 = [17, 17, 26, 46, 77, 150, 327, 519];
        cardsMargins9 = [17, 17, 17, 26, 46, 77, 150, 327, 519];
        cardsMargins10 = [17, 17, 17, 17, 26, 46, 77, 150, 327, 519];

    var cardsFinalMargins1  = [125],
        cardsFinalMargins2 = [125, 284],
        cardsFinalMargins3 = [125, 283, 472],
        cardsFinalMargins4 = [125, 283, 472, 662],
        cardsFinalMargins5 = [125, 283, 472, 662, 852],
        cardsFinalMargins6 = [125, 283, 472, 662, 852, 1042],
        cardsFinalMargins7 = [125, 283, 472, 662, 852, 1042, 1232],
        cardsFinalMargins8 = [125, 283, 472, 662, 852, 1042, 1232, 1422],
        cardsFinalMargins9 = [125, 283, 472, 662, 852, 1042, 1232, 1422, 1612],
        cardsFinalMargins10 = [125, 283, 472, 662, 852, 1042, 1232, 1422, 1612, 1802];

    var reverseCardsMargins1 = [125],
        reverseCardsMargins2 = [135, 300],
        reverseCardsMargins3 = [74, 133, 300],
        reverseCardsMargins4 = [43, 72, 135, 252],
        reverseCardsMargins5 = [25, 43, 72, 135, 252],
        reverseCardsMargins6 = [16, 24, 44, 72, 136, 252],
        reverseCardsMargins7 = [16, 16, 24, 44, 72, 136, 252],
        reverseCardsMargins8 = [16, 16, 16, 24, 44, 72, 136, 252],
        reverseCardsMargins9 = [16, 16, 16, 16, 24, 44, 72, 136, 252],
        reverseCardsMargins10 = [16, 16, 16, 16, 16, 24, 44, 72, 136, 252];

    var initialMargins = [],
        updatedMargins = [],
        finalMargins = [],
        reserveCardsFinalMargins = [];
    //var reserveFinalMargins = [16,24,44,72,136,252]

    var topMargin = 0;

    //Initially set up the cards
    $('#hardware-controlpanel').on('tap', function(){
        $('.quickaccess-app-container').removeClass('open-quickaccess-app');
        $('.quickaccess-app-container p').text('')
        $('.quickaccess-container').addClass('open-quickaccess');
        // Add Mock Recently opened apps to the quick access panel
        for (var i=0; i< recentOpenedApps.length; i++) {
            $('.quickaccess-container').prepend("<div class='quickacess-panel' id='qa-"+ recentOpenedApps[i] + "'><h2>"+ recentOpenedApps[i] +"</h2> </div>")
        }
        // once the newly opend apps got added to the panels, empty the recentOpenedApps array
        recentOpenedApps=[];
        //query the opened recent app cards number
        recentAppPanels = $('.quickacess-panel');
        recentAppPanelsNo = $('.quickacess-panel').length;
        //console.log("after open the quick access container, number of apps are: ", recentAppPanelsNo);
        setupInitialTopMargins(recentAppPanelsNo);
        setupUpdatedMargins(recentAppPanelsNo);
        setupFinalMargins(recentAppPanelsNo);
        getReverseFinalMargins(recentAppPanelsNo);

        //console.log("The initial margins are: ", initialMargins, " The updatedMargins are: ", updatedMargins, " The final margins are: ", finalMargins, " The reversed final margins are: ", reserveCardsFinalMargins)
        // setting up the initial top margin the size
        for (var i=0; i < recentAppPanels.length; i++) {
            var pscale= (4.251 * Math.log(initialMargins[i]) + 63.301) * 0.01;
            var pwidth = 412 * pscale;
            var pheight = 460 * pscale;
            var pmarginLeft = pmarginRight = (412 - pwidth) / 2;
            if (i !== recentAppPanels.length -1) {
                $(recentAppPanels[i]).css({'margin-top': initialMargins[i]+'px', 'width':pwidth + 'px', 'height':pheight + 'px','margin-left': pmarginLeft+'px'});
            } else {
                //if it is the last card aka the quick access card then retains its original size (no scaling of the card size)
                $(recentAppPanels[i]).css({'margin-top': initialMargins[i]+'px'})
            }

        }
    });


    function setupInitialTopMargins(cn) {
        switch (cn) {
            case 1:
            initialMargins = cardsMargins1;
            break;
            case 2:
            initialMargins = cardsMargins2;
            break;
            case 3:
            initialMargins = cardsMargins3;
            break;
            case 4:
            initialMargins = cardsMargins4;
            break;
            case 5:
            initialMargins = cardsMargins5;
            break;
            case 6:
            initialMargins = cardsMargins6;
            break;
            case 7:
            initialMargins = cardsMargins7;
            break;
            case 8:
            initialMargins = cardsMargins8;
            break;

            default:
            //Statements executed when none of the values match the value of the expression
            break;
        }
    }

    function setupUpdatedMargins(cn) {  
        switch (cn) {
            case 1:
            updatedMargins = cardsMargins1;
            break;
            case 2:
            updatedMargins = cardsMargins2;
            break;
            case 3:
            updatedMargins = cardsMargins3;
            break;
            case 4:
            updatedMargins = cardsMargins4;
            break;
            case 5:
            updatedMargins = cardsMargins5;
            break;
            case 6:
            updatedMargins = cardsMargins6;
            break;
            case 7:
            updatedMargins = cardsMargins7;
            break;
            case 8:
            updatedMargins = cardsMargins8;
            break;

            default:
            //Statements executed when none of the values match the value of the expression
            break;
        }
    }

    function setupFinalMargins(cn) {
        switch (cn) {
            case 1:
            finalMargins = cardsFinalMargins1;
            break;
            case 2:
            finalMargins = cardsFinalMargins2;
            break;
            case 3:
            finalMargins = cardsFinalMargins3;
            break;
            case 4:
            finalMargins = cardsFinalMargins4;
            break;
            case 5:
            finalMargins = cardsFinalMargins5;
            break;
            case 6:
            finalMargins = cardsFinalMargins6;
            break;
            case 7:
            finalMargins = cardsFinalMargins7;
            break;
            case 8:
            finalMargins = cardsFinalMargins8;
            break;

            default:
            //Statements executed when none of the values match the value of the expression
            break;
        }
    }

    function getReverseFinalMargins(cn) {
        switch (cn) {
            case 1:
            reserveCardsFinalMargins = reverseCardsMargins1;
            break;
            case 2:
            reserveCardsFinalMargins = reverseCardsMargins2;
            break;
            case 3:
            reserveCardsFinalMargins = reverseCardsMargins3;
            break;
            case 4:
            reserveCardsFinalMargins = reverseCardsMargins4;
            break;
            case 5:
            reserveCardsFinalMargins = reverseCardsMargins5;
            break;
            case 6:
            reserveCardsFinalMargins = reverseCardsMargins6
            break;
            case 7:
            reserveCardsFinalMargins = reverseCardsMargins7;
            break;
            case 8:
            reserveCardsFinalMargins = reverseCardsMargins8;
            break;

            default:
            //Statements executed when none of the values match the value of the expression
            break;
        }
    }

//===================================================================================================

// ***************** QUICK ACCESS CODE **************************

//===================================================================================================

// Setup the scroller first
    setToprowScroll()
    setBottomrowScroll()

    //var initialMargins = [26,46,77,180,328,518];

    // == method2
    var initialTopMargin = 26;
    var initialCardHeights = [20,32,74,176,190,215];
    var updatedCardHeights = [20,32,74,176,190,215];

    var cardHeightIncrease=0;

    // var finalMargins = [124,282,473,661,751,842];

    var verticalSwipeAmount = 0;


    var readyToUpdatePosition = false;
    // var curveStep
    var newScale, newWidth, newHeight, marginLeft, marginRight;

    var topcards = $('.quickacess-panel');
    var  deltaX = 0, deltaY = 0;

    var transform;
    var canMoveAgain = false;



    // update the recentapps cards array and add the new card



    //determin the 

    function calcUpdatedCardHeights(delta){
        for (var n=0; n<6; n++){ 
            console.log("n is: ", n)
            if(updatedCardHeights[n] < 190) {
                updatedCardHeights[n] = initialCardHeights[n] + delta;
                console.log(updatedCardHeights[n])
            } else {

            }
        }
        return updatedCardHeights
    }

    //console.log("The update Card heights are: ", calcUpdatedCardHeights(100))
    function calcCardHeightsTotal(m) {
        for (var j=0; j<m; j++) {
            cardHeightIncrease += updatedCardHeights[j];
        }
        return cardHeightIncrease;
    }

    var expandMargin = 0;

    // The limit of the top card can not go below
    //var topCardLimit = 125;
    //console.log("------", calcCardHeightsTotal(3))
    var el = document.querySelector(".quickaccess-container")

    var hPanel = new Hammer(el);
    var removeRestFlag = false;
    var topMargin =0
    hPanel.on('pandown panright panup panleft panstart swiperight swipeleft swipeup swipedown', function(ev){
        $('#deltaX').text(recentAppPanels+" The expandedMargin is: "+ (1.5/recentAppPanelsNo)*(ev.deltaY/recentAppPanelsNo))
        $('#deltaY').text("The swipe up/down amount is: "+ev.deltaY + " The velocity  is: " + ev.velocity)
            verticalSwipeAmount = Math.abs(ev.deltaY);

        if(ev.type=="pandown" || ev.type=="swipedown"){

            if (Math.abs(ev.deltaX) < 100){
                var currentCards = $('.quickacess-panel');
                var cardNumbers = currentCards.length;
                var tempMargins = [];
                //check if the first one has reached the limit of 152
                var shrinkFactor = 1.5/cardNumbers,
                    maxSwipe = 100 * cardNumbers;
                    verticalSwipeAmount < maxSwipe ? expandMargin = shrinkFactor * ev.deltaY/cardNumbers  : expandMargin = 100;
                    //console.log("^^^^^^^^The expanded margin is: ", expandMargin)
                    //start the loop through the cards;
                // var topMargin;
                for (var i = 0; i < cardNumbers; i++) {
                    // console.log("in the for loop: ", i ,"topMargin is: ", topMargin, " finalMargins[i] is: ", finalMargins[i]);
                    topMargin = updatedMargins[i] + Math.round(expandMargin * (i+1));
                        tempMargins[i] = parseInt(topMargin);
                    if (topMargin > finalMargins[i]) {
                        topMargin = finalMargins[i];
                        tempMargins[i] = parseInt(topMargin);
                    }
                 
                    newScale = (4.251 * Math.log(topMargin) + 63.301) * 0.01;

                    newWidth = 412 * newScale;
                    newHeight = 360 * newScale;
                    marginLeft = marginRight = (412 - newWidth)/2;


                    if(i !== cardNumbers -1 ) {
                        $(currentCards[i]).css({'margin-top': topMargin + 'px' ,'width':newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all .15s cubic-bezier(0.250, 0.460, 0.450, 0.940)'});
                    }else {
                        // DO NOT CHABGE THE SIZE of the control panel
                        $(currentCards[i]).css({'margin-top': topMargin + 'px', 'transition': 'all .15s cubic-bezier(0.250, 0.460, 0.450, 0.940)'});
                    }

                    updatedMargins[i] = tempMargins[i];
                    $('#top-margin-panel'+i).text('The top-margin of this card is: '+ topMargin);

                }// end of the loop
               // console.log("The updated margins are: ", updatedMargins)
            } 
        }

        // For visible card 

        var tempMargin2 = updatedMargins;
        var upCounter =0;
        if (ev.type == "panup" || ev.type == "swipeup") {

            if (Math.abs(ev.deltaX) < 100) {
                var currentCards = $('.quickacess-panel');
                var cardNumbers = currentCards.length;
                // *--------------- get the reverse final margins right away -----------------*
                getReverseFinalMargins(cardNumbers);

                var shrinkFactor = 1,
                changeMargin,
                maxSwipe = 100 * cardNumbers

                verticalSwipeAmount < maxSwipe ? changeMargin = shrinkFactor * ev.deltaY/cardNumbers  : changeMargin = -100;
                for (var i = 0; i < cardNumbers; i++) {
                    // This is needed if the removeRestFlag get set   
   
                        topMargin = Math.round(updatedMargins[i] + changeMargin*(i+1));
                        tempMargin2[i] = topMargin;
                        //console.log(updatedMargins[i] ,"after the calculation the top margin is: ", topMargin, " The reverse card final margin is: ", reserveCardsFinalMargins[i])
                        if (topMargin < reserveCardsFinalMargins[i]) {
                            topMargin = reserveCardsFinalMargins[i];
                            tempMargin2[i] = topMargin;
                        }         
                        newScale = (4.251 * Math.log(topMargin) + 63.301) * 0.01;

                        var newWidth = 412 * newScale;
                        var newHeight = 360 * newScale;
                        var marginLeft = marginRight = (412 - newWidth)/2;

                        if(i !== cardNumbers -1 ){
                            $(currentCards[i]).css({'margin-top': topMargin + 'px' ,'width':newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all .15s cubic-bezier(0.250, 0.460, 0.450, 0.940)'});         
                        } else {
                            // DO NOT CHABGE THE SIZE of the control panel
                            $(currentCards[i]).css({'margin-top': topMargin + 'px', 'transition': 'all .15s cubic-bezier(0.250, 0.460, 0.450, 0.940)'});         
                        }
                        updatedMargins[i] = tempMargin2[i];

                        $('#top-margin-panel'+i).text('The top-margin of this card is: '+ topMargin);   
                } // end of the for loop
            }
        } // end of swipe up event


        // =================== SWIPE LEFT TO REMOVE ONE CARD FROM THE STACK
        //In panleft or swipe left function
        var exitCardNo;
        var cardType;
        
        if (ev.type=="panleft" || ev.type=="swipeleft") {

            var exitCard = $(ev.target).closest('.quickacess-panel'),
                exitCardNo = $(exitCard).index(),
                cardType = (exitCard).attr('data-type');
            var exitCardMargin = parseInt($(exitCard).css('margin-top'));
             // try to determin the card height
            var cardVisibleHeight =  parseInt($(exitCard).next().css('margin-top')) - parseInt($(exitCard).css('margin-top'));
                // console.log("ev.srcEvent.target is: ", ev.srcEvent.target, " Event target is: ", ev.target);
            var cardHighEnough = false;
            if (cardVisibleHeight > 60) {
                cardHighEnough = true;    
            }
            // console.log('cardVisibleHeight is: ', cardVisibleHeight, " cardHighEnough is: ", cardHighEnough)
            // console.log("exitCardMargin is: ", exitCardMargin)
            deltaX = ev.deltaX;

            // !! SET UP THE ELIGBLE CONDITIONS CARDS CAN BE SWIPED TO LEFT TO REMOVE
            // HORIZONTAL SWIPE larger than 100 px and vertical swipe smaller than 40px
            if (Math.abs(deltaX) > 101 && deltaY < 40 && cardHighEnough == true && cardType != "quickaccess-panel" ){
                // animate the card to the left
                transform = 'translate3d(' + deltaX *3+ 'px, ' + 0.15 * deltaX + 'px, 0)';
                exitCard.css({
                    'transform': transform + 'rotate(' + ((1 * deltaX) / 20) + 'deg)',
                    'transition': 'transform .25s'
                });
                updateCardPosition();
            }

            function updateCardPosition(){       
            var tempMargins = [];
            var panels = $('.quickacess-panel'),
                panelsNo = $('.quickacess-panel').length;

            //update the card position 
           
            var exitCardTopMargin = parseInt($(exitCard).css('margin-top')),
                exitCardIndex =  $(exitCard).index(),
                firstCardTopMargin = parseInt($(panels[0]).css('margin-top'));
            // console.log("exitCard topMargin is: ", exitCardTopMargin, " First card topmargin is: ", firstCardTopMargin, "The exit card index is: ", exitCardIndex);

            if (exitCardIndex == 0) {
                  // Handle the senario of the exit card is the first one
                  // -------- This part is good
                for (var i = 0; i < panelsNo; i++ ) {
                    var newScale = (4.251 * Math.log(Math.abs(updatedMargins[i+1])) + 63.301) * 0.01,
                    newWidth = 412 * newScale,
                    newHeight = 360 * newScale,
                    marginLeft = marginRight = (412 - newWidth)/2;
                    if (i !== panelsNo-1) {
                        $(panels[i+1]).css({'margin-top': updatedMargins[i]+'px','width': newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                    } else {
                        $(panels[i+1]).css({'margin-top': updatedMargins[i]+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                    }
                }
                setTimeout(updateCards, 260);
            } else {
                // * ========== exit card NOT the first one ============= *
                //console.log("The exit card is not the first one")
                if (firstCardTopMargin >= finalMargins[0]) {
                     //console.log(".........need to move up cards below the exit card");

                    for(var i = exitCardIndex+1; i < panelsNo; i++) {
                        var newScale = (4.251 * Math.log(Math.abs(updatedMargins[i+1])) + 63.301) * 0.01,
                        newWidth = 412 * newScale,
                        newHeight = 360 * newScale,
                        marginLeft = marginRight = (412 - newWidth)/2;
                        console.log("The card needs to move up index is: ", i, " The panels are: ", $(panels[i]));
                        // The cards below to take the updatedMargin one card above
                    if (i !== panelsNo - 1) {
                            $(panels[i]).css({'margin-top': updatedMargins[i-1]+'px','width': newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                        } else {
                            $(panels[i]).css({'margin-top': updatedMargins[i-1]+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                        }
                    }
                    setTimeout(updateCards, 260);

                } else {
                    //console.log(">>>>>>>  need to adjust the card below the exit card and above the exit card");

                    // The first card can go down or the rest card will go up depending on the exit card position

                    if (updatedMargins[exitCardIndex-1] >= finalMargins[exitCardIndex-1]) {
                       // console.log("move up");
                    } else {
                        // this part is the usual case
                       // console.log ("move down")

                        for (var i = 0; i < panelsNo; i++ ) {
                            var newScale = (4.251 * Math.log(Math.abs(updatedMargins[i+1])) + 63.301) * 0.01,
                            newWidth = 412 * newScale,
                            newHeight = 360 * newScale,
                            marginLeft = marginRight = (412 - newWidth)/2;
                            // Need to consider the cards above and cards below:
                            if (i < exitCardIndex) {
                                var topMagin2;
                                //console.log("The cards above are: ", $(panels[i]))
                                console.log(i, "The next margin is", updatedMargins[i+1]," the final is: ", finalMargins[i]);
                                if(updatedMargins[i+1] > finalMargins[i]) {
                                    topMagin2 = finalMargins[i];
                                } else {
                                    topMagin2 = updatedMargins[i+1]
                                }
                                //$(panels[i]).css({'margin-top': updatedMargins[i+1]+'px','width': newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                               // $(panels[i]).css({'margin-top': topMagin2+'px','width': newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});

                            if (i !== panelsNo - 1) {
                                    $(panels[i]).css({'margin-top': topMagin2+'px','width': newWidth+'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                                } else {
                                    $(panels[i]).css({'margin-top': topMagin2+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                                }
                            } else if (i > exitCardIndex) {
                                //console.log("/// The cards BELOW are: ", $(panels[i]))
                            }

                        }
                        setTimeout(updateCards, 260);
                    }
                }
            }
        }

        function updateCards() {
            $(exitCard).remove();
            var remainingPanels = $('.quickacess-panel'),
                remainingPanelsNo = $('.quickacess-panel').length;

            // reset the initial values
            setupInitialTopMargins(remainingPanelsNo);
            setupUpdatedMargins(remainingPanelsNo);
            setupFinalMargins(remainingPanelsNo);
            getReverseFinalMargins(remainingPanelsNo);

            //console.log("setupInitialTopMargins In the updateCards funciton: ", updatedMargins )

            for (var i = 0; i<remainingPanels.length; i++) {
                updatedMargins[i] = parseInt($(remainingPanels[i]).css('margin-top'));
            }
             canMoveAgain = true
            }
        } // end of updateCards

        // ===================== PANRIGHT TO REMOVE REMAINING CARDS ======================

        var remainCardNo;
        if (ev.type=="panright" || ev.type=="swiperight") {
            var remainCard = $(ev.srcEvent.target).closest('.quickacess-panel');
            //remainCardNo = $(remainCard).attr('data-card');
            remainCardNo = $(remainCard).index();
            cardType = $(remainCardNo).attr('data-type');

            deltaX = ev.deltaX;
            var cardVisibleHeight = parseInt($(remainCard).next().css('margin-top')) - parseInt($(remainCard).css('margin-top'));

            var cardHighEnough = false;
            if (cardVisibleHeight > 60) {
                cardHighEnough = true;    
            }
            var currentCards = $('.quickacess-panel');
            var cardLength = currentCards.length;
            //console.log("The remain card is: ", remainCard, " The index of the remain card is: ", remainCardNo)
            if (Math.abs(deltaX) > 120 && deltaY < 40 && cardHighEnough == true && cardType != "quickaccess-panel" ){

                // rotate the remaining card     
                for (var i=0; i < currentCards.length-1; i++) {
                    var currMarginLeft = parseInt($(currentCards[i]).css('margin-left'));
                    var currMarginTop = parseInt($(currentCards[i]).css('margin-top'));
                    if (i==remainCardNo) {

                        $(remainCard).css({'transform': 'rotate(12deg)',  'transition':'all 0.25s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                        setTimeout(function(){
                            $(remainCard).css({'transform': 'rotate(0deg)','transition':'all 0.1s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                        }, 250);
                    } else {
                        //var currMarginLeft = parseInt($(currentCards[i]).css('margin-left'));
                        if (i !== remainCardNo ){
                            //console.log("make sure the remaining card does not get moved to the right")
                            //console.log("0.15+1*i is: " , 0.15+1*i)
                            var animTime = 0.2 + i*0.05;
                            console.log("animTime is: ", animTime)
                            $(currentCards[i]).css({'transform': 'translateX(500px)', 'transition': 'all '+animTime+'s'})
                        }
                    }                 
                }

                setTimeout(function(){
                        var topMargin = reserveCardsFinalMargins[i];
                        var newScale = (4.251 * Math.log(topMargin) + 63.301) * 0.01;
                        var newWidth = 412 * newScale;
                        var newHeight = 360 * newScale;
                        var marginLeft = marginRight = (412 - newWidth) / 2;
                        $(remainCard).css({'margin-top': 135 + 'px','width': newWidth + 'px', 'margin-left': marginLeft+'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                        $('#qa-control-panel').css({'margin-top': 300 + 'px','transition': 'all 0.15s cubic-bezier(0.755, 0.050, 0.855, 0.060)'});
                }, 200);
                setTimeout(updateCards2, 350)
            }
              
            function updateCards2() {
                // There are only two cards left
                counter++;             
                if (counter == 1) {
                    for (var i=0; i < currentCards.length - 1; i++) {
                        if (i!= remainCardNo) {
                            $(currentCards[i]).remove()
                        } 
                    }
                    updatedMargin = [];
                    updatedMargins = [135,300];
                    removeRestFlag = true;
                }
                //console.log("The updated card 2 function is called: ", updatedMargins)
            }

        } // end of panright

    }) // hPanel container function





    //==================== CONTROL PANEL POSITIONS =================

        // volumn control

    $( "#volumn-range" ).slider({
      range: "min",
      value: 300,
      min: 1,
      max: 500,
        change: function(event, ui) { 
        var audioVolume = parseInt(ui.value)/500;
        console.log("The audio volue is: ", audioVolume)
        var audioPlayer = document.querySelector('#audio-player')
        audioPlayer.volume = audioVolume;
        }
    });


    $( "#brightness-range" ).slider({
      range: "min",
      value: 1000,
      min: 1,
      max: 1000,
        change: function(event, ui) { 
        var brightnessValue = parseInt(ui.value*0.1)
        $('.quickaccess-container').css('-webkit-filter', 'brightness('+ brightnessValue + '%)')
        } 
    });
    console.log("The brightness range is: ", $( "#brightness-range" ).value)


    $('#music-button').on('tap', function(){
        document.querySelector('#audio-player').play()
    })

    // =================================================================================================== //

    // --------------------- LONG PRESS START EDIT MODE ------------------------------------ //

    var EDIT_MODE='';


    $('.launcher-row-hotspot, .grid-hotspot').on('taphold', function(e){
        $("#page-wrapper").addClass('edit-mode');
        $('.statusbar-wrapper').addClass('edit-mode');
        $("#indicator-home").addClass('edit-mode');

        $(".launcher-screen").addClass('edit-mode');

        // pageScroll.refresh();
        var targetScreen = new getScreenInfo($(e.target))
        var si = targetScreen.index;

        $('.home-icons-wrapper').addClass('fade-out');
        $('.nav-buttons-wrapper').addClass('fade-in');

        function enableScroll() {
            pageScroll.enable();
        }

        // === TAP TO EDXIT EDT MODE ===
        $('.launcher-row-hotspot, .grid-hotspot').on('tap', function(){
            $("#page-wrapper").removeClass('edit-mode');
            $(".launcher-screen").removeClass('edit-mode');
            $('.statusbar-wrapper').removeClass('edit-mode');
            $("#indicator-home").removeClass('edit-mode');
            homeIconRow.removeClass('fade-out');
            navButtonRow.removeClass('fade-in')
        });

    }); //end of launch row tap hold


           //====== EDIT MODE SCREEN MANAGER ======

        $('#edit-wallpaper-button').on('tap', function(){
            $('.wallpaper-container').addClass('open-wallpapers');
        });

        $('#edit-widgets-button').on('tap', function(){
            $('.widget-container').addClass('open-widgets');
        });

        // edit-settings-button
        $('#edit-settings-button').on('tap', function(){
            $('.lelauncher-settings-container').addClass('open-lesettings');
            $('.statusbar-wrapper').removeClass('edit-mode');
            setTimeout(blurZero, 250)
        });

        function blurZero(){
            $('#blurfilter-container').addClass('blur')
             $('#zero').addClass('blur');
             $('#minus1').addClass('blur');
             $('#plus1').addClass('blur');
             $('.nav-buttons-wrapper').addClass('blur');
             $('#indicator-home').addClass('blur2')
        }



        $('#leeco-feedback').on('tap', function(){
            console.log("from screen manager- ")
            $('#leeco-feedback').addClass('highlight')
            $('#lelauncher-settings-main-b').addClass('open-subpage');
            $('#lelauncher-feedback').addClass('open-subpage');
            $('.main-innerscrim.lelauncher-settings-inner').addClass('open-subpage');
            $('.lesettings-backbutton').addClass('open-subpage');

            setTimeout(blurMainSettingsB, 300)
        });

        $('#leeco-about').on('tap', function(){
            $('#leeco-about').addClass('highlight')
            $('#lelauncher-settings-main-b').addClass('open-subpage');
            $('#lelauncher-about').addClass('open-subpage');
            $('.lelauncher-settings-container .lelauncher-settings-inner').addClass('open-subpage');
            $('.lesettings-backbutton').addClass('open-subpage');
            setTimeout(blurMainSettingsB, 300)
        });

        $('.lesettings-backbutton').on('tap', function(){
            if($('.lelauncher-settings-container').hasClass('open-lesettings') && $('#lelauncher-feedback').hasClass('open-subpage') || $('.lelauncher-settings-container').hasClass('open-lesettings') && $('#lelauncher-about').hasClass('open-subpage')){
             console.log("in the sub pages")
            if ( $('#lelauncher-feedback').hasClass('open-subpage')) {
                $('#lelauncher-settings-main-b').removeClass('open-subpage');
                $('#lelauncher-feedback').removeClass('open-subpage');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                removeMainSettingsBlurB()
                $('#leeco-feedback').removeClass('highlight');
                $('.lesettings-backbutton').removeClass('open-subpage');
                if(pageScroll.x >-412) {
                    //blurCards();
                }
            }

            if($('#lelauncher-about').hasClass('open-subpage')) {
                $('#lelauncher-settings-main-b').removeClass('open-subpage');
                $('#lelauncher-about').removeClass('open-subpage');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                removeMainSettingsBlurB()
                $('#leeco-about').removeClass('highlight');
                $('.lesettings-backbutton').removeClass('open-subpage');
                if (pageScroll.x >-412) {
                   // blurCards();
                }
            }
         } else {
                $('.lelauncher-settings-container').removeClass('open-lesettings')
                $('#blurfilter-container').removeClass('blur')
                $('.nav-buttons-wrapper').removeClass('blur')
                $('#indicator-home').removeClass('blur2')
                   
                $('#zero').removeClass('blur')
                $('#plus1').removeClass('blur');
                $('#minus1').removeClass('blur');

         }
        })
        


        $('#edit-themes-button').on('tap', function(){
            $('.themes-container').addClass('open-themes');
        });

        $('.wallpaper-icon-wrapper').on('tap', function(e){
            var themeTitle = $(e.target).parent().attr('data-wallpaper')
            $('.theme-message').text(themeTitle);
            $('#global-container').removeClass();
            $('#global-container').addClass(themeTitle);
            $('#blurfilter-container .blur').css('-webkit-filter', 'blur(40px)')
        });


    //=========================================================================================================//

    // -------------------------- OPEN DRAWER ------------------------------ //

    $('#drawer-button').on('tap', function(e){
      // Slide up the  page
        openAppDrawer()
       
    }) //end of app drawer


    function openAppDrawer() {

        $('.app-drawer').addClass('open');

        $('.home-icons-wrapper').addClass('fade-out');


        setDrawerScroller();
        //start the placing the apps onload
        $('.app-drawer').on('animationend', function(){
            $('#blurfilter-container').addClass('blur');
                $('#zero').addClass('blur');
                // $('#minus1').addClass('blur');
                $('#plus1').addClass('blur');
                $('#indicator-home').addClass('blur2');
            })

        $('.apps-wrapper a.thumb').addClass("show-app");

            positionAppsOnLoad();

        // ==== OPEN INDIVIDUAL APP ===


            //APP DRAWER SEARCH FUNCTION
        $("#search-app").on("keyup", function(){
            var search_word = $("#search-app").val().trim().toLowerCase();
            if(search_word != '') {
                $('#cancel-button').addClass('cancel-onfocus');
            }

            hideRecents();
            hideSortingTitles();
            moveUpdrawerContainer();
            searchApps(search_word);
            updateDrawScrollHeight();

        });

        $('#cancel-button').on('tap', function(){
            $("#search-app").blur();
            $("#search-app").val('');
            positionApps();

        })


        $("#search-app").on("blur", function(){
            $('#cancel-button').removeClass('cancel-onfocus');
            $("#search-app").val('')
            searchApps('');
            showRecents();
            showSortingTitles();
            moveDowndrawerContainer()
        });

        $('.apps-wrapper').on('tap', function(e){

        $("#search-app").blur();
            $("#search-app").val('');
            searchApps('');
            showRecents();
            showSortingTitles();
        })

        setTimeout(allowSorting, 50)

        function allowSorting() {
            $("li.sorting-link").each(function(){
                $(this).off('tap').on('tap', function(){
                    $("li.sorting-link").removeClass("selected");
                    $(this).addClass("selected");
                    var keyword = $(this).attr("data-keyword");
                    switch (keyword) {
                        case('all'):
                        $('#drawer-scroller').css('height', '1400px'); 
                        drawerScroll.refresh();
                        sortAlpha();
                        positionApps();
                        break;
                            
                        case ('installdate'):
                        $('#drawer-scroller').css('height', '1400px'); 
                        drawerScroll.refresh();
                        sortDates();
                        break;
                    }
                })
            })
        } //end of allow sorting function
    }

    // $('a.thumb').off('taphold').on('taphold', function(e){
  
    //     var newAppImg =  e.target.src;
    //     var imgSrc = e.target.src;
                
    //     var appName = $(this).children()[1]
    //     var text =appName.textContent;

    //     var acceptGrid = $('.accept-drawer-app.empty').first();
    //     acceptGrid.append('<img src='+imgSrc+'>'+'<p>'+text+'</p>');
    //     (acceptGrid).removeClass('empty grid-hotspot')
    //     dismissDrawer();

    // })

    function dismissDrawer() {
        $('.app-drawer').removeClass('open');
        $('.home-icons-wrapper').removeClass('fade-out');
        if ($("#zero").hasClass("blur")){
            $("#zero").removeClass("blur")
        }
        if ($('#plus1').hasClass('blur')) {
            $('#plus1').removeClass('blur');
        }
        if($('#blurfilter-container').hasClass('blur')){
            $('#blurfilter-container').removeClass('blur')
        }
        if ($('.target-app-container').hasClass('gotoapp')) {
            $('.target-app-container').addClass('gotoapp');  
        }
    }
    //======================= WIDGET CONTENT ===============================



    //======================= WIDGETS EDITMODE ==============================
    // CUSTOMIZE WIDGET



        widgetScroll.on('scroll', updatePosition);
        widgetScroll.on('scrollStart', updatePosition);
        widgetScroll.on('scrollEnd', updatePosition);


        console.log("widgetScroll.y is ", widgetScroll.y)
          function updatePosition() {
            console.log(widgetScroll.y)
            // $('.widget-header-mask').css('margin-top', widgetScroll.y + 'px')
           // if (this.y < 0 ) {
           //  $('.smart-header').addClass('shrink')
           // } else {
           //   $('.smart-header').removeClass('shrink')
           // }
          }
    // More content button 
    $('.more-content').on('tap', function(e){
        var container = $(e.target).attr('data-container'),
            content = $(e.target).attr('data-content');

        $(this).toggleClass('less')
        $('#'+ container).toggleClass('show-more');
        $('#'+ content).toggleClass('show-more');

        $('#'+ container).on('transitionend', function(){
            var wl= getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh()
        });
    });

    showHideWidgetMoreButton();

    var $widgets = $('.widget-card');
    var counter = 0
    $('.widget-settings-menu').on('tap', function(){
        console.log("settings tapped")

        $(this).toggleClass('open-settings');

        if(!$('.widget-settings-menu').hasClass('open-settings')){


            removeBlurCardsNoMenu();

            $('.widget-settings-menu').removeClass('open-settings')
            $('.widget-manager').removeClass('show-manager');
            var wl = getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh();
            pageScroll.enable();


        } else {
            if(!$('.widget-settings-menu').hasClass('open-lelauncher')) {
            $('.widget-manager').addClass('show-manager');

            setTimeout(blurCardsNoMenu, 400)


            if($('.widget-manager').hasClass('show-manager')){
                pageScroll.disable();
            } else {
                pageScroll.enable();
            }

            //setWidgetSettingsScroll()
            } else {

            }
        } // outer else
    });

    $('#card-lelauncher-setting-button').on('tap', function(){
        $('.widget-manager').addClass('open-lelauncher-container')
        $('.lelauncher-settings-container2').addClass('open-lesettings');
        $('.widget-settings-menu').css('display','none')
        $('.widget-settings-menu2').addClass('open-lelauncher');
        $('.widget-manager .settings-container').addClass('open-subpage')
        $('.highlight2').addClass('active');
        $('.leecosetting-style').addClass('highlight')
        setTimeout(blurCardManager, 300);
    })
    function blurCardManager() {
        $('.widget-manager').addClass('blur')
    }
    function blurMainSettings() {
        $('#lelauncher-settings-main2').addClass('blur')
    }

    function blurMainSettingsB() {
        $('#lelauncher-settings-main-b').addClass('blur')
    }


    function removeMainSettingsBlur() {
        $('#lelauncher-settings-main2').removeClass('blur')
    }
        function removeMainSettingsBlurB() {
        $('#lelauncher-settings-main-b').removeClass('blur')
    }

    $('.widget-settings-menu2').on('tap', function(){

 
        if($('.lelauncher-settings-container2').hasClass('open-lesettings') && $('#lelauncher-feedback2').hasClass('open-subpage') || $('.lelauncher-settings-container2').hasClass('open-lesettings') && $('#lelauncher-about2').hasClass('open-subpage')){
             console.log("in the sub pages")
            if ( $('#lelauncher-feedback2').hasClass('open-subpage')) {
                $('#lelauncher-settings-main2').removeClass('open-subpage');
                $('#lelauncher-feedback2').removeClass('open-subpage');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                removeMainSettingsBlur()
                $('#leeco-feedback2').removeClass('highlight');
                if(pageScroll.x >-412) {
                    //blurCards();
                }
            }

            if($('#lelauncher-about2').hasClass('open-subpage')) {
                $('#lelauncher-settings-main2').removeClass('open-subpage');
                $('#lelauncher-about2').removeClass('open-subpage');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                removeMainSettingsBlur()
                $('#leeco-about2').removeClass('highlight');
                if (pageScroll.x >-412) {
                   // blurCards();
                }
            }
         } else {
                $('.lelauncher-settings-container2').removeClass('open-lesettings')
                $('#blurfilter-container').removeClass('blur')
                $('.nav-buttons-wrapper').removeClass('blur')
                $('#indicator-home').removeClass('blur2')
                $('.leecosetting-style').removeClass('highlight');
                   
                $('#zero').removeClass('blur')
                $('#plus1').removeClass('blur');
                //$('.widget-settings-menu').css('display','block');
                setTimeout(showCrossMenu, 400)
                $('.widget-manager').removeClass('blur');
                $('.widget-settings-menu2').removeClass('open-lelauncher')
                $('.widget-manager').removeClass('open-lelauncher-container')
                $('.widget-manager .settings-container').removeClass('open-subpage')
         }
    });

    function showCrossMenu() {
        $('.widget-settings-menu').css('display','block');
    }

        $('#leeco-feedback2').on('tap', function(){
            $('#leeco-feedback2').addClass('highlight')
            $('#lelauncher-settings-main2').addClass('open-subpage');
            $('#lelauncher-feedback2').addClass('open-subpage');
            $('.main-innerscrim.lelauncher-settings-inner').addClass('open-subpage');
            setTimeout(blurMainSettings, 350)
        });


        $('#leeco-about2').on('tap', function(){
            $('#leeco-about2').addClass('highlight')
            $('#lelauncher-settings-main2').addClass('open-subpage');
            $('#lelauncher-about2').addClass('open-subpage');
            $('.main-innerscrim.lelauncher-settings-inner').addClass('open-subpage');
            setTimeout(blurMainSettings, 350)
        });


    $('.edit-widgets li').on("tap", function(e){
            $(this).toggleClass('widget-off');
            var widgetId =$(this).attr('data-widgetid');
             if($(this).hasClass('widget-off')){
             $("#"+widgetId).addClass('widget-off');
            } else {
                $("#"+widgetId).removeClass('widget-off');
            }
    });

    // launch the settings menu from the card Screen


    function openSettingCardManager() {
        $('.lelauncher-settings-container').addClass('open-lesettings')
    }

    // ============ click the widget header icon to go to the app


    // Launch App Drawer from Favorite

    $('.widget-title').on('tap', function(){
        
        $('.widget-targetapp-placeholder').addClass('open-widgetapp');
        var appName = $(this).attr('data-widgetapps');

        switch(appName) {
            case "recentapps":
            $('.widget-targetapp-placeholder').css('display', 'none');
            break;
            case "appstips":
            $('.widget-targetapp-placeholder').css('display', 'none')
            $('.lightbox-container').fadeIn(function(){
                setLightboxScroll();
                pageScroll.disable();

            });

            $('#lightbox-closebutton').on('tap', function(){
                $('.lightbox-container').fadeOut();
                pageScroll.enable();
                })
                break;
                default:
                $('.widget-targetapp-placeholder').css('display', 'block')
                $('.widget-targetapp-placeholder .app-container').css('display', 'none')
                $('.widget-targetapp-placeholder #app-'+appName).css('display', 'block');
                }
            });


            $('.livevideo-container').on('tap', function(){
                var type = $(this).attr('data-videotype');
                if(type=="play") {
                    var video = $(this).attr('data-poster');
                    $('.widget-targetapp-placeholder').addClass('open-widgetapp');
                    $('.widget-targetapp-placeholder').css('display', 'block');
                    $('.widget-targetapp-placeholder #poster-container').css('display', 'block')
                $('#poster-container').html('<img src="images/'+video+'">')
                }
                if(type=="follow") {
                    $(this).find('.icon-follow').toggleClass('notified')
                }
            })

            function removeFollowMsg() {
                $('.follow-notice').fadeOut(function(){
                    $('.follow-notice').remove()
                })
            }
            // Lightbox for apps and tips

            $('#appstips-thumb').on('tap', function(){
                            
                $('.lightbox-container').fadeIn(function(){
                    setLightboxScroll();
                    pageScroll.disable();
                });

                $('#lightbox-closebutton').on('tap', function(){
                    $('.lightbox-container').fadeOut();
                    pageScroll.enable()
                })
            })

    // ================== FAVAPPS SORTING ====================
    setFavAppsScroll();
    //setFavAppsBlurScroll();

    $('.widget-title#widget-favapps-title, #favapps-launch-hotspot, #favapps-launch-hotspot2').on('tap', function(){
        $('.favapps-global-wrapper').addClass('edit-favorites');
        if ($('.favapps-emptymsg-global-container').hasClass('show-msg-container')){
            $('.favapps-emptymsg-global-container').removeClass('show-msg-container');
        }

        setTimeout(minus1Blur, 300)
    })

    function minus1Blur() {
        $('#minus1').addClass('blur')
    }

$('.favapps-dropzone').droppable({
        tolerance: "touch",
        over: function(e, ui) {
            //console.log('ui.draggable.position() is', ui.draggable.position())
            $('.favapps-dropzone').addClass('nearby');
            $('#favapps-all-container').addClass('nearby');
            $('#favapps-selected-container').addClass('nearby');

        },
        deactivate: function() {
            $('.favapps-dropzone').removeClass('nearby');
            $('.dropzone-highlight-container').removeClass('nearby');
            $('#favapps-all-container').removeClass('nearby');
            $('#favapps-selected-container').removeClass('nearby');
        },
        drop: function (event, ui) {
            ui.draggable.remove();
            navigator.vibrate([500]);
           // console.log(ui.draggable)

            var img =$(ui.draggable).find('img')
            var app=$(ui.draggable).children();

             var imgLen = $('#favapps-all li img').length;
             var imgLists = $('#favapps-all li img');

             for(var i=0; i<imgLen; i++){
              if($(imgLists[i]).attr('src') == $(app).attr('src')) {

                $(imgLists[i]).parent().removeClass('favorite')
              }
            }
            $('.favapps-dropzone').removeClass('nearby');
            $('.favapps-dropzone2').removeClass('nearby');
        }
});


    $( "#favapps-selected" ).sortable({
        start: function(e, ui){
            //console.log(ui.item.position())
        },
        update: function(e, ui){
            //console.log(ui.item.position())
        }, 
        stop: function(e, ui){

        }
    });

    var tileCounter = 0;
    var idleArray  = [];
    var gapTime=3000;
    var hit8Counter = 0;

var removeTimer;
    $('#favapps-all li').off('tap').on('tap', function(e){

        var removeTime = 0;
        var clickTime = new Date().getTime();
              var ti;
              clearInterval(ti);
              var currTime
        console.log("<<<<<<<<<<<<<< The click time is: ", clickTime)
        if (!$(this).hasClass('favorite')){
            var favapps = $('#favapps-selected li');

            var last = $('#favapps-selected li').last();

            if ($( "#favapps-selected li" ).length > 0) {
                if ($("#favapps-selected li").length < 8) {
                    console.log("apps smaller than 8 condition met: ")

                    var imgSrc = "gp-icons/" + $(this).attr('data-imgsrc');
                    var text = $(this).attr('data-favapp-name');


                    var newSelected = '<li data-favapp-name="'+text+'"><img src="'+imgSrc+'"><span>'+text+'</span></li>';

                    $(this).addClass('favorite');
                    $(newSelected).insertAfter($( "#favapps-selected li" ).last())
                } else {
                    // first remove the class so if use keep hitting the app, it will keep showing the message;
                    hit8Counter ++;
                    var idleStart = new Date().getTime();

                    idleArray.push(idleStart);

                    $('.max8-toastmessage').addClass('show-toast');
              
                    clearTimeout(removeTimer)
                    removeTimer = setTimeout(function(){
                         $('.max8-toastmessage').removeClass('show-toast')
                    }, gapTime)
                }
            } else {
                // This is the case there is no favapps, still need to add the 'favorite' class
                // There is bug, when there is 0 app. So use the decalre local variables

                var imgSrc = "gp-icons/" + $(this).attr('data-imgsrc');
                var text = $(this).attr('data-favapp-name');

                var newSelected = '<li data-favapp-name="'+text+'"><img src="'+imgSrc+'"><span>'+text+'</span></li>';

                $(this).addClass('favorite');
                $(newSelected).appendTo($("#favapps-selected"));
            }

        } else {
            // If this already have the class of favorite
            $(this).removeClass('favorite');
            if ($('.max8-toastmessage').hasClass('show-toast')){
                $('.max8-toastmessage').removeClass('show-toast')
                }
            var imgSrc= $(e.target).attr('src') || $(e.target).children().attr('src');
            var favapps = $('#favapps-selected li');
            for(var i=0; i < favapps.length; i++){
              var favSrc = $(favapps[i]).children().attr('src');
              if (favSrc == imgSrc) {
                $(favapps[i]).remove();
              }
            }
        }

        function removeToast() {
            setTimeout(function(){
                if ($('.max8-toastmessage').hasClass('show-toast')){
                    $('.max8-toastmessage').removeClass('show-toast')
                }
            }, 2000)
        }

        function checkTime(a){

            var time = new Date().getTime();
            // console.log("The remove time is : ", a, "the current time is: ", time);
            // var diffT = Math.abs(time - a)
            // if(diffT < 10) {
            //     console.log("it is time to remove the toast")
            // }
            return time;
        }
    })

    // Favorite Apps Close Button
    $('#favapps-manager-closebutton').on('tap', function(e){
        //closeFavAppsManager()
        var hideCard = false;
        var favList = $('#favapps-selected li')
        var newFavAppList ='';
        if (favList.length > 0) {
            if ($('.favapps-emptymsg-global-container').hasClass('show-msg-container')){
                $('.favapps-emptymsg-global-container').addClass('show-msg-container');
            }
            // If there is one fav app add the message
            $('.zero-favappp-message').removeClass('show-zeromsg');
            // if there is one message, adjust the height of the container
            $('#widget-recentapps').removeClass('zero-favapps')
            $('#favapps-launch-hotspot2').removeClass('.show-launch-hotspot')
            $('#favapps-launch-hotspot').css('display', 'block');

            $('.favapps-global-wrapper').removeClass('edit-favorites');
            $('#minus1').removeClass('blur');

            // var favList = $('#favapps-selected li');

            for (var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);
            showHideWidgetMoreButton();
        } else if (favList.length==0){

            for(var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);
            showHideWidgetMoreButton();

            $('.favapps-emptymsg-global-container').addClass('show-msg-container');

            $('#button-continue').on('tap', function(){
                hideCard = false;
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');

                // handle the text
                $('.zero-favappp-message').addClass('show-zeromsg');
                $('#favapps-launch-hotspot').css('display', 'none');
                // need to handle the height of the card and add hotspot

                $('#favapps-launch-hotspot2').addClass('show-launch-hotspot');
                $('#widget-recentapps').addClass('zero-favapps')

            }) 

            $('#button-hidecard').on('tap', function(){
                hideCard = true;
                $('#widget-recentapps').addClass('widget-off');
                $('#editwidget-favapps').addClass('widget-off');
                var wl = getWidgetsLength();
                    $('#widget-scroller').css('height', wl+'px');
                    widgetScroll.refresh();
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');
            }) 

        } 

    }); // end of close favApps

    var receiveFeedback = false;
    function closeFavAppsManager() {
        var hideCard = false;

        var favList = $('#favapps-selected li')
        var newFavAppList ='';
        if (favList.length > 0) {
            if ($('.favapps-emptymsg-global-container').hasClass('show-msg-container')){
                $('.favapps-emptymsg-global-container').addClass('show-msg-container');
            }
            // If there is one fav app add the message
            $('.zero-favappp-message').removeClass('show-zeromsg');
            $('#favapps-launch-hotspot2').removeClass('.show-launch-hotspot')
            $('#favapps-launch-hotspot').css('display', 'block');

            $('.favapps-global-wrapper').removeClass('edit-favorites');
            $('#minus1').removeClass('blur');

            // var favList = $('#favapps-selected li');

            for (var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);

            showHideWidgetMoreButton();
        } else if (favList.length==0){

            for(var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);
            showHideWidgetMoreButton();

            $('.favapps-emptymsg-global-container').addClass('show-msg-container');

            $('#button-continue').on('tap', function(){
                hideCard = false;
                receiveFeedback = true
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');

                // handle the text
                $('.zero-favappp-message').addClass('show-zeromsg');
                $('#favapps-launch-hotspot').css('display', 'none');
                // need to handle the height of the card and add hotspot

                $('#favapps-launch-hotspot2').addClass('show-launch-hotspot');
                // if (pageScroll.x> -100) {
                //     setTimeout(function(){
                //         pageScroll.scrollTo(-412, 0, 1000);
                //     }, 100)
                // }

            }) 

            $('#button-hidecard').on('tap', function(){
                hideCard = true;
                receiveFeedback = true;
                $('#widget-recentapps').addClass('widget-off');
                $('#editwidget-favapps').addClass('widget-off');
                var wl = getWidgetsLength();
                    $('#widget-scroller').css('height', wl+'px');
                    widgetScroll.refresh();
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');
                // if (pageScroll.x> -100) {
                //     setTimeout(function(){
                //         pageScroll.scrollTo(-412, 0, 1000);
                //     }, 100)
                // }
            })
        }

    } // end of closeFavAppsManager function


    $('#favapps-wrapper').on('tap', '#favapps-appdrawer', function(){  
        setTimeout(blurCards, 400);
        openAppDrawer();
    })

    function blurCards (){
        $('#widgets-wrapper').addClass('blur');
        $('.widget-logo-container').addClass('blur');
        $('.widget-settings-menu').addClass('blur');
        $('#indicator-home').addClass('blur2');
        
    }
    function removeBlurCards() {
        $('#widgets-wrapper').removeClass('blur');
        $('.widget-logo-container').removeClass('blur');
        $('.widget-settings-menu').removeClass('blur');
        $('#indicator-home').removeClass('blur2');
    }
    function blurCardsNoMenu (){
        console.log("***********blur cards no menu")
        $('#widgets-wrapper').addClass('blur');
        $('.widget-logo-container').addClass('blur');
        $('#indicator-home').addClass('blur2');
    }
    function removeBlurCardsNoMenu (){
        $('#widgets-wrapper').removeClass('blur');
        $('.widget-logo-container').removeClass('blur');
        $('#indicator-home').removeClass('blur2');
    }

    $('#carddisplay-button2').on('tap', function(){
        $(this).toggleClass('setting-off');
        $('#carddisplay-button').toggleClass('setting-off');
        // if($(this).hasClass('setting-off')) {
        //     $('#minus1').css('display', 'none');
            
        //     $('#blurfilter-container').removeClass('blur');
        //     $('#scroller').css('width', '824px');
        //     $('#indicator-home').removeClass('blur2')
        //     pageScroll.enable();
        //     //setTimeout(function(){pageScroll.refresh();}, 500)
        //     pageScroll.refresh();
        //     updateDockIcons();
        //     $('.home-icons-wrapper').css('display', 'block')
        // }
    });

    $('#carddisplay-button').on('tap', function(){
        $(this).toggleClass('setting-off');
        // $('#carddisplay-button2').toggleClass('setting-off');
        // if($(this).hasClass('setting-off')) {
        //     $('#minus1').css('display', 'none');
            
        //     $('#blurfilter-container').removeClass('blur');
        //     $('#scroller').css('width', '824px');
        //     $('#indicator-home').removeClass('blur2')
        //     pageScroll.enable();
        //     //setTimeout(function(){pageScroll.refresh();}, 500)
        //     pageScroll.refresh();
        //     updateDockIcons();
        //     $('.home-icons-wrapper').css('display', 'block')
        // } else {
        //     $('.lelauncher-settings-container2').removeClass('open-lesettings');
        //     $('.widget-manager').removeClass('show-manager')
        //     $('#minus1').css('display', 'inline-block');
        //     $('#zero').removeClass('blur');
        //     $('#scroller').css('width', '1236px');
        //     $('#minus1').removeClass('blur')
        //     removeBlurCards()
        //     pageScroll.refresh();
        // }
    });


    // =================== HARDWARE BUTTON DISMISSES APP DRAWER ===================

    $("#hardware-home").on('tap', function(){
        //console.log("!$('.favapps-global-wrapper').hasClass('edit-favorites') ", !$('.favapps-global-wrapper').hasClass('edit-favorites'))
        // If you are on plus 1 page
        if (pageScroll.x < - 800) {
            console.log("The favApps Manager is not on")
            setTimeout(scrollToHome, 250)
        }


        $('.lightbox-container').fadeOut();
        //if on minus 1 page
        if (pageScroll.x > -100  && !$('.favapps-global-wrapper').hasClass('edit-favorites')) {
            console.log("In minus1 page and no favapps manager")
            $('#blurfilter-container').removeClass('blur');
            $('.home-icons-wrapper').css('display', 'block');
            setTimeout(scrollToHome, 250)
        }

        if ($('.target-app-container').hasClass('gotoapp')) {
            $('.target-app-container').removeClass('gotoapp');
        }

        if ($(".app-drawer").hasClass('open')) {
            $(".app-drawer").removeClass('open');

            removeBlurCards()
            pageScroll.enable();
            updateDockIcons()
            if ($('#zero').hasClass('blur')) {
                $('#zero').removeClass('blur');
            }
            if ($('#minus1').hasClass('blur')) {
                $('#minus1').removeClass('blur');
            }
            if ($('#plus1').hasClass('blur')) {
                $('#plus1').removeClass('blur');
            }

            if ($('#blurfilter-container').hasClass('blur')){
            $('#blurfilter-container').removeClass('blur')
            }
            setTimeout(scrollToHome, 500)
        }
        function scrollToHome() {
            console.log("scroll to home")
            pageScroll.scrollTo(-412, 0, 1000);
        }
         
       if ($('.widget-settings-menu').hasClass('open-settings') || $('.widget-settings-menu').css('display', 'block')){
            removeBlurCardsNoMenu ()
            //setTimeout(scrollToHome, 250)
            $('#blurfilter-container').removeClass('blur');
            //updateDockIcons();
            $(".home-icons-wrapper").css('display', 'block');
            if($('.widget-settings-menu').hasClass('open-settings')) {
                $('.widget-settings-menu').removeClass('open-settings');
            }

            $('.widget-manager').removeClass('show-manager');
            var wl = getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh();
            pageScroll.enable();
        } 


        if ($('.widget-targetapp-placeholder').hasClass('open-widgetapp')) {
            $('.widget-targetapp-placeholder').removeClass('open-widgetapp')
            $('.app-container').css('display', 'none');
        }

        // if it is in edit-mode, remove the editmode
        if ($("#page-wrapper").hasClass('edit-mode')) {
            $("#page-wrapper").removeClass('edit-mode');
        }
        if($('.statusbar-wrapper').hasClass('edit-mode')) {
            $('.statusbar-wrapper').removeClass('edit-mode');
        }

        if ($(".launcher-screen").hasClass('edit-mode')){
            $(".launcher-screen").removeClass('edit-mode');
        }

        if ($("#indicator-home").hasClass('edit-mode')) {
            $("#indicator-home").removeClass('edit-mode');
        }
        if ($(".home-icons-wrapper").hasClass('fade-out')) {
            $(".home-icons-wrapper").removeClass('fade-out')
        }

        if($(".nav-buttons-wrapper").hasClass('fade-in')) {
            $(".nav-buttons-wrapper").removeClass('fade-in')
        }

        if ($(".app-drawer").hasClass('open')) {
            $(".home-icons-wrapper").addClass('fade-out');

        }

        if ($('.wallpaper-container').hasClass('open-wallpapers')) {
            updateDockIcons();
            $('.wallpaper-container').removeClass('open-wallpapers');
        }
        if ($('.widget-container').hasClass('open-widgets')) {
            updateDockIcons();
            $('.widget-container').removeClass('open-widgets');
        }
        if ($('.systemsettings-container').hasClass('open-settings')) {
            updateDockIcons();
            $('.systemsettings-container').removeClass('open-settings');
        }
        if ($('.themes-container').hasClass('open-themes')) {
            updateDockIcons();
            $('.themes-container').removeClass('open-themes');
        }

        if($('.googlefolder-container').hasClass('open-folder')) {
            $('.googlefolder-container').removeClass('open-folder')
        }

        // This is the section handles the favapps manager
        if($('.favapps-global-wrapper').hasClass('edit-favorites')) {
           // closeFavAppsManager();
            //setTimeout(scrollToHome, 100);

        var hideCard = false;

        var favList = $('#favapps-selected li')
        var newFavAppList ='';
        if (favList.length > 0) {
            if ($('.favapps-emptymsg-global-container').hasClass('show-msg-container')){
                $('.favapps-emptymsg-global-container').addClass('show-msg-container');
            }
            // If there is one fav app add the message
            $('.zero-favappp-message').removeClass('show-zeromsg');
            $('#favapps-launch-hotspot2').removeClass('.show-launch-hotspot')
            $('#favapps-launch-hotspot').css('display', 'block');

            $('.favapps-global-wrapper').removeClass('edit-favorites');
            $('#minus1').removeClass('blur');

            // var favList = $('#favapps-selected li');

            for (var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);
            if (pageScroll.x> -100) {
                setTimeout(function(){
                    pageScroll.scrollTo(-412, 0, 1000);
                }, 100)
            }
            showHideWidgetMoreButton();
        } else if (favList.length==0){

            for(var i=0; i<favList.length; i++) {
              var imgSrc = $(favList[i]).children().attr('src');
              var caption = $(favList[i]).attr('data-favapp-name')

               if (imgSrc == 'gp-icons/eui-appdrawer1.png') {
                    newFavAppList +=  '<div class="favapps-icon-wrapper" id="favapps-appdrawer"><img class="favapp-shortcut" src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                } else {
                    newFavAppList +=  '<div class="favapps-icon-wrapper"><img class="favapp-shortcut"  src="'+imgSrc+'"><span>'+caption+'</span></div>'  
                }
            }
            $('.favapps-icon-wrapper').remove();
            $('#favapps-wrapper').prepend(newFavAppList);
            showHideWidgetMoreButton();

            $('.favapps-emptymsg-global-container').addClass('show-msg-container');

            $('#button-continue').on('tap', function(){
                hideCard = false;
                receiveFeedback = true
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');

                // handle the text
                $('.zero-favappp-message').addClass('show-zeromsg');
                $('#favapps-launch-hotspot').css('display', 'none');
                // need to handle the height of the card and add hotspot

                $('#favapps-launch-hotspot2').addClass('show-launch-hotspot');
                if (pageScroll.x> -100) {
                    setTimeout(function(){
                        pageScroll.scrollTo(-412, 0, 1000);
                    }, 100)
                }

            }) 

            $('#button-hidecard').on('tap', function(){
                hideCard = true;
                receiveFeedback = true;
                $('#widget-recentapps').addClass('widget-off');
                $('#editwidget-favapps').addClass('widget-off');
                var wl = getWidgetsLength();
                    $('#widget-scroller').css('height', wl+'px');
                    widgetScroll.refresh();
                $('.favapps-global-wrapper').removeClass('edit-favorites');
                $('#minus1').removeClass('blur');
                if (pageScroll.x > -100) {
                    setTimeout(function(){
                        pageScroll.scrollTo(-412, 0, 1000);
                    }, 100)
                }
            })
        }
        }

        //Dimiss LeLauncher Settings
        if ($('.lelauncher-settings-container').hasClass('open-lesettings')) {
            $('.lelauncher-settings-container').removeClass('open-lesettings');
            $('.nav-buttons-wrapper').removeClass('blur');
            $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');


            $('#minus1').removeClass('blur');
            $('#zero').removeClass('blur');
            $('#plus1').removeClass('blur');
            $('.widget-manager .settings-container').removeClass('open-subpage');
            $('#lelauncher-settings-main-b').removeClass('open-subpage');
            $('#lelauncher-settings-main-b').removeClass('blur')
            $('#lelauncher-feedback').removeClass('open-subpage');
            $('#lelauncher-about').removeClass('open-subpage');
            $('#leeco-feedback').removeClass('highlight')
            $('#leeco-about').removeClass('highlight')
        }
        //Dismiss LeLauncher 2
        if($('.lelauncher-settings-container2').hasClass('open-lesettings')) {
            $('.lelauncher-settings-container2').removeClass('open-lesettings');

            $('#lelauncher-settings-main2').removeClass('open-subpage');
            $('#lelauncher-feedback2').removeClass('open-subpage');
            $('#lelauncher-about2').removeClass('open-subpage');
            $('.widget-settings-menu2').removeClass('open-lelauncher');
            $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
            //$('.widget-settings-menu').css('display', 'block');
            setTimeout(showCrossMenu, 400)
            $('.widget-manager').removeClass('blur')
            $('#lelauncher-settings-main2').removeClass('blur');

            $('.leecosetting-style').removeClass('highlight')
            $('#leeco-feedback2').removeClass('highlight')
            $('#leeco-about2').removeClass('highlight')


            $('.nav-buttons-wrapper').removeClass('blur')
            $('#indicator-home').removeClass('blur2')
               
            $('#zero').removeClass('blur')
            $('#plus1').removeClass('blur');
            $('.widget-manager .settings-container').removeClass('open-subpage')
            removeBlurCards()
        }


        if ($('.widget-settings-menu').hasClass('blur')) {
            $('.widget-settings-menu').removeClass('blur');
        }

        if ($('.controlpanel-container').hasClass('open-controls')) {
            //$('.controlpanel-container').removeClass('open-controls')
        }
        if ($('.googlenow-container').hasClass('open-googlenow')) {
            $('.googlenow-container').removeClass('open-googlenow')
        }

    });

    function updateDockIcons() {
        $('#page-wrapper').removeClass('edit-mode');
        $('.launcher-screen').removeClass('edit-mode');
        $(".home-icons-wrapper").removeClass('fade-out');
        $('.nav-buttons-wrapper').removeClass('fade-in')
    }

    // HARDWARE BACKBUTTON

    $("#hardware-back").on('tap', function(){
       //dismissCardManager();
       console.log("target widget app tapped")
        $('.widget-settings-menu').removeClass('open-settings')
            var wl = getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh();
            pageScroll.enable();
        $('.lightbox-container').fadeOut();
        if($('#page-wrapper').hasClass('edit-mode')) {
            $('#page-wrapper').removeClass('edit-mode');
            $('.launcher-screen').removeClass('edit-mode');
            $('#indicator-home').removeClass('edit-mode');
            $('.nav-buttons-wrapper').removeClass('fade-in');
            $('.home-icons-wrapper').removeClass('fade-out')
        }

        if($('.target-app-container').hasClass('gotoapp')) {
            $('.target-app-container').removeClass('gotoapp');
        }
        $("#search-app").val('');
                searchApps('');
                showRecents();
                showSortingTitles();
        $('.widgets-edit-subpage').removeClass('subpage-inviewport');

        if($('.widget-targetapp-placeholder').hasClass('open-widgetapp')) {
            $('.widget-targetapp-placeholder').removeClass('open-widgetapp')
             $('.app-container').css('display', 'none');
        }


        if($('.widget-targetapp-placeholder').hasClass('open-widgetapp')) {
            $('.widget-targetapp-placeholder').removeClass('open-widgetapp')
        }
        $('.app-container').css('display', 'none');


        if($('.googlefolder-container').hasClass('open-folder')) {
            $('.googlefolder-container').removeClass('open-folder')
        }
        if($('.systemsettings-container').hasClass('open-settings')) {
            updateDockIcons();
            $('.systemsettings-container').removeClass('open-settings');
        }
        if ($(".app-drawer").hasClass('open')) {
            $('#widgets-wrapper').removeClass('blur')
            $('.widget-logo-container').removeClass('blur')
            $('.widget-settings-menu').removeClass('blur')
            pageScroll.enable();
            $(".app-drawer").removeClass('open');
            updateDockIcons()
            if ($('#zero').hasClass('blur')) {
            $('#zero').removeClass('blur');
            }
            if ($('#indicator-home').hasClass('blur2')) {
                $('#indicator-home').removeClass('blur2')
            }
            if ($('#minus1').hasClass('blur')) {
                $('#minus1').removeClass('blur');
            }
            if ($('#plus1').hasClass('blur')) {
                $('#plus1').removeClass('blur');
            }
            if ($('#blurfilter-container').hasClass('blur')){
            $('#blurfilter-container').removeClass('blur')
            }
        }

        if ($('.favapps-global-wrapper').hasClass('edit-favorites')) {
            closeFavAppsManager();
        }
            // ====== dismiss the lelauncher settings using back button
           // console.log($('.widget-manager').hasClass('show-manager') && $('.lelauncher-settings-container2').hasClass('open-lesettings') && $('#lelauncher-feedback').hasClass('open-subpage'))
            if($('.widget-manager').hasClass('show-manager') && $('.lelauncher-settings-container2').hasClass('open-lesettings') && $('#lelauncher-feedback2').hasClass('open-subpage') || $('.widget-manager').hasClass('show-manager') && $('.lelauncher-settings-container2').hasClass('open-lesettings') && $('#lelauncher-about2').hasClass('open-subpage')) {
                console.log("in sub pages")
                if ( $('#lelauncher-feedback2').hasClass('open-subpage')) {
                    $('#lelauncher-settings-main2').removeClass('blur');
                    $('#leeco-feedback2').removeClass('highlight')
                    $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                    $('#lelauncher-feedback2').removeClass('open-subpage');

                }
                if ( $('#lelauncher-about2').hasClass('open-subpage')) {
                    $('#lelauncher-settings-main2').removeClass('blur');
                    $('#leeco-about2').removeClass('highlight')
                    $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                    $('#lelauncher-about2').removeClass('open-subpage');

                }
            } else if ($('.widget-manager').hasClass('show-manager') && $('.lelauncher-settings-container2').hasClass('open-lesettings') && !$('#lelauncher-feedback2').hasClass('open-subpage')||$('.widget-manager').hasClass('show-manager') && $('.lelauncher-settings-container2').hasClass('open-lesettings') && !$('#lelauncher-about2').hasClass('open-subpage')){
                console.log('on main page&&&&&&&&&')
                $('.lelauncher-settings-container2').removeClass('open-lesettings');
                $('.widget-manager').removeClass('blur');
                // $('.highlight2').removeClass('active');
                $('.widget-settings-menu2').removeClass('open-lelauncher');
                 $('.widget-settings-menu').addClass('open-settings');
                 $('.leecosetting-style').removeClass('highlight');
                // $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                $('.widget-manager .settings-container').removeClass('open-subpage')
                setTimeout(showCrossMenu, 400)

            } else if ($('.widget-manager').hasClass('show-manager') && !$('.lelauncher-settings-container2').hasClass('open-lesettings') && !$('#lelauncher-feedback2').hasClass('open-subpage')||$('.widget-manager').hasClass('show-manager') && !$('.lelauncher-settings-container2').hasClass('open-lesettings') && !$('#lelauncher-about2').hasClass('open-subpage')) {
                $('.widget-manager').removeClass('show-manager');
                $('#widgets-wrapper').removeClass('blur')
                $('.widget-logo-container').removeClass('blur')
                $('.widget-settings-menu').removeClass('blur');
                setTimeout(showCrossMenu, 400)
                //if (pageScroll.x <-412) {
                    $('#indicator-home').removeClass('blur2')
                //}
                
            }

            //++++++++ dismiss lelauncher manager using backbutton +++++++
        if($('.lelauncher-settings-container').hasClass('open-lesettings') && $('#lelauncher-feedback').hasClass('open-subpage') || $('.lelauncher-settings-container').hasClass('open-lesettings') && $('#lelauncher-about').hasClass('open-subpage')){
            if ( $('#lelauncher-feedback').hasClass('open-subpage')) {
                $('#lelauncher-settings-main-b').removeClass('open-subpage');
                $('#lelauncher-settings-main-b').removeClass('blur');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');

                $('#lelauncher-feedback').removeClass('open-subpage');
                $('#leeco-feedback').removeClass('highlight');
                $('.lesettings-backbutton').removeClass('open-subpage');
                if (pageScroll.x >-412) {
                    //blurCards();
                }
            }

            if($('#lelauncher-about').hasClass('open-subpage')) {
                $('#lelauncher-settings-main-b').removeClass('open-subpage');
                $('#lelauncher-settings-main-b').removeClass('blur');
                $('.main-innerscrim.lelauncher-settings-inner').removeClass('open-subpage');
                $('#lelauncher-about').removeClass('open-subpage')
                $('#leeco-about').removeClass('highlight');
                $('.lesettings-backbutton').removeClass('open-subpage');
                if (pageScroll.x >-412) {
                    //blurCards();
                }
            }
         } else {

                $('.lelauncher-settings-container').removeClass('open-lesettings')
                $('#blurfilter-container').removeClass('blur')
                $('.nav-buttons-wrapper').removeClass('blur')
                $('#indicator-home').removeClass('blur2')
                $('#minus1').removeClass('blur')
                $('#zero').removeClass('blur')
                $('#plus1').removeClass('blur');
         
         }


     });
    // Taphold
    // $('#hardware-controlpanel').on('tap', function(){

    //     document.location.reload(true);
    // });

        
    $('#hardware-home').on('taphold', function(){
        $('.googlenow-container').addClass('open-googlenow')
    })


}); //end of document ready function 

// ================== !!!!! All the constance used in the document ========================

// console.log($('.apps-recents-wrapper.hide-recents')).css('animation')
var DRAWER_RECENTS_HIDETIME = 100;

var app_categories =['Communication & Social', 'Games', 'Health &Fitness', 'Music & Video', 'News & Media', 'Productivity', 'Shopping', 'Sports', 'Tools & Utilities', 'Travel & Local'];

    function hideTitleAll() {
        $('#title-all').fadeOut(100);
    }
    function showTitleAll(){
        $('#title-all').fadeIn(100);
    }

    function hideRecents() {
       $('.apps-recents-wrapper').removeClass('show-recents').addClass('hide-recents');

    }
    function showRecents() {
        $('.apps-recents-wrapper').removeClass('hide-recents').addClass('show-recents');
    }

    function searchApps(keyword) {
        //hideSortingTitles();
        $("a.thumb").each(function() {
            var search_term = $(this).attr("data-name");
            var searchRegex = new RegExp("^"+keyword, "i");
            if (search_term.search(searchRegex) != -1) {
                $(this).addClass("show-app").removeClass("hide-app")
                //console.log("searching apps");
                //drawerScroll.scrollTo(0,0)
            } else {
                $(this).addClass("hide-app").removeClass("show-app")
            }
        });

        if ($('a.thumb.show-app').length==0) {
            $('.search-results').fadeIn(500).html("No apps found matching the search term")
        } else {
            $('.search-results').fadeOut(500)
        }
        positionApps();
       

    } //end of sorting app function

    function updateDrawScrollHeight() {
        var appsNo = $('a.thumb.show-app').length;
        //console.log('show apps number is: ', appsNo)
        var appsHeight = parseInt($('a.thumb.show-app').length) * 90
        if (appsNo<= 16) {
            $('#drawer-scroller').css('height', '525px')
        } else {
            $('#drawer-scroller').css('height', '1400px')
        }
        //drawerScroll.refresh();
    }

    function moveUpdrawerContainer() {
        $("#drawer-wrapper").addClass("search-mode")
    }
    function moveDowndrawerContainer() {
        $("#drawer-wrapper").removeClass("search-mode")
    }
    function hideSortingTitles() {
        $('.drawer-tabs').addClass('hide-tabs')
    }
    function showSortingTitles() {

        $('.drawer-tabs').removeClass('hide-tabs')
    }


    function sortAlpha() {
        var appList=$('.apps-wrapper');

        var app = $('.apps-wrapper a');

        var thumbs=$("a.thumb");
            if(thumbs.parent().is('div.category_wrapper')) {
                thumbs.unwrap();
                $('p.app-category-title2').remove();
            }
        app.sort(function(a, b) {
                var an=a.getAttribute('data-alpha'),
                bn=b.getAttribute('data-alpha');
                if(an>bn) {
                    return 1
                }
                if(an<bn) {
                    return -1
                }
                return 0
        });

        app.detach().appendTo(appList)
    }

    function sortDates() {
        var appList=$('.apps-wrapper');
        var app = $('.apps-wrapper a');
        var thumbs=$("a.thumb");
            if(thumbs.parent().is('div.category_wrapper')) {
                thumbs.unwrap();
                $('p.app-category-title2').remove();
            }

        app.sort(function(b, a) {
                var ad = new Date(a.getAttribute('data-date')).getTime();
                    bd = new Date(b.getAttribute('data-date')).getTime();
                if(ad>bd) {
                    return 1
                }
                if(ad<bd) {
                    return -1
                }
                return 0
        });

        app.detach().appendTo(appList);
        positionApps()
     }

    function positionAppsOnLoad() {
        $(".thumb.hide-app").css({
                'display': "none",
                'top': '0px',
                'left': '0px'
        });
        var containerWidth = $('.apps-wrapper').width();
            thumb_row = 0,
            thumb_column = 0,
            thumbWidth = $('a.thumb:first-child').outerWidth(),
            thumbHeight = $('a.thumb:first-child').outerHeight(),
            max_row = Math.floor(containerWidth/thumbWidth);

        $('a.thumb.show-app').each(function(index){
 
            var remainder = (index%max_row)/100,
                maxIndex = 0;
                if(remainder == 0 ) {
                    if(index !=0) {
                        thumb_row +=thumbHeight;
                    }
                    thumb_column = 0
                } else {
                    thumb_column += thumbWidth;
                }

                $(this).css('display', 'inline-block').css({
                    'opacity': 1,
                    'top': thumb_row +'px',
                    'left': thumb_column + 'px'
                })

            })
        }
        var st =350;
    function positionApps() {

        $(".thumb.hide-app").animate({
            opacity: 0
        }, 0, function(){
            $(this).css({
                'display': "none",
                'top': '0px',
                'left': '0px'

            })
        })
        var containerWidth = $('.apps-wrapper').width();
            thumb_row = 0,
            thumb_column = 0,
            thumbWidth = $('a.thumb:first-child').outerWidth(),
            thumbHeight = $('a.thumb:first-child').outerHeight(),
            max_row = Math.floor(containerWidth/thumbWidth);

        $('a.thumb.show-app').each(function(index){
 
            var remainder = (index%max_row)/100,
                maxIndex = 0;
                if(remainder == 0 ) {
                    if(index !=0) {
                        thumb_row +=thumbHeight;
                    }
                    thumb_column = 0
                } else {
                    thumb_column += thumbWidth;
                }

                $(this).css('display', 'inline-block').animate({
                    'opacity': 1,
                    'top': thumb_row +'px',
                    'left': thumb_column + 'px'
                },  st, function(){
                    //console.log("==== animate done")
                    updateDrawScrollHeight();
                })

            })
        }



//=================================SROLLER=====================================================
// {easing: 'easeInQuad'}

var pageScroll, widgetScroll, cardScroll, wallScroll, galleryScroll, favAppsScroll,favAppsBlurScroll;
document.addEventListener('touchmove', function (e) { e.preventDefault();}, false);

function showScrollInfo(){
   // console.log(pageScroll.options)
}
//snap: 'section.launcher-screen'

function setPageScroll() {
    setTimeout(function () {
    pageScroll = new IScroll('#page-wrapper', { startX: -412, scrollX: true, scrollY: false, momentum: false, snap: true, snapThreshold: 1, snapSpeed: 400, mouseWheel: true, tap: true});
    pageScroll.on('scrollStart', function(){
    });

    
    pageScroll.on('scrollEnd', function(){
        var pageWidth = $('.launcher-screen').width(),
        scrollOffset = this.x,
        totalPages = $('.launcher-screen').length;
        var scrollerWidth = $('#scroller').width()

        var index =Math.abs(Math.round(scrollOffset/pageWidth) -1);
        //console.log('page width is: ', scrollerWidth)
        for(var i=0; i<totalPages; i++) {
            if(index==1 && scrollerWidth >824) {
                if(!$('#page-wrapper').hasClass('edit-mode')){
                $('#indicator-home').css('display', 'none');

                $('#blurfilter-container').addClass('blur');
                } else {
                    $('#indicator-home li').removeClass('active');
                    $('#p'+ index).addClass('active');
                }
                $('.home-icons-wrapper').css('display', 'none');
        } else {
            $('#indicator-home').css('display', 'block');
            $('.home-icons-wrapper').css('display', 'block');
            $('#indicator-home li').removeClass('active');
            $('#p'+ index).addClass('active');
            $('#blurfilter-container').removeClass('blur');

            }
        }
    })//end of scroll end

    }, 300)
}

// snap: 'div.launcher-screen',

function setWidgetScroll() {

    widgetScroll = new IScroll('#widgets-wrapper', {scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });

}
function setWidgetSettingsScroll() {
    widgetSettingsScroll = new IScroll('#widget-settings-wrapper', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });
}

function setToprowScroll() {
    toprrowScroll = new IScroll('#toprow-wrapper', { scrollX: true, scrollY: false, mouseWheel: true, bindToWrapper: true });
}
function setBottomrowScroll() {
    toprrowScroll = new IScroll('#bottomrow-wrapper', { scrollX: true, scrollY: false, mouseWheel: true, bindToWrapper: true });
}

function setRecentpageScroll() {
    recentpageScroll = new IScroll('#recentpages-wrapper', { scrollX: true, scrollY: false, mouseWheel: true, bindToWrapper: true });
}
function setFavAppsScroll() {
    favAppsScroll = new IScroll('#favapps-all-container', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });

    // favAppsScroll.on('scrollStart', function(){
    //     var upAmount=favAppsScroll.y
    //     favAppsBlurScroll.scrollTo(0,favAppsScroll.y)
    //     console.log("favScroll is working", favAppsScroll.y, " favAppsBlurScroll is ", favAppsBlurScroll.y)
    // });
}

function setFavAppsBlurScroll() {
    favAppsBlurScroll = new IScroll('#favapps-all-container-blur', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });
}

function setLightboxScroll() {
    LightboxScroll = new IScroll('#lightbox-content-wrapper', { scrollX: true, scrollY: false, snap: 'div.lightbox-content', mouseWheel: true, bindToWrapper: true });
}

function setWallScroll() {
    //console.log("I am inside wall scroller", $('#wall-wrapper'))
    wallScroll = new IScroll('#wall-wrapper', { scrollX: true, scrollY: false, snap: 'li.wall-item', mouseWheel: true, bindToWrapper: true });
}

function setGallaryScroll() {
    galleryScroll = new IScroll('#gallery-wrapper', { scrollX: true, scrollY: false, snap: 'li.photo-item', snapSpeed: 400, mouseWheel: true, bindToWrapper: true

     });
}

function setDrawerScroller() {
    drawerScroll = new IScroll('#drawer-wrapper', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true, scrollbars: 'custom' });
}


function setHomePager(obj){
    obj.on('scrollEnd', function(){
    var pageWidth = $('.launcher-screen').width(),
    scrollOffset = obj.x,
    totalPages = $('.launcher-screen').length;
    //console.log("pageWidth is: ", pageWidth, "scrollOffset ", scrollOffset, "totalPages ", totalPages);
    var index =Math.abs(Math.round(scrollOffset/pageWidth) -1);

    for(var i=0; i<totalPages; i++) {
        if(index==1 ) {
        //if(!$('#page-wrapper').hasClass('edit-mode')) {
            console.log("#page wrapper in minus 1 page")
            $('#indicator-home').css('display', 'block')
        //}
    } else {
        $('#indicator-home').css('display', 'block')
        $('#indicator-home li').removeClass('active');
        $('#p'+index).addClass('active')
        }

    }
    })//end of scroll end
}

function getDraggablePosition(obj) {
    var offset = obj.offset();
    var xPos = offset.left;
    var yPos = offset.top;
    return xPos;
}

function createGrid(size) {
    var i,
    sel = $('.drop-target-wrapper'),
        height = sel.height(),
        width = sel.width(),
        ratioW = Math.floor(width / size),
        ratioH = Math.floor(height / size);

    for (i = 0; i <= ratioW; i++) { // vertical grid lines
      $('<div />').css({
            'top': 0,
            'left': i * size,
            'width': 1,
            'height': height
      })
        .addClass('gridlines')
        .appendTo(sel);
    }

    for (i = 0; i <= ratioH; i++) { // horizontal grid lines
      $('<div />').css({
            'top': i * size,
            'left': 0,
            'width': width,
            'height': 1
      })
        .addClass('gridlines')
        .appendTo(sel);
    }

    $('.gridlines').show();
}
function getScreenInfo(obj) {

  var parentScreen=$(obj).closest('.launcher-screen');
 // console.log('parentScreen is: ', parentScreen)
  var nextScreen = $(parentScreen).next('.launcher-screen');
  var prevScreen = $(parentScreen).prev('.launcher-screen');
  var screens;
  parentIndex = parseInt($('.launcher-screen-row .launcher-screen').index(parentScreen));
  nextIndex = $('.launcher-screen-row .launcher-screen').index(nextScreen);
  prevIndex =$('.launcher-screen-row .launcher-screen').index(prevScreen);
  screens = {
    index: parentIndex,
    next: nextIndex,
    prev: prevIndex,
    parentPanel: parentScreen,
    nextPanel: nextScreen,
    prevPanel: prevScreen
    }
    return screens
}

function bringToViewport(i, scale, margin){
    console.log("bring to view function fired")
    pageScroll.scrollTo(-412*i, 0);
}

function setScrollerWidth(edit) {
    var screens = $('.launcher-screen').width();
    var screenNo = $('.launcher-screen').length;
    switch(edit) {
        case "noedit":
        totalWidth = screens*screenNo;
        $("#scroller").css('width', totalWidth+'px');
        break;
        case "edit":
        totalWidth = totalWidth *screenNo * 0.81 + 100;
        break;
    }

    return totalWidth;
}

function setUpGallery() {
            setGallaryScroll();
        galleryScroll.on('scrollEnd', function(){
            pageScroll.disable();
            //setup pagers
            var photoWidth = $('.photo-item').width(),
            scrollOffset = this.x,
            totalPhotos = $('.photo-item').length;
            var index =Math.abs(scrollOffset/photoWidth -1);

            for(var i=0; i<totalPhotos; i++) {
                $('#indicator li').removeClass('active');
                $('#i'+index).addClass('active')
            }
        });
}

function formatDate() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        months2 = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        days2 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    //return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
    var today;
    today = {
        minute: minutes,
        hour: hours,
        ampm: ampm,
        day: d.getDate(),
        weekday: days[d.getDay()],
        weekday2: days2[d.getDay()],
        month: months[d.getMonth()],
        month2: months2[d.getMonth()],
        year: d.getFullYear()

    }
    //return formattedDate;

    // $('.time-display').text(today.hour+':'+today.minute);
    // $('.calendar-weekday').text(today.weekday);
    // $('.calendar-day').text(today.day);

    // $('#widgetbanner-time').text(today.hour+':'+today.minute);
    // $('#widgetbanner-date').text(today.weekday2+', '+ today.month2+' '+today.day);
}


function getLiveWeather() {
    if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
        loadWeather(position.coords.latitude + ',' + position.coords.longitude)

    });
    } else {
    loadWeather("San Jose, CA", "")
    }

    function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: "c",
        success: function(weather) {
            city = weather.city;
            temp =weather.temp +"&deg;";
            wcode = '<img class="weathericon" src="weathericons/'+ weather.code + '.svg">';
            wind ='<p>' + weather.wind.speed +'</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity +"%";
            $('.location').text(city);
            $(".temperature").html(temp);
            $('.climate_bg').html(wcode);
            $('.windspeed').html(wind);
            $('.humidity').text(humidity);
        },
        error: function(error){
            $('.error').html('<p>'+error+'</p>')
            
        }
    })
}

}

function populateNotifications() {
    // generate a random number between 1-30
    var ranNo1 = Math.floor(Math.random() * 10) + 1,
        ranNo2 = Math.floor(Math.random() * 20) + 1,
        ranNo3 = Math.floor(Math.random() * 5) + 1,
        ranNo4 = Math.floor(Math.random() * 10) + 1;
    $('#phone.notification-no').text(ranNo1)
    $('#textmsg.notification-no').text(ranNo2)
    $('#googleplaystore.notification-no').text(ranNo3)
    $('#googlefolder.notification-no').text(ranNo4)

}

// function widget more-content
function showHideWidgetMoreButton() {

    var favappsLen = parseInt($('.favapp-shortcut').length);
    //console.log("favappsLen is: ", favappsLen)

    // if (favappsLen == 0) {
    //         $('#favapps-wrapper').append('<p class="nofavapps-msg">click here to add shortcut of your favapps</p>');
    //         $('#widget-recentapps .more-content').css('display', 'none');
    //         $('#widget-recentapps').removeClass('show-more')

    // } 

    if( favappsLen <=4) {
        if (favappsLen == 0) {
            console.log("favappsLen == 0", favappsLen == 0);
            $('p.nofavapps-msg').remove();
            $('#favapps-wrapper').append('<p class="nofavapps-msg">Click here to add shortcut of your favapps</p>');
        } else {
            $('.nofavapps-msg').remove();

        }
        $('#widget-recentapps .more-content').css('display', 'none');
        $('#widget-recentapps').removeClass('show-more')
    } else {
        console.log("more than 4 favapps show")
        $('.nofavapps-msg').remove();
        if ($('#widget-recentapps .more-content').hasClass('less')) {
            $('#widget-recentapps .more-content').removeClass('less');
        }
        $('#widget-recentapps .more-content').css('display', 'block');
    }
}

function getWidgetsLength() {
    var totalLength = parseInt($('.widget-banner').css('height'));
    var noWidgets = $('.widget-card').length;
    var widgetsList = $('.widget-card');
    var widgetsOffList = $('.widget-card.widget-off');
    var noWidgetsOff = $('.widget-card.widget-off').length;

    for(var i=0; i<noWidgets; i++) {
        totalLength += parseInt($(widgetsList[i]).outerHeight())
    }
    totalLength = totalLength + noWidgets *10;

    for(var i=0; i<noWidgetsOff; i++) {
        totalLength -= parseInt($(widgetsOffList[i]).outerHeight())
        console.log(totalLength)
    }
    // console.log("The total length of the widgets are: ", totalLength)
    return totalLength + 100;
}

(function() {
    
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {   string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {       // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {       // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ]
    
    };
    
    BrowserDetect.init();
    
    window.$.client = { os : BrowserDetect.OS, browser : BrowserDetect.browser };
    
})();

(function($){
    
    $.onfullscreen = function(){return $.onfullscreen.was_fullscreen}
    
    
    $.onfullscreen.is_fullscreen = function(){
        return window.innerHeight == screen.height && window.innerWidth == screen.width;
    };
    
    ( $.browser.mozilla || ( $.browser.msie && ('9' == $.browser.version.toString()[0]) )) && ($.onfullscreen.is_fullscreen = function(){
        var wih = window.innerHeight, sh = screen.height
        return ( wih >= (sh - 5) ) && window.innerWidth == screen.width;
    });
    
        
    $.onfullscreen.was_fullscreen = $.onfullscreen.did_resize = false;
    
    
    $.onfullscreen.prototype.check_resize_interval = setInterval(function(){
        if($.onfullscreen.did_resize){
            $.onfullscreen.did_resize = false;
            var check_against = $.onfullscreen.is_fullscreen();
            if($.onfullscreen.was_fullscreen != check_against)
                $(window).trigger('fullscreen', $.onfullscreen.was_fullscreen = check_against);
        }
    }, 250);
    
    
    $(window).bind('resize', function(){
        $.onfullscreen.did_resize = true;
    }).resize();

})(jQuery);