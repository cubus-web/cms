// Custom Script
(function ($) {
    Drupal.behaviors.subtheme = {
    attach: function(context, settings) {

      // f2-mz: Ajax-Refresh erkennen
      $( document ).ajaxComplete(function() {
         $('#page').removeClass("invisible"); // Seite wieder einblenden, falls bei Ajax-Reload ausgeblendet
      });

	  $(document).bind('cbox_complete', function(){
		 $('#page').removeClass("invisible"); // Seite wieder einblenden, falls bei Colorbox Aufruf ausgeblendet
	  });

      // Ankerscript
      // f2-mz (16.11.15): neue Version - blendet Seite aus, solange nicht richtig geladen
      if( window.location.hash) {
          $('#page').addClass("invisible"); // Seite ausblenden
	
          $(window).load(function() {
          //
            // ANCHOR LINKS
            // When our page loads, check to see if it contains an anchor
            setTimeout(function() { // timeout-Funktion wichtig fuer IE - sonst Sprungmarken auf manchen Seiten wieder falsch...
              scroll_if_anchor(window.location.hash);
            }, 200);

            setTimeout(function() {
              $('#page').removeClass("invisible"); // Seite wieder einblenden, falls scrollTo nicht erfolgreich
            }, 600);
          });
      }

	$("#content-tabs ul.tabs li a:contains('Group'), #content-tabs ul.tabs li a:contains('Gruppe')").hide();


      var eingeloggt = $('.admin-menu').eq(0);

      // Hauptmenü ausrichten
      var nicemenu_items = $('.block.block-nice-menus ul.nice-menu > li'),
        first_items = 0,
        last_items = 0,
        total = 0,
        i=0,
        fullwidth = $('#header-group').width() - $('#logo img').width(),
        anzahl = nicemenu_items.length,
        schwelle,
        menuspace;

      function adjustmenu() {
        if (anzahl >= 5) {
          schwelle = 3;
        } else {
          schwelle = 2;
        }

        $(nicemenu_items).each(function(){
          first_items = first_items + $(this).width();
          //console.log(i + ") " + first_items);
          i++;
          if (i >= schwelle) {
            return false
          }
        });
        $(nicemenu_items).each(function(){
          total = total + $(this).width();
        });

        last_items = total - first_items;

        if (last_items > first_items) {
          menuspace =  (last_items - first_items);
          $('.block-nice-menus .nice-menu > li:first-child').css({'margin-left':menuspace});
          $('.block-nice-menus.block.block-nice-menus ul.nice-menu > li:nth-child('+schwelle+')').css({'margin-right':'230px'});
        } else {
          menuspace =  (first_items - last_items);
          $('.block-nice-menus .nice-menu > li:last-child').css({'margin-right':menuspace});
          $('.block-nice-menus.block.block-nice-menus ul.nice-menu > li:nth-child('+schwelle+')').css({'margin-right':'230px'});
        }
      }

      // Timeline
      var timeline_container = $('.field-name-field-timeline'),
        timeline_items = $('.field-name-field-timeline > .field-items > .field-item'),
        timeline_height = 0,
        tl_schwelle = 4,
        tl_last_vis = $('.field-name-field-timeline > .field-items > .field-item:eq('+(tl_schwelle-1)+') .field-collection-item-field-timeline'),
        tl_counter=0,
        tl_offset = 205,
	    historie_top = 0;

	  if ($(window).width() <= 400) {
	        tl_offset = 130;
	  }

      $(timeline_items).each(function(){
        timeline_height = timeline_height + $(this).height() +1;
        tl_counter++;
        if (tl_counter >= tl_schwelle) {
          return false
        }
      });

      function adjusttimeline() {
        if (timeline_items.length >= tl_schwelle && timeline_items.length !== 0) {
          timeline_container.css({'height':timeline_height,'overflow':'hidden'});
          timeline_container.append('<button class="timeline_button">+</button>');
        } else {
          return false
        }
      }


      // Ankerslider Funktion
      function center_vertical(bildcontainer) {
        var sliderbild_wrapper = $(bildcontainer),
          space2top,
          slider_bild;
        if (sliderbild_wrapper.length) {
          sliderbild_wrapper.each(function(){
            sliderbild_wrapper = $(this).height();

            slider_bild = $(this).find('img').innerHeight();
            space2top = Math.round((sliderbild_wrapper - slider_bild) / 2);

            if (space2top >= 0) {
              $(this).find('img').css({'padding-top':space2top});
            } else {
              $(this).find('img').css({'padding-top':space2top*-1});
            }
          });
        }
      }
      var ankerslider = $('.field-name-field-slides');

      /* Kacheln */
      var kchl = '#block-views-homepage-block td, #block-views-homepage-kacheln-en-block td, #block-views-referenzen-kacheln-block td, .view-homepage-kacheln-mobile .owl-item, .view-homepage-kacheln-mobile-en .owl-item',
		space2top,
		ttl,
		kchlbreite = Math.floor($(window).width() / 4);

      function adjust(diesekachel) {
        space2top = Math.floor($(diesekachel).outerHeight()/2);
        ttl = Math.floor($(diesekachel).find('.kacheltext').height()/2);
        $(diesekachel).find('.kacheltext').stop().animate({
          'padding-top': space2top - ttl
        }, 200);
      }
      function firstadjust(diesekachel) {
        space2top = Math.floor($(diesekachel).outerHeight()/2);
        ttl = Math.floor($(diesekachel).find('.kacheltext').height()/2);
        $(diesekachel).find('.kacheltext').css({
          'padding-top': space2top - ttl
        });
      }

      $(window).load(function(){

        adjustmenu();

        // f2-mz: Menue und Logo nach Anpassung wieder einblenden
        $('#nice-menu-1').fadeIn();
        $('#logo').fadeIn();
        $('body').removeClass('initial-hide');

        adjusttimeline();

		if (timeline_container.length) {
		  $('.timeline_button').toggle(function(){
		  timeline_container.css({'height':'auto','overflow':'visible'});
		  $(this).html('-');
		  },function() {
		  timeline_container.css({'height':timeline_height,'overflow':'hidden'});
		  $(this).html('+');
	
		  historie_top = Math.round($(timeline_container).offset().top - tl_offset);
	
		  $("html, body").animate({ scrollTop: historie_top}, "slow");
		  });
		}
	
        $(kchl).each(function(index, element) {
          firstadjust(this);
          $(this).hover(function(){
            $(this).find('.showhide').removeClass('hidden');
            adjust(this);
          },function(){
            $(this).find('.showhide').addClass('hidden');
              adjust(this);
          });
        });

        // Wait for end of resizing
        var rtime;
        var timeout = false;
        var delta = 200;
        $(window).resize(function() {
          rtime = new Date();
          if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
          }
        });

        function resizeend() {
          if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
          } else {
            timeout = false;

            // Kacheln ausrichten
            $(kchl).each(function(index, element) {
              adjust($(this));
            });

          }
        }

        // Zitate Pfeil Ausrichtung
        $('.field-name-field-zitate').each(function(){
          var ztarrow =     $(this).find('ol.flex-control-nav'),
            // has arrow as bg-img
            ztnav =       $(this).find('ol.flex-control-nav li a'),
            // zitate slider bullet
            ztnav_actv =  $(this).find('ol.flex-control-nav li a.flex-active'),
            // active zitate slider bullet
            ztoffset,
            // var for position of currently chosen (active or hovered) bullet
            zitatepager = $('.field-name-field-zitate ol.flex-control-nav li');
          if (!zitatepager.length) {
            $('.field-name-field-zitate ol.flex-control-nav').css({'bottom':'-108px'});
          }
          // nur ausführen wenn der pager vorhanden
          var zt_pager = $('.field-name-field-zitate .flex-control-nav li').eq(0);
          if (zt_pager.length) {
            function zt_setarrowpos(ztauswahl) {
              ztoffset = Math.floor(ztauswahl.position().left) - 95;
              // get position of currently chosen (active or hovered) bullet
              ztarrow.css({'background-position':  ztoffset + 'px 0px'});
              // change position of arrow
              ztnav_actv = $('ol.flex-control-nav li a.flex-active');
              // check again for active bullet
            }
            zt_setarrowpos(ztnav_actv);
            // initial positioning of arrow
          } else {
          }

          ztnav.hover(function(){
            zt_setarrowpos($(this));
            // place arrow over currently hovered bullet
          }, function(){
            if(!$(this).hasClass('flex-active')) {
              // on exiting hover check if bullet is not active
              zt_setarrowpos($(ztnav_actv));
              // and put arrow back to active bullet
            }
          }).click(function(){
            if (!$(this).hasClass('flex-active')) {
              // check if the clicked bullet is not active
              zt_setarrowpos($(this));
              // and if so, place arrow over clicked bullet
            }
          });
          $(this).find('.flexslider').on('after', function() {
            ztnav_actv = $(this).find('ol.flex-control-nav li a.flex-active');
            zt_setarrowpos($(ztnav_actv));
          });
        });

        // Annkerslider Call
        if (ankerslider.length) {

          var 	pageritems,
				sliderlink,
				checkforimg,
				checkforowl,
				singleslides,
				sliderlink_a;


          $(ankerslider).each(function(){
            // Pager entfernen und stattdessen nur die Anzahl der Slides anzeigen
            pageritems = $(this).find('.owl-carousel .owl-item').length;
            $(this).find('.owl-pagination').html("1-" + pageritems);

            // Link über ganzen Slider legen
			$(this).find('.owl-carousel .owl-item .entity .content').each(function(index, element) {
				sliderlink_a 	=  $(this).find('.field-name-field-button a');
				//sliderlink	=  sliderlink_a.attr('href');
								
				// option 3 - Bei Klick auf Slider wird ein Klick auf den Button getriggert
				$(this).click(function(event) {
				    if (!$(event.target).is(sliderlink_a)) {
						$(this).find('.field-name-field-button a')[0].click();
					}
				});				 
			});
		  });

          // Bilder vertikal zentrieren
          setTimeout(function(){
            center_vertical('.field-name-field-slides .field-name-field-image');
          },500);
          $(window).resize(function(e){
            center_vertical('.field-name-field-slides .field-name-field-image');
          });

        } else {
          return
        }

        // Quadratische Grafiken verkleinern
        slider_image = $('.field-name-field-slides .field-name-field-image img');
        $(slider_image).each(function(index, element) {
          verhaeltnis = Math.round(($(this).width() / $(this).height()) *100);
          if (verhaeltnis < 100) {
            $(this).css({'height':'120px','width':'auto'});
          }
        });
				
			
      // End of window.load
      });

      // Ankerlinks
      $('a[id]').each(function(){
        $(this).removeAttr('name');
      });

      function scroll_if_anchor(href) {

        href = (typeof(href) == 'string') ? href : $(this).attr('href');

        var offset = -( $('#header-group-wrapper').outerHeight() + 10 );
	
        // f2-mz: neue Implementation per jQuery.scrollTo
        $(window).stop(true).scrollTo( $(href), {
          duration: 400,
          interrupt: false,
          offset: offset,
          onAfter:function() {
            $('#page').removeClass("invisible"); // Seite wieder einblenden
          }
        });
      }

      /* Akkordeon */
      // check for imce first for preventing interference
      if ( $(".field-name-field-akkordeon").length && !$("body").hasClass('imce')) {
        $( ".field-collection-item-field-akkordeon .content" ).accordion({
           collapsible: true,
           active: false
        });
		
        /* Ankerziel */
        var akk_title,
          akk_title_txt,
          maxLength,
          trimmedString,
          lastspace,
          new_with_anchor;

        $('.field-name-field-akkordeon-titel .field-items .field-item').each(function(){
          akk_title = this.innerHTML;
          akk_title_txt = akk_title.toLowerCase();

          maxLength = 20 // maximum number of characters to extract

          //trim the string to the maximum length
          trimmedString = akk_title_txt.substr(0, maxLength);

          if(trimmedString.lastIndexOf(" ") > 4){
            lastspace = trimmedString.lastIndexOf(" ");
          } else {
            lastspace = 20; // wenn nur 1 Space, dann nimm das 2. Wort nicht raus
          }

          //re-trim if we are in the middle of a word
          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, lastspace)).split(' ').join('_');
          new_with_anchor = "<a id='"+trimmedString+"' class='anchorlink'>" + akk_title + "</a>";
          this.innerHTML = new_with_anchor;

        });

        var anchorid;
        if ($('body').hasClass('admin-menu')) {
          $('.field-name-field-akkordeon-titel').dblclick(function() {
            anchorid = $(this).find('.anchorlink').attr('id');
            alert('Der Anker lautet: #' + anchorid );
          });
        }

      }
      // BACK2TOP
      var exist= jQuery('#backtotop').length;
      if(exist == 0) {
        $("body", context).once(function() {
          $(this).append("<div id='backtotop'>Back to top</div>");
        });
      }
      $(window).scroll(function() {
        if($(this).scrollTop() > 200) {
          $('#backtotop').fadeIn();
        } else {
          $('#backtotop').fadeOut();
        }
      });
      $('#backtotop', context).once(function() {
        $(this).click(function() {
          $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function() {
            $('html, body').stop();
          });
          $('html,body').animate({ scrollTop: 0 }, 1200, 'easeOutQuart', function() {
            $("html, body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");
          });
          return false;
        });
      });

      // Headline Hintergrundgrafik
      var headlinegrafik = $('h1.title'),
		headline,
		headlinegrafik_W,
		headlinegrafik_H,
		extra,
		winwitdh = $(window).width();
      if (headlinegrafik.length && headlinegrafik.css('background-image') !== 'none') {
        function headlinegrafik_rebuild() {
          headlinegrafik.each(function(index, element) {
            headline = $(this).html();
            $(this).html('<span>'+headline+'</span>');
            headlinegrafik_W = $(this).find('span:first').width();
            headlinegrafik_H = $(this).find('span:first').height();
            $(this).html(headline);

            if(headlinegrafik_W <= 273) {
              extra = 100;
            } else {
              extra = 180;
            }

            if(headlinegrafik_W >= 250) {
              $(this).addClass('breit');
            } 
			
			// Wenn Headline 2-zeilig
            if(headlinegrafik_H >= 40){
              headlinegrafik_W = headlinegrafik_W+50;
              headlinegrafik_H = headlinegrafik_H+90;
              $(this).css({
                'background-position':'-10px 20px',
                'padding-bottom':'30px',
                'background-size': headlinegrafik_W + extra + 'px ' + headlinegrafik_H + 'px'
              });
            } else {
			// Wenn Headline 1-zeilig
			
              $(this).css({
                'background-position':'center center',
                'padding-bottom':'0',
                'background-size': headlinegrafik_W + extra + 'px 120px'
              });
			 
            }
          });
        }
        headlinegrafik_rebuild()
        $(window).resize(function(){headlinegrafik_rebuild()});

      } else {
        return false
      }



    // Kontaktformular
    var webform_feld = $( ".webform-component .required" );
    if ($('body').hasClass('node-type-webform')) {
    webform_feld.focusout(function() {
        if($(webform_feld).hasClass('error') && $(this).val()) {
          $(this).removeClass('error');
        } else {
        return
        }
    });
	
     }
    }
  };


  Drupal.behaviors.jQueryLocalScroll = {
    attach: function(context) {
	 if (!$("body").hasClass('imce')) {
		 if (Drupal.settings.jquery_localscroll.global == 1) {
			$.localScroll.hash();
		  }
		  // All process starts on ids set up in drupal admin. The index contains
		  // #foo, #bar, html ids.
		  $.each(Drupal.settings.jquery_localscroll.ids, function (index, value) {
			if ($(window).width() <= 510) {
				$(index).localScroll({
				  hash: Drupal.settings.jquery_localscroll.hash,
				  // Offset will be set on onBefore event.
				  offset:-85,
				});
			} else {
				$(index).localScroll({
				  hash: Drupal.settings.jquery_localscroll.hash,
				  // Offset will be set on onBefore event.
				  offset:-150,
				});
			}
		  });
		}
    }
  };


}(jQuery));