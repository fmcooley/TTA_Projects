
(function($) {

	$(document).ready( function() {

		/*-----------------------------------/
		/* NAVIGATION
		/*----------------------------------*/

		// init scroll-to effect navigation, adjust the scroll speed in milliseconds
		$('#main-nav').localScroll(1000);
		$('#header').localScroll(1000);


		/*-----------------------------------/
		/* SKILLS
		/*----------------------------------*/

		var chart = $('.pie-chart');

		if($('.pie-chart').length > 0) {
			chart.easyPieChart({
				size: 180,
				barColor: '#cf5037',
				trackColor: '#545454',
				scaleColor: false,
				lineWidth: 4,
				lineCap: "square",
				animate: 2000
			});
		}


		/*-----------------------------------/
		/* GOOGLE MAPS
		/*----------------------------------*/

		if( $('.map-canvas').length > 0) {

			var geocoder = new google.maps.Geocoder();
			var address = 'Google New York, 76 Ninth Ave, New York, NY, USA';
			var contentString = '<div class="map-detail"><strong>Our Office:</strong><p>' + address + '</p></div>';

			geocoder.geocode({'address': address }, function(results, status) {
				if(status == google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					jQuery('.map-canvas').gmap().bind('init', function(ev, map) {
						jQuery('.map-canvas').gmap('addMarker', {'position': latitude+','+longitude, 'bounds': true}).click(function() {
							jQuery('.map-canvas').gmap('openInfoWindow', {'content': contentString}, this);
						});
						jQuery('.map-canvas').gmap('option', 'zoom', 8);
					});
				}else { alert('Google Maps had some trouble finding the address. Status: ' + status); }
			});
		}


		/*-----------------------------------/
		/* AJAX CONTACT FORM
		/*----------------------------------*/

		if($('#contact-form').length > 0) {
			$('#contact-form').parsley();

			$('#contact-form').submit( function(e) {

				e.preventDefault();

				$theForm = $(this);
				$btn = $(this).find('#submit-button');
				$btnText = $btn.text();
				$(this).parent().append('<div class="alert"></div>');
				$alert = $(this).parent().find('.alert');

				$btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
				$btn.prop('disabled', true).find('span').text("Sending...");

				$url = "contact.php";

				$attr = $(this).attr('action');
				if (typeof $attr !== typeof undefined && $attr !== false) {
					if($(this).attr('action') != '') $url = $(this).attr('action');
				}

				$.post($url, $(this).serialize(), function(data){

					$message = data.message;

					if( data.result == true ){
						$theForm.slideUp('medium', function() {
							$alert.removeClass('alert-danger');
							$alert.addClass('alert-success').html($message).slideDown('medium');
						});
					}else {
						$alert.addClass('alert-danger').html($message).slideDown('medium');
					}

					$btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
					$btn.prop('disabled', false).find('span').text($btnText);

				})
				.fail(function() { console.log('AJAX Error'); });

			});
		}

	});

	// Navigation Bar Features

	$(document).ready(function(){

/** ===========================================
    Hide / show the master navigation menu
============================================ */

  // console.log('Window Height is: ' + $(window).height());
  // console.log('Document Height is: ' + $(document).height());

  var previousScroll = 0;

  $(window).scroll(function(){

    var currentScroll = $(this).scrollTop();

    /*
      If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
    */
    if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){
      /*
        If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.
      */
      if (currentScroll > previousScroll){
        window.setTimeout(hideNav, 300);
      /*
        Else we are scrolling up (i.e the previous scroll is greater than the current scroll), so show the nav.
      */
      } else {
        window.setTimeout(showNav, 300);
      }
      /*
        Set the previous scroll value equal to the current scroll.
      */
      previousScroll = currentScroll;
    }

  });

  function hideNav() {
    $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
  }
  function showNav() {
    $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
  }

});

})(jQuery);
