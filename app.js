//function that creates a new question
const makeQuestion = () => {
    //variables storing random number generators for foodA, foodB, and nutrient arrays
    const randomNumberFoodA = Math.floor(Math.random()*2014)
    const randomNumberFoodB = Math.floor(Math.random()*2014)
    const randomNumberNutrient = Math.floor(Math.random()*3)

    //variables storing random numbers generated from foodA, foodB, and nutrient arrays
    const randomNutrient = nutrients[randomNumberNutrient]
    const randomFoodA = foods[randomNumberFoodA]
    const randomFoodB = foods[randomNumberFoodB]

    //variables storing valued amounts of the random nutrients generated for each food
    const foodAValue = randomFoodA[randomNutrient]
    const foodBValue = randomFoodB[randomNutrient]

//jQuery selectors selecting buttons and writing the display names of the random foods
    $("#foodA").text(randomFoodA.Display_Name)
    $("#foodB").text(randomFoodB.Display_Name)
    $("#nutrient").text(randomNutrient.replace("_", " "))

//jQuery selector selecting buttons and assigning onclick event listener function 
//when you click the selected buttons, the getNewQuestion function happens
    $("#foodA, #foodB, #food0").on("click" , () => {
        getNewQuestion({
            "nutrient": randomNutrient,
            "foodA": randomFoodA.Display_Name,
            "foodAValue": foodAValue,
            "foodB": randomFoodB.Display_Name,
            "foodBValue": foodBValue
        })
    })
}

//function that displays info from last question, and calls the makeQuestion function
const getNewQuestion = (lastQuestionInfo) => {
    
    //jQuery selector selecting buttons and writing the display names of the former question
    $("#lastAnswerNutrient").text(lastQuestionInfo.nutrient.replace("_", " "))
    $("#lastAnswerFoodA").text(lastQuestionInfo.foodA)
    $("#lastAnswerFoodAValue").text(Math.round(lastQuestionInfo.foodAValue, 2))
    $("#lastAnswerFoodB").text(lastQuestionInfo.foodB)
    $("#lastAnswerFoodBValue").text(Math.round(lastQuestionInfo.foodBValue, 2))

    //unhides the "last answer" row
    $("#lastAnswerRow").show()
    
    //calls makeQuestion function to generate new question
    makeQuestion()
}




//any code written after this runs once when user arrives, because it's in the global scope 


//initially hides "last answer" row
$("#lastAnswerRow").hide()

//generates first question
makeQuestion()
