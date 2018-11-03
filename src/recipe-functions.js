import uuidv4 from "uuidv4"

import {Ingridients}  from "./recipe"

export const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    } 
}

const recipes = getSavedRecipes()

export const saveRecipes = (recipesArr) => {
    localStorage.setItem("recipes", JSON.stringify(recipesArr))
}

export const getRecipeIndex = (recipeId) => {
     return recipes.findIndex((element) => {
        return element.id === recipeId
    })
    
}

const removeIngridient = (recipesArr, recipeIndex, ingridientIndex) => {
    recipesArr[recipeIndex].ingridients.splice(ingridientIndex, 1)
    saveRecipes(recipesArr)
    renderIngridients(recipesArr,recipeIndex)
}

export const renderIngridients = (recipesArr, recipeIndex) => {
    if(!recipesArr[recipeIndex]){
        return
    }
    document.querySelector("#ingridients").innerHTML = ""

    //Setup elements
    recipesArr[recipeIndex].ingridients.forEach((element, index) => {
        const container = document.createElement("li")
        const ingridientElement = document.createElement("span")
        const checkboxElement = document.createElement("input")
        const removeElement = document.createElement("button")

        checkboxElement.setAttribute("type", "checkbox")
        checkboxElement.checked = element.exists
        ingridientElement.textContent = element.name
        removeElement.textContent = "x"
    
        removeElement.addEventListener("click", (e) => {
            e.preventDefault()
            removeIngridient(recipesArr, recipeIndex, index)
        })
        
        checkboxElement.addEventListener("change", (e) => {
            recipesArr[recipeIndex].ingridients[index].exists = e.target.checked
            saveRecipes(recipesArr)
        })

        container.appendChild(checkboxElement)
        container.appendChild(ingridientElement)
        container.appendChild(removeElement)
        document.querySelector("#ingridients").appendChild(container)
    })
}

export const saveRecipe = (recipesArr, recipeIndex,recipeTitleElement, recipeTextElement) => {
    const name = recipeTitleElement.value
    const text = recipeTextElement.value

    recipesArr[recipeIndex].name = name
    recipesArr[recipeIndex].text = text

    saveRecipes(recipesArr)
    console.log(recipesArr)
}

export const saveIngridient = (recipesArr, recipeIndex) => {
    const name = document.querySelector("#ingridient-input")
    if(!name.value.trim()){
        return
    }
    //Adds new ingridient to the recipe
    const ingridient = new Ingridients (uuidv4(), name.value.trim())
    recipesArr[recipeIndex].ingridients.push(ingridient)

    saveRecipes(recipesArr,recipeIndex)
    name.value = ""
}