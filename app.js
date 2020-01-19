
const makeQuestion = () => {
    const randomNumberFoodA = Math.floor(Math.random()*2014)
    const randomNumberFoodB = Math.floor(Math.random()*2014)
    const randomNumberNutrient = Math.floor(Math.random()*3)
    
    const randomNutrient = nutrients[randomNumberNutrient]
    const randomFoodA = foods[randomNumberFoodA]
    const randomFoodB = foods[randomNumberFoodB]
    const foodAValue = randomFoodA[randomNutrient]
    const foodBValue = randomFoodB[randomNutrient]

    $("#foodA").text(randomFoodA.Display_Name)
    $("#foodB").text(randomFoodB.Display_Name)
    $("#nutrient").text(randomNutrient.replace("_", " "))

    $("#foodA").on("click" , () => {
        getNewQuestion({
            "nutrient": randomNutrient,
            "foodA": randomFoodA.Display_Name,
            "foodAValue": foodAValue,
            "foodB": randomFoodB.Display_Name,
            "foodBValue": foodBValue
        })
    })
}

const getNewQuestion = (lastQuestionInfo) => {

    $("#lastAnswerNutrient").text(lastQuestionInfo.nutrient.replace("_", " "))
    $("#lastAnswerFoodA").text(lastQuestionInfo.foodA)
    $("#lastAnswerFoodAValue").text(lastQuestionInfo.foodAValue)
    $("#lastAnswerFoodB").text(lastQuestionInfo.foodB)
    $("#lastAnswerFoodBValue").text(lastQuestionInfo.foodBValue)

    $("#lastAnswerRow").show()
    
    makeQuestion()
}





$("#lastAnswerRow").hide()


makeQuestion()
