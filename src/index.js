document.addEventListener('DOMContentLoaded', () => {
    // card options
    const cardArray = [
        {
            name: 'fries',
            img: 'src/images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'src/images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'src/images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'src/images/pizza.png'
        },
        {
            name: 'mailshake',
            img: 'src/images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'src/images/hotdog.png'
        },
        {
            name: 'fries',
            img: 'src/images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'src/images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'src/images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'src/images/pizza.png'
        },
        {
            name: 'mailshake',
            img: 'src/images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'src/images/hotdog.png'
        },
    ]
             
    // cardArray.sort(function() {0.5 - Math.random()})   // using function() {}
                // () => - Arrow Function {} braces not needed
    cardArray.sort(() => 0.5 - Math.random())       // if random number given is less than 0.5 is negative, over 0.5 is positive...
    console.log(cardArray)                          // roughly 50% negative and 50% positive.

    const grid = document.querySelector('.grid')    // putting random sorted cards into grid
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []        // storing name's: array filled by .push() when function flipCard() is used by 'click'.
    let cardsChosenIds = []     // storing card id's from i by .push() when function flipCard() is used by 'click'
    let cardsWon = []           // store's matched cards

    function createBoard() {    // createBoard = () => - Arrow Function
        for (let i = 0; i < cardArray.length; i++){
            const card = document.createElement('img') // create img tag
            card.setAttribute('src', 'src/images/blank.png') // default img
            card.setAttribute('data-id', i) // each cards individual data-id from 0 to 11
            card.addEventListener('click', flipCard)
            grid.appendChild(card) // put card<img> into grid div
        }
    }

    function flipCard() {   // flipCard = () => - Arrow Function
        let cardId = this.getAttribute('data-id') // 0-11 array position number
        cardsChosen.push(cardArray[cardId].name) // .name to specificaly use this object only, instead of .name & .img
        cardsChosenIds.push(cardId) // 0 and 1, from 2 cards chosen by 'click'
        this.setAttribute('src', cardArray[cardId].img) // overrides blank.png by going in the cardArray w/ cardId to get the .img
        if (cardsChosen.length === 2) {  // 2 chosen cards by 'click'
            setTimeout(checkForMatch, 500)
        }
        console.log(cardsChosenIds)
    }
    
    function checkForMatch() {     // checkForMatch = () => - Arrow Function
        const cards = document.querySelectorAll('img')  // access all img tag
        const optionOneId = cardsChosenIds[0]  // 1st 'click'
        const optionTwoId = cardsChosenIds[1]  // 2nd 'click'

        if (optionOneId == optionTwoId) {  // clicked same card twice
            alert('You have clicked the same image!')
            cards[optionOneId].setAttribute('src', 'src/images/blank.png')  // default img after clicking OK in alert
            cards[optionTwoId].setAttribute('src', 'src/images/blank.png')  // -same as above-
        } else if (cardsChosen[0] === cardsChosen[1]) {  // same name, as cardsChosen store's name only
            alert('You have found a match!')
            cards[optionOneId].setAttribute('src', 'src/images/white.png')  // img when match is found
            cards[optionTwoId].setAttribute('src', 'src/images/white.png')  // -same as above-
            cards[optionOneId].removeEventListener('click', flipCard)  // remove/stop flipCard function
            cards[optionTwoId].removeEventListener('click', flipCard)  // -same as above-
            cardsWon.push(cardsChosen) // stores matched cards, array in an array(6(12/2) arrays in an array once everything is matched)
        } else {   // everything else(cards), 2 cards clicked thats not thesame and that didn't match
            cards[optionOneId].setAttribute('src', 'src/images/blank.png')  // default img after clicking OK in alert
            cards[optionTwoId].setAttribute('src', 'src/images/blank.png') // -same as above-
            alert('Sorry, try again!')
        }
        cardsChosen = []  // reset w/ an empty cardsChosen array
        cardsChosenIds = []  // reset w/ an cardsChosenIds array
        resultDisplay.textContent = cardsWon.length // shows length of stored array's in cardWon(matched cards), 1 to 5, 6(textContent)
        if (cardsWon.length === cardArray.length / 2) {   // or === 6 (12 length of cardArray / 2)
            resultDisplay.textContent = ' Congratulations! You have won!'
        }

        console.log(cardsChosen)
        console.log(cardsWon)
    }

    createBoard()
})