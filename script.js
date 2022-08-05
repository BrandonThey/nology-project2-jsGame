// deal or no deal game
// How the game works:
//  Step 1: The user chooses a case to hold on to
//  Step 2: Ther user picks a number of cases to eliminate from the row of cases
//  step 3: after a certain amount of cases are eliminated, the banker calls and offers an amount
//  Step 4: user selects deal or no deal
//  Step 6: if no deal repeat steps 2-4 until one case remains
//  Step 7: the user is given one last chance to swap cases with the last remaining case
//  Step 8: user wins amount in their selected case

//  Step 9: If deal: all remaining cases are shown

// Components needed:
//  1. Case Data Structure: 
//      We could structure the rows of cases as a 2d array of objects with a case number and amount in the case
//      the user's case could be it's own object with a case number and a amount in the case
//      randomly assign case cash amounts to cases.
//  2. Cash Amount Left Display:
//
//  3. Rows of Cases display:
//      Visualize the row of cases using flex or grid
//      Each case needs to have their case number display on top of the,
//  4. Display for the user's chosen case
//  5. Display for user prompts.
//  6. Display for the banker calling us
//      6.5 A algorithm to create the banker's offer, based on what amounts are left
//  7. A deal or no deal button

//add confirmation prompt to restart button
//add a how to play button and pop up with instructions on how to play the game
//transition the background color of the case to be velvet with white text and silver border, then make that button not clickable

const briefcaseButtons = document.querySelectorAll(".case");
const userPrompt = document.querySelector("#user-prompt");
const restartButton = document.querySelector("#restart-button");
const personalCase = document.querySelector(".personal-case");
const cashAmountDisplays = document.querySelectorAll("p");
const bankerPopup = document.querySelector(".banker-modal");
const bankerOffer = document.querySelector("#banker-offer");
const dealButton  = document.querySelector("#deal-button");
const noDealButton = document.querySelector("#no-deal-button");
const howToButton = document.querySelector("#how-to-play-button");
const howToPopup = document.querySelector(".how-to-modal");
const closebutton = document.querySelector("#close-out-button");
//creating variables: arrayOfBriefcases, an array of "briefcases" that serves to hold the briefcase number (index) and cash amounts inside (values)
//casesRemoved, the number of cases a user has removed
//personalBriefCaseIndex, the index in the arrayofBriefcases the user chose as their personal one
//amountToRemove the number of cases left the user can remove before the banker calls next
let arrayOfBriefcases = [];
let casesRemoved = 0;
let personalBriefcaseIndex = -1;
let amountToRemove = 6;
const handleInitializeGame = () => {
    //an array of possible cash amounts the user can remove or win
    const cashAmountsArr = [.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750,
        1000, 5000, 10000, 25000, 50000, 75000, 100000,
        200000, 300000, 400000, 500000, 750000, 1000000
    ];

    //resetting arrayOfBriefCases to remove previous cash amounts
    arrayOfBriefcases = [];
    //Resetting the userPrompt to give a welcome message
    userPrompt.innerHTML = "Welcome To Deal Or No Deal! Please Choose Your Personal Briefcase!"
    personalCase.innerHTML = `Case #`
    //resetting the cash displays to not be greyed out
    cashAmountDisplays.forEach((display) => display.classList.remove("grey-out"));

    //resetting variables casesRemoved, the number of cases a user has removed
    //personalBriefCaseIndex, the index in the arrayofBriefcases the user chose as their personal one
    //amountToRemove the number of cases left the user can remove before the banker calls next
    casesRemoved = 0;
    personalBriefcaseIndex = -1;
    amountToRemove = 6;

    //resetting all button texts to be their briefcase numbers
    for (let i = 0; i < briefcaseButtons.length; i++) {
        briefcaseButtons[i].innerHTML = `${i+1}`;
        briefcaseButtons[i].classList.remove("opened")
        briefcaseButtons[i].classList.remove("hide")
        briefcaseButtons[i].disabled = false;
    }

    while (cashAmountsArr.length > 0) {
        const randomNumber = Math.floor(Math.random() * cashAmountsArr.length);
        const randomAmount = cashAmountsArr[randomNumber];
        arrayOfBriefcases.push(randomAmount);
        cashAmountsArr.splice(randomNumber, 1);
    }

}

