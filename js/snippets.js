            widgetSettingsScroll.on('scrollEnd', function(){
                $('#edit-widgets').sortable({
                    enabled:true,
                    scroll: false,
                    start:function(e, ui){
                        console.log("Start!!!")
                        widgetSettingsScroll.disable();
                        $(ui.item).addClass("cardThumb-highlight")
                    },
                    stop: function(e, ui){
                        widgetSettingsScroll.enable();
                        $(ui.item).removeClass("cardThumb-highlight");
                        $('#edit-widgets').sortable('destroy')
                    }
                })

            })
            widgetSettingsScroll.on('scroll', function(){
                $('#edit-widgets').sortable('destroy')
            })