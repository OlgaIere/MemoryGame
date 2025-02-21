

const cards = ["img/img01.jpg", "img/img02.jpg", "img/img03.jpg", "img/img04.jpg", "img/img05.jpg", "img/img06.jpg", "img/img01.jpg", "img/img02.jpg", "img/img03.jpg", "img/img04.jpg", "img/img05.jpg", "img/img06.jpg"];

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards);



let oneVisible = false;
let turnCounter = 0;
let visibleNumber;
let lock = false;
let pairsLeft = cards.length / 2;

for (let i = 0; i < cards.length; i++){
    let card = $("#c" + i);
    if (card.length){
        card.data("image", cards[i]);
        card.on("click", () => revealCard(i));
    }
}
function revealCard(nr) {
    let card = $("#c" + nr);
    let opacityValue = card.css('opacity');

    if (opacityValue !=0 && !lock) {

        lock = true;

        let imagePath = "url("+card.data("image") + ")";

        card.css('background-image', imagePath);
        card.addClass('cardA').removeClass('card');
        

        if (!oneVisible) {
            //first card
            oneVisible = true;
            visibleNumber = nr;
            lock = false;
        }
        else {
            //second card

            if ($("#c" + visibleNumber).data("image") === card.data("image")) {

                setTimeout(function () { hide2Cards(nr, visibleNumber) }, 750);

            } else {
                setTimeout(function () { restore2Cards(nr, visibleNumber) }, 750);
            }
            turnCounter++;
            $(".score").html("Turn counter: " + turnCounter);
            oneVisible = false;
        }
    }

}

function hide2Cards(nr1, nr2) {
    $("#c" + nr1).css('opacity', '0');
    $("#c" + nr2).css('opacity', '0');

    pairsLeft--;
    if(pairsLeft === 0){
        $('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns</h1>');
        canvas.start()
    }

    lock = false;
}

function restore2Cards(nr1, nr2){
    $("#c" + nr1).css("background-image", "url(img/pattern1.jpg)").addClass("card").removeClass("cardA");
    $("#c" + nr2).css("background-image", "url(img/pattern1.jpg)").addClass("card").removeClass("cardA");

    lock = false;
}
