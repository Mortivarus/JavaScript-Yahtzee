const dieRow = document.getElementsByClassName("dieRow")

const Throw = () => {
    const outcome = []
    for (i = 0; i < 5; i++){
        outcome.push(Math.floor(Math.random()*(6 -1 + 1)) +1)
    }

    for (i = 0; i < outcome.length; i++){
        dieRow[i].innerHTML = outcome[i]
    }


}

document.addEventListener("click", Throw)