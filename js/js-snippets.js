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