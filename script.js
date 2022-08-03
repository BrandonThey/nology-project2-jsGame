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