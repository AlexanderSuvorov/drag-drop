// to do:
//	- resizeble;
//	- prevent select;
//	- memorize position;
//	- add comments;
//	- cursors

	var wind = document.getElementsByClassName('dragWindow');

	for ( var i = 0; i <= wind.length; i++ ) {

		dragElement(wind[i]);

	}

	function dragElement(wind) {

		var w_width, w_height, ox, oy, scroll_width, drag, ex_1, ey_1, ex_2, ey_2;

		if ( wind ) {

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

				drag = false;

				var top = wind.offsetTop;
				var left = wind.offsetLeft;

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

		// Create new set of windows and
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
		el.style.zIndex = ++maxZ;

	}

