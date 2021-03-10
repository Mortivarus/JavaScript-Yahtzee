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

const seqCompare = (array) => {
    let numSeq = 0
    for(i = 0; i < array.length; i++){
        j = i + 1
        k = Math.abs(array[i] - array[j])
        if(k === 1 && array[i] !== 0 && array[j] !== 0 ){
            numSeq += 1
        } else if(array[i] === array[j] && array[i] != 0){
            numSeq += 1
        }
    }
    if (numSeq > 0){
        return numSeq + 1
    }
    
}

const Throw = () => {
    const outcome = []
    
    const values = []
    
    const smlStrArray = [   //Array that contains all the options for a small street 
        
    ]

    const lrgStrArray = [ //Array that contains all the options for a large street
        [1, 1, 1, 1, 1, 0], // (1, 2, 3, 4, 5)
        [0, 1, 1, 1, 1, 1]
    ]

    for (i = 0; i < 5; i++){
        outcome.push(Math.floor(Math.random()*(6 -1 + 1)) +1)
    }

    for (i = 0; i < outcome.length; i++){
        dieRow[i].innerHTML = outcome[i]
    }

    for (let i in throwCount) {
        const countNumber = outcome.filter(thrown => thrown == i).length; //Applies filter to array 'outcome' for number of throwCount, save length to a variable
        throwCount[i] = countNumber; //Append total of that number to the corresponding object key
    }
    const throwCountValues = Object.values(throwCount)

    for (i = 0; i < throwCountValues.length; i++){
        values[i] = throwCountValues[i] * (i+1)
        dieTotal[i].innerHTML = values[i]
    }
    console.log(throwCountValues)

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

document.addEventListener("click", Throw)




