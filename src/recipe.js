import uuidv4 from "uuidv4"

const recipes = []

class Ingridients{
    constructor(id, name){
        this.id = id
        this.name = name
        this.exists = false
    }
}

class Recipe {
    constructor(id){
        this.id = id
        this.name = ""
        this.text = ""
        this.ingridients = []
    }
    getRecipes(){
        const data = localStorage.getItem("recipes")
        return JSON.parse(data)
    }
    saveRecipe(){
        recipes.push(this)
        localStorage.setItem("recipes", JSON.stringify(recipes))
    }
    addIngridient(name){
        const ingridient = new Ingridients(uuidv4, name)
        this.ingridients.push(ingridient)
    }
}

//Creates a new recipe instance as soon as enters the page
const recipe = new Recipe(uuidv4)

//Saves the recipe when clicking the add button
document.querySelector("#add-recipe").addEventListener("click", (e) => {
    e.preventDefault()
    const name = document.querySelector("#recipe-name").value
    const text = document.querySelector("#recipe-text").value

    recipe.name = name
    recipe.text = text

    recipe.saveRecipe()
    console.log(recipe)
})

//Add ingridients
document.querySelector("#add-ingridient").addEventListener("click", (e) => {
    e.preventDefault()

    const textElement = document.querySelector("#ingridient-input")
    const container = document.createElement("li")
    const ingridientElement = document.createElement("span")
    const checkboxElement = document.createElement("input")
    const removeElement = document.createElement("button")

    //Setup elements
    checkboxElement.setAttribute("type", "checkbox")
    ingridientElement.textContent = textElement.value
    removeElement.textContent = "x"

    removeElement.addEventListener("click", (e) => {
        e.preventDefault()

    })

    container.appendChild(checkboxElement)
    container.appendChild(ingridientElement)
    container.appendChild(removeElement)

    recipe.addIngridient(textElement.value)

    document.querySelector("#ingridients").appendChild(container)

})