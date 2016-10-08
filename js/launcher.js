$(function() {

    var os = $.client.os;

    if (os == "Mac") {
    } else {
        window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false; }
    };
    
    $('#reload-button').on('tap', function(){
        document.location.reload(true);
    })
    //setFontScroll()

//==================== Cordova Device ready
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        StatusBar.hide();

    }

    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() {
        $('.quickaccess-container').removeClass('open-quickaccess');
        if ($( "#appdrawer" ).hasClass('open-appdrawer')) {
            $( "#appdrawer" ).removeClass('open-appdrawer')
        }
    }

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
        document.body.webkitRequestFullscreen();

   }, false);

   $(window).bind('fullscreen', function(ev, is_fullscreen){

    });
    
    setWidgetScroll();

    // OPEN app drawer

    $('#appdrawer-button').on("tap", function(){
        if(!$( "#appdrawer" ).hasClass('open-appdrawer')) {
            $( "#appdrawer" ).attr('style', '');
            $(".appdrawer-container").attr('style', '');
            $('.home-icons').attr('style', '');
            $( "#appdrawer" ).addClass('open-appdrawer');
        }
    });


    $('#notification-center').resizable({
        handles: 's',
        minHeight:20,
        maxHeight: 548,
        resize: function(event, ui) {
                ui.size.width = ui.originalSize.width;
            }

    })

