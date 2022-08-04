// deal or no deal game
// How the game works:
//  Step 1: The user chooses a case to hold on to
//  Step 2: Ther user picks a number of cases to eliminate from the row of cases
//  step 3: after a certain amount of cases are eliminated, the banker calls and offers an amount
//  Step 4: user selects deal or no deal
//  Step 6: if no deal repeat steps 2-4 until one case remains
//  Step 7: the user is given one last chance to swap cases with the last remaining case
//  Step 8: user wins amount in their selected case
//  Step 9: all remaining cases are shown

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

const briefcaseButtons = document.querySelectorAll(".case");
const userPrompt = document.querySelector("#user-prompt");
const restartButton = document.querySelector("#restart-button");
const personalCase = document.querySelector("#personal-case");
let arrayOfBriefcases = [];
let casesRemoved = 0;
let personalBriefcaseIndex = -1;
const handleInitializeGame = () =>{
    //an array of possible cash amounts the user can remove or win
    const cashAmountsArr = [.01,1,5,10,25,50,75,100,200,300,400,500,750,
        1000,5000,10000,25000,50000,75000,100000,
        200000,300000,400000,500000,750000,1000000];
    
    //resetting arrayOfBriefCases to remove previous cash amounts
    arrayOfBriefcases = [];
    //Resetting the userPrompt to give a welcome message
    userPrompt.innerHTML = "Welcome To Deal Or No Deal! Please Choose Your Personal Briefcase!"
    
    //resetting casesRemoved, the number of cases a user has removed
    casesRemoved = 0;

    //resetting all button texts to be their briefcase numbers
    for (let i = 0; i < briefcaseButtons.length; i++) {
        briefcaseButtons[i].innerHTML = `${i+1}`;
    }

    while (cashAmountsArr.length > 0) {
        const randomNumber = Math.floor(Math.random()*cashAmountsArr.length);
        const randomAmount = cashAmountsArr[randomNumber];
        arrayOfBriefcases.push(randomAmount);
        cashAmountsArr.splice(randomNumber,1);
    }

}

//initializing the array of briefcases on page startup
handleInitializeGame();

const handleBriefcaseClick = (briefcaseButtons, i, arrayOfBriefcases) =>{
    
    //getting the user's chosen personal briefcase
    if (personalBriefcaseIndex == -1){
        personalBriefcaseIndex = i;
        briefcaseButtons[i].classList.add("hide");
        personalCase.innerHTML = `${i+1}`
        console.log(personalBriefcaseIndex);
        //personal briefcase remove from briefcase buttons
    } else {
        casesRemoved++;
        briefcaseButtons[i].innerHTML = `$${arrayOfBriefcases[i]}`
        userPrompt.innerHTML = `
        Briefcase #${i} had $${arrayOfBriefcases[i]}.
        You can remove more.`;
        

        if(casesRemoved == 6 || casesRemoved == 11 || casesRemoved == 15 || casesRemoved == 18 ||
            casesRemoved >= 20){
            //adding a delay so the user can see what briefcase they removed
            setTimeout(() => {
                alert("The banker is calling");
            }, 500);
        }
    }

    //fade out array of cash amounts 
}

for (let i = 0; i < briefcaseButtons.length; i++) {
    briefcaseButtons[i].addEventListener("click", () =>{
        handleBriefcaseClick(briefcaseButtons,i, arrayOfBriefcases);
    })
}

restartButton.addEventListener("click", handleInitializeGame);
