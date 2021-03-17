const dieRow = document.getElementsByClassName("dieRow")
const dieTotal = document.getElementsByClassName("dieTotal")
const score = document.querySelectorAll(".score")
const lockedClass = document.getElementsByClassName("locked")
const oneClass = document.querySelectorAll(".one")
const twoClass = document.querySelectorAll(".two")
const totalPartOneBeforeBonus = document.getElementById("totalPartOneBeforeBonus")
const bonus = document.getElementById("bonus")
const totalPartOne = document.querySelectorAll(".totalPartOne")
const totalPartTwo = document.getElementById("totalPartTwo")
const total = document.getElementById("total")



// seqCompare checks for transitions from 1 to 1 or 1 to 2 or 2 to 1, and subsequently increases numSeq. As it only counts transitions, not consecutive numbers, 
// numSeq needs to be adjusted by +1 in order to get consecutive numbers.  

const seqCompare = (array) => { //Checks an array for consecutive 1's and/or 2's
    let numSeq = 0
    for(i = 0; i < array.length; i++){
        j = i + 1 // Calculate j, which is one step ahead of i
        k = Math.abs(array[i] - array[j])  // Calculate the difference between the current number and the one after that
        if(k === 1 && array[i] !== 0 && array[j] !== 0 ){ // If the difference between the values is 1, and neither number is zero, increase numSeq by 1
            numSeq += 1 
        } else if(array[i] === array[j] && array[i] != 0){ // If both numbers are the same, and neither is zero, increase numSeq by 1
            numSeq += 1
        }
    }
    if (numSeq > 0){
        return numSeq + 1 // As only the number of transitions is counted, the end value needs to be adjusted 
    }  
}

const Throw = () => {
    const outcome = []
    
    const values = []

    const locked = []

    const throwCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    }

    document.querySelectorAll('.tmpLocked').forEach(element => { // Change all tmpLock classes for locked classes 
        element.classList.replace('tmpLocked', 'locked')
    })

    for(i = 0; i < lockedClass.length; i++){
        locked[i] = lockedClass[i].innerHTML // Move all locked values to the 'locked' array
    }

    for (i = 0; i < 5; i++){
        outcome.push(Math.floor(Math.random()*(6 -1 + 1)) +1)  // Calculate the dice values 1-6
    }

    for (i = 0; i < outcome.length; i++){
        dieRow[i].innerHTML = outcome[i]  // Add the dice values to the HTML table
    }

    for (let i in throwCount) {
        const countNumber = outcome.filter(thrown => thrown == i).length; //Applies filter to array 'outcome' for number of throwCount, save length to a variable
        throwCount[i] = countNumber; //Append total of that number to the corresponding object key
    }
    const throwCountValues = Object.values(throwCount)  //Copy the object values of the throw to an array

    for (i = 0; i < throwCountValues.length; i++){
        values[i] = throwCountValues[i] * (i+1)  // Summarise the total score of the throw and add that to the HTML table
        dieTotal[i].innerHTML = values[i]
    }

    if (throwCountValues.includes(3)) { //If array contains 3 times the same value, summarise the total throw count
        document.getElementById("threeOfAKind").innerHTML = values.reduce((a,b) => a + b, 0)
    } else if(throwCountValues.includes(4)){ //If array contains 4 times the same value, summarise the total throw count
        document.getElementById("carre").innerHTML = values.reduce((a,b) => a + b, 0)
    } else if(throwCountValues.includes(3) && throwCountValues.includes(2)){ //If array contains 3 times and 2 times the same value, add 25 points
        document.getElementById("fullHouse").innerHTML = 25
    } else if(throwCountValues.includes(5)) { 
        document.getElementById("yahtzee").innerHTML = 50 //If array contains 5 times the same value, add 50 points
    } else if(seqCompare(throwCountValues) === 4){
        document.getElementById("smallStreet").innerHTML = 30 //If array contains 4 consecutive values, add 30 points
    } else if(seqCompare(throwCountValues) === 5){
        document.getElementById("largeStreet").innerHTML = 40 //If array contains 5 consecutive values, add 40 points
    } else{
        document.getElementById("chance").innerHTML = values.reduce((a,b) => a + b, 0) //Summarise the throw if there are no other categories
    }

    for(i = 0; i < locked.length; i++){
        lockedClass[i].innerHTML = locked[i] // Return all the locked class values to the table 
    }  
}

document.getElementById("throwButton").addEventListener("click", Throw)

document.querySelectorAll('.score').forEach(element => {
    element.addEventListener('click', (event) =>{ // Add an event listener to every score value in order to be able to lock it.
        const scoreOne = []
        const scoreTwo = []

        if(element.innerHTML !== '0'){ // Don't respond to empty cells
            score.forEach(element => {
                element.classList.remove("tmpLocked") // Make sure only one cell can be temporarily locked
            })

            event.target.classList.add("tmpLocked")

            oneClass.forEach(element => { // Fill the scoreOne array with all locked or tmpLocked values of part one
                if(element.classList.contains("tmpLocked") || element.classList.contains("locked")){
                    scoreOne.push(parseInt(element.innerHTML))
                }
            })

            twoClass.forEach(element =>{ // Fill the scoreTwo array with all locked or tmpLocked values of part two
                if(element.classList.contains("tmpLocked") || element.classList.contains("locked")){
                    scoreTwo.push(parseInt(element.innerHTML))
                }
            })

            totalPartOneBeforeBonus.innerHTML = scoreOne.reduce((a,b) => a + b, 0) // Calculate the score for part one without the bonus

            totalPartTwo.innerHTML = scoreTwo.reduce((a,b) => a + b, 0) // Calculate the score for part two
       
            if (parseInt(totalPartOneBeforeBonus.innerHTML) >= 63) { // If the total of part one is higher or equal to 63 points, add a bonus
                bonus.innerHTML = 35
            }

            totalPartOne.forEach(element => {
                element.innerHTML = parseInt(totalPartOneBeforeBonus.innerHTML) + parseInt(bonus.innerHTML) // Total the score of part one and the bonus
            })

            total.innerHTML = parseInt(totalPartOne[0].innerHTML) + parseInt(totalPartTwo.innerHTML) // Total the final score of part one and part two 
        }
    }) 
})




