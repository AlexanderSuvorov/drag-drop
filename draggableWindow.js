// to do:
//	- resizeble;
//	- prevent select;
//	- increase z-index;
//	- memorize position;
//	- add comments;
//	- cursors

	var wind = document.getElementsByClassName('dragWindow');

	for ( var i = 0; i <= wind.length; i++ ) {

		dragElement(wind[i]);

	}

	function dragElement(el) {

		var w_width, w_height, ox, oy, scroll_width, drag, ex_1, ey_1, ex_2, ey_2;

		if ( el ) {

			var drag_spot = el.getElementsByClassName('dragSpot')[0];
			
			drag_spot.addEventListener('mousedown', function(e) {

				w_width = document.documentElement.clientWidth;
				w_height = document.documentElement.clientHeight;

				ox = e.clientX - el.offsetLeft;
				oy = e.clientY - el.offsetTop;

				scroll_width = w_height < document.body.offsetHeight ? 5 : 0;

				drag = true;

			}, false)

			document.addEventListener('mouseup', function(e){

				drag = false;

				var top = el.offsetTop;
				var left = el.offsetLeft;

			}, false)

			document.addEventListener('mousemove', function(e){

				ex_1 = el.offsetLeft;
				ey_1 = el.offsetTop;
				ex_2 = ex_1 + parseInt( getComputedStyle(el).width );
				ey_2 = ey_1 + parseInt( getComputedStyle(el).height );

				if ( drag ) {

					var hor, vert;

					hor = e.clientX - ox <= 0 && ex_1 <= 0 || e.clientX + ( parseInt( getComputedStyle(el).width ) - ox ) >= w_width - scroll_width && ex_2 >= w_width - scroll_width ? false : true;
					vert = e.clientY - oy <= 0 && ey_1 <= 0 || e.clientY + ( parseInt( getComputedStyle(el).height ) - oy ) >= w_height && ey_2 >= w_height  ? false : true;

					if ( hor && vert ) {

						el.style.left = e.clientX - ox + 'px';
						el.style.top = e.clientY - oy + 'px';

					}

					else if ( vert && !hor ) {

						el.style.top = e.clientY - oy + 'px';

							if ( parseInt( el.style.left ) < 0 ) {

								el.style.left = 0 + 'px';

							}

							else if ( parseInt( el.style.left ) + parseInt( getComputedStyle(el).width ) > w_width - scroll_width ) {

								el.style.left = w_width - scroll_width - parseInt( getComputedStyle(el).width ) + 'px';

							}

					}
					else if ( hor && !vert ) {

						el.style.left = e.clientX - ox + 'px';

							if ( parseInt(el.style.top) < 0 ) {

								el.style.top = 0 + 'px';

							}

							else if ( parseInt( el.style.top ) + parseInt( getComputedStyle(el).height ) > w_height ) {

								el.style.top = w_height - parseInt( getComputedStyle(el).height ) + 'px';

							}

					}

				}

			}, false)

		}

	}