var appdrawerAlpha;
        $( "#appdrawer" ).resizable({
            handles: 'n',
            minHeight:91,
            maxHeight: 732,
            start: function(event,ui){
               $('#appdrawer').css('background-position', 'center bottom;');
            },
            resize: function(event, ui) {
                ui.size.width = ui.originalSize.width;
                $('#appdrawer').addClass('add-blurbg');

                var appdrawerTop = ui.position.top;
                var appdrawerOpacity = 1 - appdrawerTop /641;
                var dockOpacity = appdrawerTop /641-0.5;
                var blurValue = (1 - appdrawerTop /641) * 20 +'px';
                var blurContainerTop =  732-ui.position.top -10 + 'px';

                var drawerBgOpacity = 1;
                


                $(".appdrawer-container").css("opacity", appdrawerOpacity)
                $('.home-icons').css("opacity", dockOpacity);
                $('.appblur-container ').css("height", blurContainerTop)
                appdrawerAlpha = appdrawerOpacity;

            },
            stop: function(e,ui) {
              var currentTop = ui.position.top;

                if($( "#appdrawer" ).hasClass('open-appdrawer')) {
     
                    $( "#appdrawer" ).removeClass('open-appdrawer')
                }

              if(currentTop < 366) {

                $('#appdrawer::before').css('opacity', 1);
                $('#appdrawer').animate({'height': '732px', 'top': '0'},250);

                $(".appdrawer-container").css('opacity', appdrawerAlpha).animate({"opacity": 1}, 250, function(){
                    console.log("animation completed: ", $(".appdrawer-container").css('opacity'))
                })
                $('.home-icons').animate({"opacity": 0}, 250) ;
    
              
              } else {
                $('#appdrawer').animate({'height': '91px', 'top': '641px'},250)
                $(".appdrawer-container").css('opacity', appdrawerAlpha).animate({"opacity": 0}, 250)
                $('.home-icons').css("opacity", 1) ;
                $('.appdrawer-bg').css('opacity', 0)
                $('#appdrawer').removeClass('add-blurbg')

              }
            }
          });



    

    widgetScroll.on('scroll', updatePosition);
    widgetScroll.on('scrollEnd', showDock);
    function updatePosition(){
        if (this.y < 0 && pageScroll.x <= 0) {
           
            $('#appdrawer').addClass('slide-down')
        } else {
            $('#appdrawer').removeClass('slide-down')
        }
    }
    function showDock(){
        $('#appdrawer').removeClass('slide-down')
    }


    // })



 // ===================== EUI APPS TAPPED TO ADD TO THE RECENT
    
    // code dealwith add an recentapp card
    $('.qa-recentapps').on("tap", function(){
        var appName = $(this).attr('data-qa-recentapps')
        if ($.inArray(appName, recentOpenedApps) != -1){
        } else {
            recentOpenedApps.push($(this).attr('data-qa-recentapps'));
        }
        $('.quickaccess-app-container').addClass('open-quickaccess-app');
        $('.quickaccess-app-container p').text(appName)
    })

    // #####===========================  STYLE CONTROL CENTER  =====================================####


    $('#hardware-controlpanel, #phone-button').on('click', function(){
        $('.quickaccess-container').addClass('open-quickaccess');
        setStylesScroller();
   
        $('.bluropacity').on('tap', function(e){
            $('.bluropacity').removeClass('selected');
            $(e.target).addClass('selected')
            var alphavalue=$(e.target).attr('data-alpha');
            blurBgOpacity = alphavalue;
            $('#blurfilter-container').css('opacity', blurBgOpacity)
        });

        $('.bglayercolor').on('tap', function(e){
            $('.bglayercolor').removeClass('selected');
            $(e.target).addClass('selected')
            var bghex=$(e.target).attr('data-hex');
            $('body').css('background-color', bghex)
        });

        $( "#cardscrim-opacity" ).slider({
            range: "min",
            value: 70,
            min: 1,
            max: 100,
            slide: function( event, ui ) {

            scrimValue = ((ui.value)*0.01).toFixed(2);
            console.log('ui.value is: ', ui.value)
            $('#scrim').text(scrimValue);
            var newBg = 'rgba(56,56,56,'+scrimValue +')'
                $('.widget-content-container').css('background', newBg)
            }
        });



        $('.bgstyle-thumb').on('tap', function(e){
            $('.bgstyle-thumb').removeClass('selected');
            $(e.target).addClass('selected')
            var bgImg = $(e.target).attr('data-bgimage');
            var blurImg = $(e.target).attr('data-blurimage')

            $('#sharp-container').css({
                'background-image': bgImg
            });
            $('#blurfilter-container').css({
                'background-image': blurImg
            });
            if (bgImg == 'url(images-eui6/bg-whitecrack.jpg)' || bgImg == 'url(images-eui6/bg-snow.jpg)') {
                $('#zero, #plus1').css('color', '#000')
            } else {
          
               $('#zero, #plus1').css('color', '#fff')
            }
        })

        $('.bgstyle-color').on('tap', function(e){
            $('.bgstyle-color').removeClass('selected');
            $(e.target).addClass('selected')
            var bgColor = $(e.target).attr('data-bgcolor');
            $('#blurfilter-container').css({
                'background-image': 'none',
                'background-color': bgColor
            })
            if(bgColor=="#ffffff") {
                $('#global-container').css('color', '#000')
            } else {
                $('#global-container').css('color', '#fff')
            }
        });
    })

    $('#styles-closebutton').on('tap', function(){
         $('.quickaccess-container').removeClass('open-quickaccess');
    })
    // --------------------- LONG PRESS START EDIT MODE ------------------------------------ 

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
            //setTimeout(blurZero, 250)
        });


    //======================= WIDGETS EDITMODE ==============================
    // CUSTOMIZE WIDGET
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

        $(this).toggleClass('open-settings');

        if(!$('.widget-settings-menu').hasClass('open-settings')){

            $('.home-icons-wrapper').removeClass('slide-down');
             widgetScroll.enable();
           // removeBlurCardsNoMenu();

            $('.widget-settings-menu').removeClass('open-settings')
            $('.widget-manager').removeClass('show-manager');
            var wl = getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh();
            pageScroll.enable();

            // ================get the order of the widget lists

            var widgetCards = [];
            var widgetThumbs = $('#edit-widgets li');
            var widgetThumbsLen = widgetThumbs.length;

            //console.log("$widgetThumbs length is: ", widgetThumbs.length)
            for (var i=0; i<widgetThumbs.length; i++){
                var widgetId = $(widgetThumbs[i]).attr('data-widgetid')
                widgetCards.push([i, $(widgetThumbs[i]).attr('data-widgetid')])
                $('#'+ widgetId).attr('datano', parseInt(i));
            }

            var cards = $('.widget-card');
                $('.widget-card').detach()
            for (var i=0; i<widgetThumbsLen; i++ ){

                for (var j=0; j< widgetThumbsLen; j++) {
                    var cardsDatano = parseInt($(cards[j]).attr('datano'));
                    if (i == cardsDatano) {
                        $('#widgets-content-wrapper').append($(cards[j]));
                        break;
                    }
                }
            }

        } else {
            // HANDEL WIDEGT SETTINS SCROLLER AND SORTING
            $('.widget-manager').addClass('show-manager');

            pageScroll.disable();
            widgetScroll.disable();
            setWidgetSettingsScroll();
            $('.home-icons-wrapper').addClass('slide-down')
            //setTimeout(blurCardsNoMenu, 400)
            $('#widget-settings-wrapper').on('taphold', function(){
                widgetSettingsScroll.disable()
                console.log("taphold")
                    $('#edit-widgets').sortable({
                    enabled:true,
                    scroll: false,
                    start:function(e, ui){
                        console.log("Start!!!")
                        widgetSettingsScroll.disable();
                        $(ui.item).addClass("cardThumb-highlight")
                    },
                    stop: function(e, ui){
                        $(ui.item).removeClass("cardThumb-highlight");
                        $('#edit-widgets').sortable('destroy');
                        widgetSettingsScroll.enable();
                    }
                })
            })

        } // outer else
    }); // on tap


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

    // ================== FAVAPPS SORTING ====================
    setFavAppsScroll();

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

        if (!$(this).hasClass('favorite')){
            var favapps = $('#favapps-selected li');

            var last = $('#favapps-selected li').last();

            if ($( "#favapps-selected li" ).length > 0) {
                if ($("#favapps-selected li").length < 8) {
                    console.log("apps smaller than 8 condition met: ")

                    var imgSrc = "images-eui6/" + $(this).attr('data-imgsrc');
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

                var imgSrc = "images-eui6/" + $(this).attr('data-imgsrc');
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
        console.log("button clicked")
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

    // =================== HARDWARE BUTTON DISMISSES APP DRAWER ===================

    $("#hardware-home").on('tap', function(){
        //console.log("!$('.favapps-global-wrapper').hasClass('edit-favorites') ", !$('.favapps-global-wrapper').hasClass('edit-favorites'))
        // If you are on plus 1 page
        $('.quickaccess-container').removeClass('open-quickaccess');
        if (pageScroll.x < - 800) {
            console.log("The favApps Manager is not on")
            setTimeout(scrollToHome, 250)
        }

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
            pageScroll.scrollTo(-412, 0, 1000);
        }
        // ============ DISMISS WIDGET MANAGER ===================
       if ($('.widget-settings-menu').hasClass('open-settings') || $('.widget-settings-menu').css('display', 'block')){
            removeBlurCardsNoMenu ()

            $('#blurfilter-container').removeClass('blur');
            $(".home-icons-wrapper").css('display', 'block');
            if ($('.widget-settings-menu').hasClass('open-settings')) {
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

        if ($('.widget-settings-menu').hasClass('blur')) {
            $('.widget-settings-menu').removeClass('blur');
        }

        if ($('.controlpanel-container').hasClass('open-controls')) {
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
 $('.quickaccess-container').removeClass('open-quickaccess');
        $('.widget-settings-menu').removeClass('open-settings');
        $('.widget-manager').removeClass('show-manager');
        $('#indicator-home').removeClass('blur2');
            var wl = getWidgetsLength();
            $('#widget-scroller').css('height', wl+'px');
            widgetScroll.refresh();
            pageScroll.enable();



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

     });

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

        var appsHeight = parseInt($('a.thumb.show-app').length) * 90
        if (appsNo<= 16) {
            $('#drawer-scroller').css('height', '525px')
        } else {
            $('#drawer-scroller').css('height', '1400px')
        }
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

var blurBgOpacity = 0.75
function setPageScroll() {
    setTimeout(function () {
    pageScroll = new IScroll('#page-wrapper', {probeType: 3, startX: -412, scrollX: true, scrollY: false, momentum: false, snap: true, snapThreshold: 1, snapSpeed: 400, mouseWheel: true, tap: true});

    pageScroll.on('scroll', function(){ 
        if(this.x >= 0) {
            pageScroll.x=0
        }          
          if (this.x> -412) {

            var sharpImageOpacity =  Math.abs((this.x)*1/412);
            var blurImageOpacity = (1- Math.abs((this.x)*1/412))*blurBgOpacity
            $('#sharp-container').css({
               'opacity': sharpImageOpacity
            });
            $('#blurfilter-container').css({
                'opacity': blurImageOpacity
            });
            var minusOpacity = 1 - Math.abs((this.x)*1/412);
            var homeDockAlpha = 0.8 - Math.abs((this.x)*1/412)*0.8 + 0.2-0.07;
            var bg;
            $('#widgets-content-wrapper, .widget-header').css('opacity', minusOpacity);

            $('.home-icons-scrim').css({
                'opacity': homeDockAlpha
            })
            } else if (this.x<= -412) {

            // $('.home-icons-wrapper').css({
            //     'background-color': 'rgba(72,71,71,0)'
            // })
            $('#blurfilter-container').css({
                'opacity': 0
            });
        }
    })


    pageScroll.on('scrollEnd', function(){
       // console.log('--------scrollend---------', this.x)
        var pageWidth = $('.launcher-screen').width(),
        scrollOffset = this.x,
        totalPages = $('.launcher-screen').length;
        var scrollerWidth = $('#scroller').width()

        var index =Math.abs(Math.round(scrollOffset/pageWidth) -1);
    
        for(var i=0; i<totalPages; i++) {
            if(index==1 && scrollerWidth >824) {
            if(!$('#page-wrapper').hasClass('edit-mode')){
                $('#indicator-home').css('display', 'none');

                } else {
                    $('#indicator-home li').removeClass('active');
                    $('#p'+ index).addClass('active');
                }
                $('.home-icons-scrim').removeClass('scroll-down');
                console.log("destroy the app drawer resizable")
                //$("#appdrawer").resizable("destroy");
                $( "#appdrawer" ).resizable({})
                $( "#appdrawer" ).resizable("destroy")

            } else {
                //not on minus1 screens
                $('#indicator-home').css('display', 'block');
                $('.home-icons-wrapper').css('display', 'block');
                $('.home-icons-wrapper').removeClass('slide-down')
                $('#indicator-home li').removeClass('active');
                $('#p'+ index).addClass('active');
                $('.home-icons-scrim').css({
                        'opacity':0
                });

            // APP DRAWER    
            $( "#appdrawer" ).resizable({
            handles: 'n',
            minHeight:91,
            resize: function(event, ui) {
                 ui.size.width = ui.originalSize.width;
                $('#appdrawer').addClass('add-blurbg');

                var appdrawerTop = ui.position.top;
                var appdrawerOpacity = 1 - appdrawerTop /641;
                var dockOpacity = appdrawerTop /641-0.5;
                var blurValue = (1 - appdrawerTop /641) * 20 +'px';
                var blurContainerTop =  732-ui.position.top -10 + 'px';

                var drawerBgOpacity = 1;
                


                $(".appdrawer-container").css("opacity", appdrawerOpacity)
                $('.home-icons').css("opacity", dockOpacity);
                $('.appblur-container ').css("height", blurContainerTop)
                appdrawerAlpha = appdrawerOpacity;

            },
            stop: function(e,ui) {
             var currentTop = ui.position.top;

                if($( "#appdrawer" ).hasClass('open-appdrawer')) {
                    $( "#appdrawer" ).removeClass('open-appdrawer')
                }

              if(currentTop < 366) {

                $('#appdrawer::before').css('opacity', 1);
                $('#appdrawer').animate({'height': '732px', 'top': '0'},250);

                $(".appdrawer-container").css('opacity', appdrawerAlpha).animate({"opacity": 1}, 250, function(){
                    console.log("animation completed: ", $(".appdrawer-container").css('opacity'))
                })
                $('.home-icons').animate({"opacity": 0}, 250) ;
    
              
              } else {
                $('#appdrawer').animate({'height': '91px', 'top': '641px'},250)
                $(".appdrawer-container").css('opacity', appdrawerAlpha).animate({"opacity": 0}, 250)
                $('.home-icons').css("opacity", 1) ;
                $('.appdrawer-bg').css('opacity', 0)
                //$('#appdrawer').css('background-size', '412px 0');
                $('#appdrawer').removeClass('add-blurbg')

              }
            }
          });
            }
        }
    })//end of scroll end

    }, 1000)
}

// snap: 'div.launcher-screen',

function setWidgetScroll() {
//probeType: 3,
    widgetScroll = new IScroll('#widgets-wrapper', { probeType: 3,scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });

}
function setWidgetSettingsScroll() {
 
    widgetSettingsScroll = new IScroll('#widget-settings-wrapper', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });
}

// function setFontScroll() {
 
//     fontScroll = new IScroll('#font-wrapper', { scrollX: true, scrollY: true, mouseWheel: true, bindToWrapper: true });
// }

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
}

function setFavAppsBlurScroll() {
    favAppsBlurScroll = new IScroll('#favapps-all-container-blur', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });
}

function setLightboxScroll() {
    LightboxScroll = new IScroll('#lightbox-content-wrapper', { scrollX: true, scrollY: false, snap: 'div.lightbox-content', mouseWheel: true, bindToWrapper: true });
}

function setWallScroll() {
    wallScroll = new IScroll('#wall-wrapper', { scrollX: true, scrollY: false, snap: 'li.wall-item', mouseWheel: true, bindToWrapper: true });
}

function setGallaryScroll() {
    galleryScroll = new IScroll('#gallery-wrapper', { scrollX: true, scrollY: false, snap: 'li.photo-item', snapSpeed: 400, mouseWheel: true, bindToWrapper: true

     });
}

function setDrawerScroller() {
    drawerScroll = new IScroll('#drawer-wrapper', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true, scrollbars: 'custom' });
}


function setStylesScroller() {
    stylesScroll = new IScroll('#quickaccess-wrapper', { scrollX: false, scrollY: true, mouseWheel: true, bindToWrapper: true });
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
            $('#indicator-home').css('display', 'block')
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


function getScreenInfo(obj) {

  var parentScreen=$(obj).closest('.launcher-screen');
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
    console.log("favappsLen is: ", favappsLen)


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
    totalLength = totalLength + noWidgets *18 ;

    for(var i=0; i<noWidgetsOff; i++) {
        totalLength -= parseInt($(widgetsOffList[i]).outerHeight())
        console.log(totalLength)
    }
    // console.log("The total length of the widgets are: ", totalLength)
    console.log('======== ', totalLength, ' ==========')
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
