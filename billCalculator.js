let total = 0;

let drinks = {
    "cappuccino": 65,
    "coldBrewCoffee": 36,
    "doubleEspresso": 60,
    "espressoMacchiato": 50,
    "flatWhite": 23
}

let foods = {
    "chickenMayo": 48,
    "chickenSalad": 54,
    "dagwood": 30,
    "baconAndEggs": 45,
    "strawberryCheesecake": 88
}

// Calls all the necessary functions to build an order and displays the total at the end.
placeOrder = () => {
    let drinkList = buildItemListFromObject(drinks);
    let foodList = buildItemListFromObject(foods);

    getListInput("What drink would you like to order? Enter 1-5:", "Please select a drink using the numbers 1-5:", drinkList);
    getListInput("What drink would you like to order? Enter 1-5:", "Please select a drink using the numbers 1-5:", foodList);
    getInput(`How much would you like to tip?`, `Please enter a number, 0 is fine too.`);

    alert(`Your total is R${total} including your tip.`);
}

// Returns whether a value is a number or not by specifying true|false.
isNumber = (value) => {
    return !Number.isNaN(value);
}

// Returns whether an index is within the range of valid indices for an array by specifying true|false.
isWithinRange = (index, array) => {
    return index >= 1 && index <= array.length;
}

// Generates Prompt Text by taking in main text and adding a list of items below the main text.
// The result is returned.
buildPromptText = (promptText, optionList) => {
    let text = promptText;
    optionList.forEach((item, index) => {
        text += `\n${index + 1}. ${item[0]}`;
    });
    return text;
}

// This function builds an array of items from an object.
// Each item will be an array with the value at index 0 
// Being the name of the item produced from an objects key
// and the value at index 1 being the price of the item
// Being the value assigned to the object key.
// The array of items is returned by this function.
buildItemListFromObject = (obj) => {
    let array = [];
    for (item in obj) {
        let itemNameBuilder = "";
        // Split an object key into an array and rebuild the split letters into a group of words
        // using Capitalization case instead of the usual camelCase.
        let itemName = item.split("");
        itemName.forEach((letter, index) => {
            if (index === 0) itemNameBuilder += letter.toUpperCase();
            else {
                // codes 65 - 90 refers to all uppercase letters A-Z.
                if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
                    itemNameBuilder += " ";
                    itemNameBuilder += letter;
                } else itemNameBuilder += letter;
            }
        });
        array.push([itemNameBuilder, obj[item]]);
    }
    return array;
}

// Helps to get input from a user based on a list of items.
// You need to provide the list, what the user should be prompted and what the prompt should
// be if the user enters incorrectly.
getListInput = (promptText, failedPromptText, optionList) => {
    var text = buildPromptText(promptText, optionList);
    var item = "";
    while (item === "") {
        item = prompt(text);
        if (item === null) break;
        let addItem = isNumber(item) && isWithinRange(item, optionList) ? true : false;
        if (addItem) total += optionList[item - 1][1];
        else {
            item = "";
            text = buildPromptText(failedPromptText, optionList);
        }
    }
}

// Helps to get input from a user based on a prompt.
// You need to provide what the user should be prompted and what the prompt should
// be if the user enters incorrectly.
getInput = (promptText, failedPromptText) => {
    var text = promptText;
    var value = "";
    while (value === "") {
        value = prompt(text);
        if (value === null) break;
        let addValue = isNumber(value) ? true : false;
        if (addValue) total += parseInt(value);
        else text = failedPromptText;
    }
}