const handleBankerOffer = () => {
    //filtering out all zeroed out values and then sorting
    let leftoverCashAmounts = arrayOfBriefcases.filter(Number);
    leftoverCashAmounts = leftoverCashAmounts.sort((a, b) => a - b);

    let sum = 0;
    // //finding a rough median by sorting the array then getting the index based on how many amounts are left
    // leftoverCashAmounts.sort((a,b) => a-b);
    // console.log(leftoverCashAmounts.length)
    // let medianIndex = 0, extraToRemoveIndex = 0;
    switch (leftoverCashAmounts.length) {
        //averaging up only portions of the array based on how many cases are left
        //for example if there are 20 cases left only average the first 5 cases, otherwise sum them all up
        //this is an attempt to replicate the bankers lowball offers
        case 20:
            for (let i = 0; i < 6; i++) {
                sum += leftoverCashAmounts[i];
            }
            offer = Math.round(sum / 5);
            break;
        case 15:
            for (let i = 0; i < 8; i++) {
                sum += leftoverCashAmounts[i];
            }
            offer = Math.round(sum / 5);
            break;
        case 11:
            for (let i = 0; i < 8; i++) {
                sum += leftoverCashAmounts[i];
            }
            offer = Math.round(sum / 5);
            break;
        case 8:
            for (let i = 0; i < 6; i++) {
                sum += leftoverCashAmounts[i];
            }
            offer = Math.round(sum / 5);
            break;
        default:
            sum = leftoverCashAmounts.reduce((partialSum, nextVal) => partialSum + nextVal);
            offer = Math.round(sum / leftoverCashAmounts.length);
    }

    bankerOffer.innerHTML = `The Banker is offering you $${offer} for your briefcase`;
    bankerPopup.classList.toggle("show-modal");
}

//initializing the array of briefcases on page startup
handleInitializeGame();

const handleBriefcaseClick = (briefcaseButtons, i, arrayOfBriefcases) => {

    //getting the user's chosen personal briefcase
    if (personalBriefcaseIndex == -1) {
        personalBriefcaseIndex = i;
        briefcaseButtons[i].classList.add("hide");
        briefcaseButtons[i].disabled = true;
        personalCase.innerHTML = `${i+1}`
        userPrompt.innerHTML = `Great choice! Now please choose a case to remove! You have ${amountToRemove} left to go!`
    } else {
        casesRemoved++;
        amountToRemove--;
        briefcaseButtons[i].innerHTML = `$${arrayOfBriefcases[i]}`
        userPrompt.innerHTML = `
        Briefcase #${i} had $${arrayOfBriefcases[i]}.
        You can remove ${amountToRemove} more.`;
        briefcaseButtons[i].disabled = true;
        //looking through all the cash amounts to find the one that matches the eliminated briefcase in order to grey it out
        for (let j = 0; j < cashAmountDisplays.length; j++) {
            //getting the cash amount string from the html and removing all its commas
            let cashAmountWithoutCommas = cashAmountDisplays[j].innerHTML.replace(/,/g, "");
            //removing the dollar sign from the string then converting it to a number to be compared
            let numberedCashAmount = Number(cashAmountWithoutCommas.substring(1));
            //if the cash amount displayed value is equal to that of the one in the case then grey it out
            if (numberedCashAmount == arrayOfBriefcases[i]) {
                cashAmountDisplays[j].classList.add("grey-out");
            }
        }

        if (casesRemoved == 6 || casesRemoved == 11 || casesRemoved == 15 || casesRemoved == 18 ||
            casesRemoved >= 20) {
            userPrompt.innerHTML = "Woah what a game! Now the Banker is calling to give you an offer! Will you say deal or no deal?"
            //switch statement that determines how many more cases the user can remove before getting another call
            switch (casesRemoved) {
                case 6:
                    //adding a delay so the user can see what briefcase they removed
                    setTimeout(handleBankerOffer, 500);
                    amountToRemove = 5;
                    break;
                case 11:
                    //adding a delay so the user can see what briefcase they removed
                    setTimeout(handleBankerOffer, 500);
                    amountToRemove = 4;
                    break;
                case 15:
                    //adding a delay so the user can see what briefcase they removed
                    setTimeout(handleBankerOffer, 500);
                    amountToRemove = 3;
                    break;
                case 18:
                    //adding a delay so the user can see what briefcase they removed
                    setTimeout(handleBankerOffer, 500);
                    amountToRemove = 2;
                    break;
                case 24: //if the user has removed all but one case, they have an option to switch cases
                    bankerOffer.innerHTML = "Nicely done! You now have a choice... will you switch cases or keep your current one?";
                    dealButton.innerHTML = "Switch";
                    noDealButton.innerHTML = "Don't Switch";
                    bankerPopup.classList.toggle("show-modal");

                    userPrompt.innerHTML = "Thank you for playing Deal Or No Deal! Press the restart button for a new game!";
                    break;
                case 25:
                    break;
                default:
                    //adding a delay so the user can see what briefcase they removed
                    setTimeout(handleBankerOffer, 500);
                    amountToRemove = 1;
                    break;
            }

        }

        //opening the briefcase with a delay as the player has eliminated it
        setTimeout(() => {
            briefcaseButtons[i].classList.add("opened");
        }, 700)
        //zeroing out the value at i since the player has eliminated the case
        arrayOfBriefcases[i] = 0;
    }

    //fade out array of cash amounts 
}

