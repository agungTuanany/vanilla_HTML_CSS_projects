const  search             = document.getElementById("search")
const  submit             = document.getElementById("submit")
const  random             = document.getElementById("random")
const  mealsElement       = document.getElementById("meals")
const  resultHeading      = document.getElementById("result-heading")
const  single_mealElement = document.getElementById("single-meal")


// Search meal and fetch from API
function searchMeal(event) {
    event.preventDefault()

    // Clear single meal
    single_mealElement.innerHTML = ""

    // get search term
    const term = search.value

    // TODO: create your own DOM element
    // Check for empty
    if (term.trim()) {
        fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then (res => res.json())
            .then (data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search result. Try again</p>`
                }
                else {
                    mealsElement.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data=mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
                    )
                        .join("")
                }
            })
        // Clear search text
        search.value = ""

    }
}





// Event Listener
submit.addEventListener("submit", searchMeal)

