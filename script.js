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


const Throw = () => {
    const outcome = []
    const values = []
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

    if (throwCountValues.includes(3)) {
        document.getElementById("threeOfAKind").innerHTML = values.reduce((a,b) => a + b, 0)
    } else if(throwCountValues.includes(4)){
        document.getElementById("carre").innerHTML = values.reduce((a,b) => a + b, 0)
    } else if(throwCountValues.includes(3) && throwCountValues.includes(2)){
        document.getElementById("fullHouse").innerHTML = 25
    } else if(throwCountValues.includes(5)) {
        document.getElementById("yahtzee").innerHTML = 50
    }
    



}

document.addEventListener("click", Throw)




