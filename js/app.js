/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
$(document).ready(function(){
	let seconds = 0, minutes = 0, hours = 0, t, counter = 0;

	generateHtml();
	timer();
	
	$('.restart').on('click',function(){
		
		clearTimeout(t);
		seconds = 0; minutes = 0; hours = 0;
		timer();

		counter = 0;
		$('.moves').text(counter);
		$(".stopwatch").text("00:00:00");
		$('.stars li i').attr('class','fa fa-star');
		
		generateHtml();
	});
	
	var temp = -1;

	$('.deck').on('click','.card',function(){

		if(temp!=$(this).index()){
			if($(this).hasClass('match') == false){
				counter++;
				$('.moves').text(counter);
			}

			temp = $(this).index();
		
			if(counter > 35){
				$('.stars li:eq(1) i, .stars li:eq(2) i').attr('class','fa fa-star-o');
			}
			else if(counter > 30){
				$('.stars li:eq(2) i').attr('class','fa fa-star-o');
			}
			
			if($('.deck').find('.show').length > 0){
				let prevElem = $('.deck .show i').attr('class');
				let currElem = $(this).children('i').attr('class');
				if(prevElem == currElem){
					$('.deck').find('.show').removeClass('show open').addClass('match animated rubberBand');
					$(this).addClass('match animated rubberBand');
					if(($('.deck .show').length == 0) && ($('.deck li').length == $('.deck .match').length)){
						$('.congratulation-box .total-time').text($('.stopwatch').text());
						$('.congratulation-box .total-moves').text(counter);
						$('.congratulation-box .total-star').text($('.fa-star').length);
						$('.congratulation-box').fadeIn();
					}
				}
				else{
					if($(this).hasClass('match') == false){
						$(this).addClass('show open animated wobble');
						$('.deck').find('.show').addClass('animated wobble');
						setTimeout(function(){
							$('.deck').find('.show').removeClass('show open animated wobble');
						},1000);
						temp = -1;	
					}
				}
			}
			else{
				$(this).addClass('show open');
			}
		}
	});

	$('#play-again').on('click',function(){
		$('.congratulation-box').fadeOut();
		clearTimeout(t);
		seconds = 0; minutes = 0; hours = 0;
		timer();

		counter = 0;
		$('.moves').text(counter);
		$(".stopwatch").text("00:00:00");
		$('.stars li i').attr('class','fa fa-star');
		
		generateHtml();
	});

	function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    $(".stopwatch").text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

    timer();
	}

	function timer() {
	    t = setTimeout(add, 1000);
	}
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateHtml(){
		let classList = ['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
		let shuffledList = shuffle(classList);
		let shuffledHtml = '';
		for(let i=0;i<shuffledList.length;i++){
			shuffledHtml = shuffledHtml + "<li class='card'><i class='fa "+ shuffledList[i] +"'></i></li>";
		}
		$('.deck').html(shuffledHtml);
	}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
