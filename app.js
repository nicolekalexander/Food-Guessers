//function that creates a new question
const makeQuestion = () => {
    //variables storing random number generators for foodA, foodB, and nutrient arrays
    const randomNumberFoodA = Math.floor(Math.random() * 2014)
    const randomNumberFoodB = Math.floor(Math.random() * 2014)
    const randomNumberNutrient = Math.floor(Math.random() * 3)

    //variables storing random numbers generated from foodA, foodB, and nutrient arrays
    const randomNutrient = nutrients[randomNumberNutrient]
    const foodA = foods[randomNumberFoodA]
    const foodB = foods[randomNumberFoodB]

    //variables storing valued amounts of the random nutrients generated for each food
    const foodAValue = foodA[randomNutrient]
    const foodBValue = foodB[randomNutrient]
    const foodAName = Math.round(foodA.Portion_Amount, 2) + " " + foodA.Portion_Display_Name + " of " + foodA.Display_Name
    const foodBName = Math.round(foodB.Portion_Amount, 2) + " " + foodB.Portion_Display_Name + " of " + foodB.Display_Name

    //if statement that calls make question if foodA or foodB value is 0
    if (foodAValue == 0 || foodBValue == 0) {
        //make new question
        makeQuestion()
        //exit this function call
        return false
    }

    //jQuery selectors selecting buttons and writing the display names of the random foods
    $("#foodA").text(foodAName)
    $("#foodB").text(foodBName)
    $("#nutrient").text(randomNutrient.replace("_", " ") + "?")

    //removes all event handlers in order to prevent over handling of events
    $("#foodA, #foodB, #food0").off()

    //jQuery selector selecting buttons and assigning onclick event listener function 
    //when you click the selected buttons, the getNewQuestion function happens
    $("#foodA, #foodB, #food0").on("click", () => {
        getNewQuestion({
            "nutrient": randomNutrient,
            "foodA": foodAName,
            "foodAValue": foodAValue,
            "foodB": foodBName,
            "foodBValue": foodBValue
        })
    })
}

//function that displays info from last question, and calls the makeQuestion function
const getNewQuestion = (lastQuestionInfo) => {

    let whichHasMore = " "
    if (lastQuestionInfo.foodAValue > lastQuestionInfo.foodBValue) {
        whichHasMore = lastQuestionInfo.foodA
    } else if (lastQuestionInfo.foodAValue < lastQuestionInfo.foodBValue) {
        whichHasMore = lastQuestionInfo.foodB
    } else {
        whichHasMore = "Neither"
    }

    //jQuery selector selecting buttons and writing the display names of the former question
    $("#lastAnswerNutrient").text(whichHasMore + " has more " + lastQuestionInfo.nutrient.replace("_", " "))
    $("#lastAnswerFoodA").text(lastQuestionInfo.foodA)
    $("#lastAnswerFoodAValue").text(Math.round(lastQuestionInfo.foodAValue, 2) + " g")
    $("#lastAnswerFoodB").text(lastQuestionInfo.foodB)
    $("#lastAnswerFoodBValue").text(Math.round(lastQuestionInfo.foodBValue, 2) + " g")


    //question fades away (nutrient, foodA, and foodB) 
    $("#nutrient").addClass("fadeOut")
    $("#foodA").addClass("fadeOut")
    $("#foodB").addClass("fadeOut")

    //unhides the "answer" row
    $("#lastAnswerRow").show()
    $("#lastAnswerRow").addClass("bounceIn")

    setTimeout(function () {
        $("#lastAnswerRow").removeClass("bounceIn")
        $("#nutrient").removeClass("fadeOut")
        $("#foodA").removeClass("fadeOut")
        $("#foodB").removeClass("fadeOut")
    }, 1000);

    //question (nutrient, foodA, foodB) fades in again
    setTimeout(function () {
        $("#nutrient").addClass("fadeIn")
        $("#foodA").addClass("fadeIn")
        $("#foodB").addClass("fadeIn")
    }, 4000);

    //calls makeQuestion function to generate new question
    makeQuestion()
}

////////////////////////////////////////////////////////////////////////////////////////////
//any code written after this runs once when user arrives, because it's in the global scope 

//initially hides "answer" row
$("#lastAnswerRow").hide()

//generates first question
makeQuestion()