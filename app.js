//initially hides "answer" row
$(".bg-cartoon-foods").addClass('bounceIn')
$("#lastAnswerRow").hide()

//function that creates a new question
const makeQuestion = () => {
    $("#questionRow").show()
    $("#lastAnswerRow").hide()
    $("#lastAnswerRow").removeClass("bounceOut")
    $("#questionRow").removeClass('bounceOut')
    $("#questionRow").addClass("bounceIn")
    $("#lastAnswerRow").addClass("animated")

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
    const foodAName = (Math.round(foodA.Portion_Amount * 100, 2)) / 100 + " " + foodA.Portion_Display_Name + " of " + foodA.Display_Name
    const foodBName = (Math.round(foodB.Portion_Amount * 100, 2)) / 100 + " " + foodB.Portion_Display_Name + " of " + foodB.Display_Name

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
        getAnswer({
            "nutrient": randomNutrient,
            "foodA": foodAName,
            "foodAValue": foodAValue,
            "foodB": foodBName,
            "foodBValue": foodBValue
        })
    })
}

//function that displays info from last question, and calls the makeQuestion function
const getAnswer = (lastQuestionInfo) => {

    let whichHasMore = " "
    if (parseFloat(lastQuestionInfo.foodAValue) > parseFloat(lastQuestionInfo.foodBValue)) {
        whichHasMore = lastQuestionInfo.foodA
    } else if (parseFloat(lastQuestionInfo.foodAValue) < parseFloat(lastQuestionInfo.foodBValue)) {
        whichHasMore = lastQuestionInfo.foodB
    } else {
        whichHasMore = "Neither"
    }

    //question and answer fades away (nutrient, foodA, and foodB) 
    $("#questionRow").addClass('bounceOut')
    
    //after 0.6 second
    setTimeout(function () {
        
        //unhides the "answer" row
        $("#questionRow").hide()
        $("#lastAnswerRow").show()
        $("#lastAnswerRow").removeClass("bounceOut")
        $("#lastAnswerRow").addClass("bounceIn")
        
        //jQuery selector selecting buttons and writing the display names of the former question
        $("#lastAnswerNutrient").text(whichHasMore + " has more " + lastQuestionInfo.nutrient.replace("_", " "))
        $("#lastAnswerFoodA").text(lastQuestionInfo.foodA)
        $("#lastAnswerFoodAValue").text(Math.round(lastQuestionInfo.foodAValue, 2) + (lastQuestionInfo.nutrient == "Calories" ? " cal" : " g"))
        $("#lastAnswerFoodB").text(lastQuestionInfo.foodB)
        $("#lastAnswerFoodBValue").text(Math.round(lastQuestionInfo.foodBValue, 2) + (lastQuestionInfo.nutrient == "Calories" ? " cal" : " g"))
    }, 600);

    //jQuery selector selecting buttons and writing the display names of the former question
    $("#lastAnswerNutrient").text(whichHasMore + " has more " + lastQuestionInfo.nutrient.replace("_", " "))
    $("#lastAnswerFoodA").text(lastQuestionInfo.foodA)
    $("#lastAnswerFoodAValue").text(Math.round(lastQuestionInfo.foodAValue, 2))
    $("#lastAnswerFoodB").text(lastQuestionInfo.foodB)
    $("#lastAnswerFoodBValue").text(Math.round(lastQuestionInfo.foodBValue, 2))
}
////////////////////////////////////////////////////////////////////////////////////////////
//any code written after this runs once when user arrives, because it's in the global scope 

//generates first question
makeQuestion()