const handlePopup = (isDeal, dealButton) => {
    if(isDeal && dealButton.innerHTML == "Deal"){
        userPrompt.innerHTML = `Congrats!! You won ${offer}!!! Thank you for playing! You can continue playing to see your chances!`
    } else if(isDeal && dealButton.innerHTML == "Switch"){
        userPrompt.innerHTML = "You decided to switch you case so lets see what your new case holds!";
        for (let i = 0; i < arrayOfBriefcases.length; i++) {
            if(arrayOfBriefcases[i] != 0 && arrayOfBriefcases[i] != arrayOfBriefcases[personalBriefcaseIndex]){
                setTimeout(() => {
                    personalCase.innerHTML = `$${arrayOfBriefcases[i]}`
                    personalCase.classList.add("opened")
                    userPrompt.innerHTML = `Congrats!!!! You won $${arrayOfBriefcases[i]} from case ${i}!!`
                }, 3000);
            }
        };
        
        dealButton.innerHTML = "Deal";
        noDealButton.innerHTML = "No Deal";
    } else if(!isDeal && dealButton.innerHTML == "No Deal"){
        userPrompt.innerHTML = `Alright! Let's keep playing! You can choose ${amountToRemove} more cases!` 
    } else if(!isDeal && dealButton.innerHTML == "Don't Switch"){
        userPrompt.innerHTML("You decided not to switch so lets see what your case holds!");
        setTimeout(() => {
            personalCase.innerHTML = `$${arrayOfBriefcases[personalBriefcaseIndex]}`
            personalCase.classList.add("opened")
        }, 3000);;
        userPrompt.innerHTML = `Congrats!!!! You won $${arrayOfBriefcases[personalBriefcaseIndex]}`;
        dealButton.innerHTML = "Deal";
        noDealButton.innerHTML = "No Deal";
    } else{
        console.log("Else");;
    }
    bankerPopup.classList.toggle("show-modal");
}

for (let i = 0; i < briefcaseButtons.length; i++) {
    briefcaseButtons[i].addEventListener("click", () => {
        handleBriefcaseClick(briefcaseButtons, i, arrayOfBriefcases);
    })
}

restartButton.addEventListener("click", ()=>{
    if(confirm("Are you sure you want to restart the game?") == true){
        handleInitializeGame();
    }
});

dealButton.addEventListener("click", () => {
    handlePopup(true, dealButton);
});

noDealButton.addEventListener("click", () =>{
    handlePopup(false, noDealButton);
});

const toggleModal = () => {
    howToPopup.classList.add("show-modal");
}
howToButton.addEventListener("click", toggleModal)

closebutton.addEventListener("click", () => {
    howToPopup.classList.remove("show-modal");
})