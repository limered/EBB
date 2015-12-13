$(document).ready(function(){
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = (this.hash);
			target = target.length && target || $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var targetOffset = $(target).offset().top-60;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
    });
	
	$('.slider').slider({full_width: true, 
					 indicators: false,
					 height: 800,
					 transition: 1000,
					 interval: 8000});
	
	$('.parallax').parallax();
});

function scroll(){
	var pos = window.pageYOffset;
	if(pos > 180){
		$('#navigation').removeClass('transparent').addClass('blue-grey darken-4');
	}else{
		$('#navigation').removeClass('blue-grey darken4').addClass('transparent');
	}
}
/* LINES */
function loadLinesContent(content){
	$( '#lines-spinner' ).addClass('hidden');
	$( "#lines-content" ).html( content );
	$( '#lines-content' ).removeClass( 'hidden' );
}

function getLinesIdea(evt){
	$( '#cells-content' ).addClass( 'hidden' );
	$( '#cells-section' ).removeClass('open');
	$( '#cells-content' ).html( "" );
	
	$( '#lines-content' ).addClass( 'hidden' );
	$( '#lines-spinner' ).removeClass( 'hidden' );
	window.setTimeout(function(){
		$( '#lines-section' ).addClass('open');
		$( '#lines-content' ).html( "" );
		$.get( "linesIdea.html", function( data ) {
			loadLinesContent( data );
		}).always(function(){
			$('.materialboxed').materialbox();
			$('ul.tabs').tabs();
			$('#lines-content .indicator').addClass('grey darken-3');
		});
	}, 500);
}
function getLinesVideo(evt){
	$( '#lines-content' ).addClass( 'hidden' );
	$( '#lines-spinner' ).removeClass( 'hidden' );
	window.setTimeout(function(){
		$( '#lines-section' ).removeClass('open');
		$( '#lines-content' ).html( "" );
		$.get( 'linesVideo.html', function( data ){
			loadLinesContent( data );
		});
	}, 500);
}

/* CELLS */
function loadCellsContent( data ){
	$( '#cells-spinner' ).addClass( 'hidden' );
	$( '#cells-content' ).html( data );
	$( '#cells-content' ).removeClass( 'hidden' );
}

function getCellsIdea( evt ){
	$( '#lines-content' ).addClass( 'hidden' );
	$( '#lines-content' ).html( "" );
	
	$( '#cells-content' ).addClass( 'hidden' );
	$( '#cells-spinner' ).removeClass( 'hidden' );
	window.setTimeout(function(){
		$( '#cells-section' ).addClass('open');
		$( '#cells-content' ).html( "" );
		$.get( "cellsIdea.html", function( data ) {
			loadCellsContent( data );
		}).always(function(){
			$('.materialboxed').materialbox();
			$('ul.tabs').tabs();
			$('#cells-content .indicator').addClass('grey darken-3');
		});
	}, 500);
}

function getCellsVideo(evt){
	$( '#cells-content' ).addClass( 'hidden' );
	$( '#cells-spinner' ).removeClass( 'hidden' );
	window.setTimeout(function(){
		$( '#cells-section' ).removeClass('open');
		$( '#cells-content' ).html( "" );
		$.get( 'cellsVideo.html', function( data ){
			loadCellsContent( data );
		});
	}, 500);
}






