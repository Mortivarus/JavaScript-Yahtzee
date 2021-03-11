const dieRow = document.getElementsByClassName("dieRow")
const dieTotal = document.getElementsByClassName("dieTotal")

const throwCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
}

const compareArray = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2) //Compare 2 arrays by stringifying them
}

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

    const lrgStrArray = [ //Array that contains all the options for a large street
        [1, 1, 1, 1, 1, 0], // (1, 2, 3, 4, 5)
        [0, 1, 1, 1, 1, 1] // (2, 3, 4, 5, 6)
    ]

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
    const throwCountValues = Object.values(throwCount)  //Move the object values of the throw to an array

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
    } else if(throwCountValues.includes(5)) { //If array contains 5 times the same value, add 50 points
        document.getElementById("yahtzee").innerHTML = 50
    } else if(seqCompare(throwCountValues) === 4){
        document.getElementById("smallStreet").innerHTML = 30 //If array contains 4 consecutive values, add 30 points
    } else if(
        compareArray(throwCountValues, lrgStrArray[1] ||
        compareArray(throwCountValues, lrgStrArray[2]))
    ){
        document.getElementById("largeStreet").innerHTML = 40 //If array contains 5 consecutive values, add 40 points
    } else{
        document.getElementById("chance").innerHTML = values.reduce((a,b) => a + b, 0) //Summarise the throw if there are no other categories
    }
    
}

document.getElementById("throwButton").addEventListener("click", Throw)

let lock = false





