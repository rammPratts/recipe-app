import uuidv4 from "uuidv4"
import { unwatchFile } from "fs";


class Ingridients{
    constructor(id, name){
        this.id = id
        this.name = name
        this.exists = false
    }
}
export const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    } 
}

const recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
const recipeTitleElement  = document.querySelector("#recipe-name")
const recipeTextElement = document.querySelector("#recipe-text")


const recipeIndex = recipes.findIndex((element) => {
    return element.id === recipeId
})

const saveRecipes = (recipes) => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
}

const renderIngridients = () => {
    if(!recipes[recipeIndex]){
        return
    }
    document.querySelector("#ingridients").innerHTML = ""

    //Setup elements
    recipes[recipeIndex].ingridients.forEach((element, index) => {
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
            recipes[recipeIndex].ingridients.splice(index, 1)
            saveRecipes(recipes)
            renderIngridients()
        })
        
        checkboxElement.addEventListener("change", (e) => {
            recipes[recipeIndex].ingridients[index].exists = e.target.checked
            saveRecipes(recipes)
        })

        container.appendChild(checkboxElement)
        container.appendChild(ingridientElement)
        container.appendChild(removeElement)
        document.querySelector("#ingridients").appendChild(container)
    })

}

export class Recipe {
    constructor(id){
        this.id = id
        this.name = ""
        this.text = ""
        this.ingridients = []
    }
}


//Update page data

// if(!recipes[recipeIndex]){
//     recipeTitleElement.value = recipes[recipeIndex].name
//     recipeTextElement.textContent = recipes[recipeIndex].text
//     renderIngridients()
// }

//Saves the recipe when clicking the add button
if(document.querySelector("#save-recipe")){
    document.querySelector("#save-recipe").addEventListener("click", (e) => {
        e.preventDefault()
        const name = recipeTitleElement.value
        const text = recipeTextElement.value
    
        recipes[recipeIndex].name = name
        recipes[recipeIndex].text = text
    
        saveRecipes(recipes)
        console.log(recipes)
    })
}


// Add ingridients
if(document.querySelector("#add-ingridient")){
    document.querySelector("#add-ingridient").addEventListener("click", (e) => {
        e.preventDefault()
        
        const name = document.querySelector("#ingridient-input")
        if(!name.value.trim()){
            return
        }
        //Adds new ingridient to the recipe
        const ingridient = new Ingridients (uuidv4(), name.value.trim())
        recipes[recipeIndex].ingridients.push(ingridient)
    
        saveRecipes(recipes)
        name.value = ""
        renderIngridients()
    })
}
