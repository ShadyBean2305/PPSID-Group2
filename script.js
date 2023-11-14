let jsonData;
let cocktailKeys;
let currentCocktailIndex = 0;
let isRandomStart = false;

function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentLine = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }

    const grouped = result.reduce((acc, curr) => {
        if (!acc[curr.Drink]) {
            acc[curr.Drink] = {
                Drink: curr.Drink,
                Glass: curr.Glass,
                HowToMix: curr["HowToMix\r"].trim(),
                Ingredients: []
            };
        }
        acc[curr.Drink].Ingredients.push({
            Ingredient: curr.Ingredient,
            Amount: curr.Amount,
            IngredientUse: curr.IngredientUse
        });
        return acc;
    }, {});

    return grouped;
}

function displayCocktail(cocktailData) {
    const cocktailSection = document.querySelector('.cocktail');

    cocktailSection.querySelector('.cocktail-name').textContent = cocktailData.Drink;
    cocktailSection.querySelector('.cocktail-glass').textContent = cocktailData.Glass;

    const ingredientsList = cocktailSection.querySelector('.cocktail-ingredients');
    ingredientsList.innerHTML = '';

    for (const ingredient of cocktailData.Ingredients) {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient.Amount} of ${ingredient.Ingredient} - ${ingredient.IngredientUse}`;
        ingredientsList.appendChild(listItem);
    }

 
    cocktailSection.querySelector('.cocktail-how-to-mix').textContent = cocktailData.HowToMix;

    const drinkCounter = document.querySelector('.drink-counter');
    drinkCounter.textContent = `${currentCocktailIndex + 1} of ${cocktailKeys.length}`;
}



function cycleCocktails() {
    currentCocktailIndex = (currentCocktailIndex + 1) % cocktailKeys.length;  
    const currentCocktailKey = cocktailKeys[currentCocktailIndex];
    displayCocktail(jsonData[currentCocktailKey]);
}

document.body.addEventListener('click', cycleCocktails);

fetch('cocktails.csv')
    .then(response => response.text())
    .then(data => {
        jsonData = csvToJson(data);
        cocktailKeys = Object.keys(jsonData);

        if (isRandomStart) {
            currentCocktailIndex = Math.floor(Math.random() * cocktailKeys.length);
        } else {
            currentCocktailIndex = 0;
        }

         // Display the first cocktail based on currentCocktailIndex
         displayCocktail(jsonData[cocktailKeys[currentCocktailIndex]]);
         currentCocktailIndex++; // Increment to the next cocktail for subsequent calls

        displayCocktail
    })
    .catch(error => console.error('Error fetching the CSV:', error));







// Assuming the same structure and functions from the provided JS earlier

let intervalId;  // To keep a reference to the setInterval, so we can stop it if needed

function testAllCocktails() {
    clearInterval(intervalId);  // Stop any existing intervals

    currentCocktailIndex = 0;  // Start from the beginning
    cycleCocktails();  // Display the first cocktail

    intervalId = setInterval(() => {
        console.log(`Displaying cocktail ${currentCocktailIndex + 1} of ${cocktailKeys.length}: ${cocktailKeys[currentCocktailIndex]}`);
        cycleCocktails();

        // Stop the loop when all cocktails have been displayed
        if (currentCocktailIndex >= cocktailKeys.length) {
            clearInterval(intervalId);
            console.log("All cocktails displayed!");

            // Check if any are missing
            if (currentCocktailIndex + 1 !== cocktailKeys.length) {
                console.warn(`Warning: Missed some cocktails! Displayed ${currentCocktailIndex + 1} out of ${cocktailKeys.length}`);
            }
        }
    }, 35);
}    