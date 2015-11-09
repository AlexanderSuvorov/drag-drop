// to do:
//	- resizeble;
//	- prevent select;
//	- rewhrite only active window position(cookie);
// 	- roll up/down;
//	- add comments;
//	- cursors

	var wind = document.getElementsByClassName('dragWindow');

	for ( var i = 0; i < wind.length; i++ ) {

		wind[i].setAttribute( 'id', 'win_' + i );

		dragElement( wind[i] );

	}

	function dragElement(wind) {

		var w_width, w_height, ox, oy, scroll_width, drag, ex_1, ey_1, ex_2, ey_2;

		if ( wind ) {

			// set new position after page reload if it exists
			var id = wind.getAttribute('id');

			// if user move window before page reloading
			// coockie exists, assign value from cookie to position
			if ( getCookie( id + '_Top' ) ) wind.style.top = getCookie( id + '_Top' ) + "px"

			if ( getCookie( id + '_Left' ) ) wind.style.left = getCookie( id + '_Left' ) + "px"

			var drag_spot = wind.getElementsByClassName('dragSpot')[0];
			
			drag_spot.addEventListener('mousedown', function(e) {

				// get max z-index for this window
				increaseZ(wind);

				// get size of the page
				w_width = document.documentElement.clientWidth;
				w_height = document.documentElement.clientHeight;

				// calculate the position of cursor
				// for it we subtract the position of drag window on the browser window
				// from the position of cursor on the browser window
				ox = e.clientX - wind.offsetLeft;
				oy = e.clientY - wind.offsetTop;

				// if page height more than browser window height
				// scroll exists, assign it width "5"
				// why "5" I don't know
				scroll_width = w_height < document.body.offsetHeight ? 5 : 0;

				// assign drag true to indicate the start
				drag = true;

			}, false)

			document.addEventListener('mouseup', function(e){

				// stop drag'n'drop on mouseup
				drag = false;

				// remember position
				var top = wind.offsetTop;
				var left = wind.offsetLeft;

				var id = wind.getAttribute('id');

				// write position in a cookie
				var date = new Date();
				// the existance of cookie(days)
				var cookieStore = 1;
				var exp = date.setDate( date.getDate() + cookieStore );

				document.cookie = id + "_Top=" + top + "; path=/; expires=" + date.toUTCString();
				document.cookie = id + "_Left=" + left + "; path=/; expires=" + date.toUTCString();

			}, false)

			document.addEventListener('mousemove', function(e){

				ex_1 = wind.offsetLeft;
				ey_1 = wind.offsetTop;
				ex_2 = ex_1 + parseInt( getComputedStyle(wind).width );
				ey_2 = ey_1 + parseInt( getComputedStyle(wind).height );

				if ( drag ) {

					var hor, vert;

					hor = e.clientX - ox <= 0 && ex_1 <= 0 || e.clientX + ( parseInt( getComputedStyle(wind).width ) - ox ) >= w_width - scroll_width && ex_2 >= w_width - scroll_width ? false : true;
					vert = e.clientY - oy <= 0 && ey_1 <= 0 || e.clientY + ( parseInt( getComputedStyle(wind).height ) - oy ) >= w_height && ey_2 >= w_height  ? false : true;

					if ( hor && vert ) {

						wind.style.left = e.clientX - ox + 'px';
						wind.style.top = e.clientY - oy + 'px';

					}

					else if ( vert && !hor ) {

						wind.style.top = e.clientY - oy + 'px';

							if ( parseInt( wind.style.left ) < 0 ) {

								wind.style.left = 0 + 'px';

							}

							else if ( parseInt( wind.style.left ) + parseInt( getComputedStyle(wind).width ) > w_width - scroll_width ) {

								wind.style.left = w_width - scroll_width - parseInt( getComputedStyle(wind).width ) + 'px';

							}

					}
					else if ( hor && !vert ) {

						wind.style.left = e.clientX - ox + 'px';

							if ( parseInt(wind.style.top) < 0 ) {

								wind.style.top = 0 + 'px';

							}

							else if ( parseInt( wind.style.top ) + parseInt( getComputedStyle(wind).height ) > w_height ) {

								wind.style.top = w_height - parseInt( getComputedStyle(wind).height ) + 'px';

							}

					}

				}

			}, false)

		}

	}

	// increase max z-index value of the windows
	// and get it to a current window
	function increaseZ(el) {

		// create new set of windows and
		// new array for set of z-index values
		var wind = document.getElementsByClassName('dragWindow');
		var arrayZ = new Array();

		// loop through set of windows, get z-index values
		// and push it to array
		for ( var i = 0; i < wind.length; i++ ) {

			// if z-index value exists in the attribute "style" get it
			if ( wind[i].style.zIndex ) arrayZ.push( parseInt( wind[i].style.zIndex ) )

				// else get z-index value from css styles
				else {

					var windStyles = getComputedStyle( wind[i] );

					arrayZ.push( parseInt( windStyles.zIndex ) );

				}

		}

		// get max value from array
		var maxZ = Math.max.apply( Math, arrayZ );

		// increase value by one and 
		// assign it to a current window
		if ( el.style.zIndex != maxZ ) el.style.zIndex = ++maxZ

	}

	// return cookie name if it exists, else return undefined
	function getCookie(name) {

		var matches = document.cookie.match( new RegExp(

	  		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"

	  	));

	  	return matches ? decodeURIComponent(matches[1]) : undefined;
	}

