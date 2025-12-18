const nameBox = document.querySelector('#nameBox');
const priceBox = document.querySelector('#priceBox');
const imgUrlBox = document.querySelector('#imgUrlBox');
const addBookBtn = document.querySelector('#addBookBtn');


// ============================================================
// DATA PERSISTENCE WITH localStorage
// ============================================================
// localStorage stores data in the browser that persists even after closing the tab.
// It only stores STRINGS, so we use JSON.stringify() to save and JSON.parse() to load.
//
// This uses a TERNARY OPERATOR: condition ? valueIfTrue : valueIfFalse
// It's a shorthand for if-else that returns a value.
//
// Flow:
// 1. localStorage.getItem('booksData') - tries to get saved data
// 2. If data exists (truthy), parse it from JSON string to array
// 3. If no data (null/falsy), use empty array as default
let books = localStorage.getItem('booksData')
    ? JSON.parse(localStorage.getItem('booksData'))
    : []


// Alternative approach (Ver 2) - same result, more verbose:
// let books = [];
//
// const loadBooks = () => {
//     const json = localStorage.getItem('booksData');
//     if(!json) return;  // Guard clause - exit early if no data
//     books = JSON.parse(json);
// }
//
// loadBooks();


// ============================================================
// ADD BOOK FUNCTION
// ============================================================
// Arrow function syntax: const functionName = () => { ... }
// Equivalent to: function functionName() { ... }
const addBook = () => {

    // EARLY RETURN PATTERN 
    // If validation fails, exit the function immediately.
    // This keeps the main logic flat and readable (no deep nesting).
    if (!validation()) return;

    // Create a book object from input values
    // The '+' before priceBox.value converts the string to a number
    // (input values are always strings, even for type="number")
    const book = {
        name: nameBox.value,
        price: +priceBox.value,     // Same as: Number(priceBox.value) or parseInt(priceBox.value)
        imgUrl: imgUrlBox.value
    }

    // Add book to array using push() - adds to the END of the array
    books.push(book);

    // Save to localStorage - must convert to JSON string first
    localStorage.setItem('booksData', JSON.stringify(books));

    // Re-render the books display
    printBooks(books);

    clearInputs();  // clear inputs after adding
}


// ============================================================
// PRINT/RENDER BOOKS FUNCTION
// ============================================================
// Receives an array of books and renders them as HTML cards
const printBooks = (booksArr) => {
    let html = '';

    // forEach() iterates over each element and its index
    // we can also use map(), but forEach is better for side effects
    // Here we're using it for side effects (building HTML string)
    booksArr.forEach((book, index) => {
        // TEMPLATE LITERALS (backticks ` `)
        // Allow multi-line strings and variable interpolation with ${expression}
        // Much cleaner than string concatenation: '<div>' + book.name + '</div>'
        html += `
        <div class="bookCard">
            <img src="${book.imgUrl}" alt="Book Image">
            <h3 class="bookName">${book.name}</h3>
            <p class="bookPrice">${book.price}</p>

            <!--
                INLINE ONCLICK with index parameter
                We pass the index so deleteBook knows which book to remove.
                The index comes from forEach()'s second parameter above.
            -->
            <button id="deleteBookBtn" onclick="deleteBook(${index})">Delete Book</button>
        </div>
        `
    })

    // innerHTML replaces ALL content inside the element with our HTML string
    // This is a simple approach; for large lists, consider more efficient methods
    document.querySelector('#booksContainer').innerHTML = html;
}


// ============================================================
// VALIDATION FUNCTION
// ============================================================
// Returns true if all inputs are valid, false otherwise.
// Uses EARLY RETURN pattern - check and exit for each error case.
const validation = () => {
    // Check if name is empty
    if (nameBox.value === '') {
        alert('Name is required');
        nameBox.focus();  // focus() moves cursor to this input - good UX!
        return false;     // Exit immediately, don't check other fields
    }

    // Check price: empty, not a number, or not positive
    // isNaN() returns true if the value is Not-a-Number
    // The '+' converts to number for the <= 0 check
    if (priceBox.value === '' || isNaN(priceBox.value) || +priceBox.value <= 0) {
        alert('Invalid book price');
        priceBox.focus();
        return false;
    }

    // Check if image URL is empty
    if (imgUrlBox.value === '') {
        alert('Image URL is required');
        imgUrlBox.focus();
        return false;
    }

    // All validations passed
    return true;
}


// ============================================================
// UTILITY FUNCTION - CLEAR INPUTS
// ============================================================
// Resets all input fields to empty strings
const clearInputs = () => {
    nameBox.value = '';
    priceBox.value = '';
    imgUrlBox.value = '';
}


// ============================================================
// FILTER FUNCTION
// ============================================================
// filter() creates a NEW array with elements that pass the test
// Original array (books) is NOT modified
const filterByPrice = (min, max) => {
    // Validation for filter values
    if (max > min || min < 0 || max < 0) {
        alert('Invalid filter values');
        return;
    }

    const filteredBooks = books.filter(book => book.price >= min && book.price <= max);

    // Display filtered results (doesn't modify original books array)
    printBooks(filteredBooks);
}


// ============================================================
// DELETE FUNCTION
// ============================================================
// Removes a book at the specified index
const deleteBook = (index) => {
    // splice(startIndex, deleteCount) removes elements from an array
    // This MUTATES the original array (unlike filter which creates a new one)
    // splice(2, 1) means: starting at index 2, remove 1 element
    books.splice(index, 1);

    // Save updated array to localStorage
    localStorage.setItem('booksData', JSON.stringify(books));

    // Re-render to reflect the deletion
    printBooks(books);
}


// ============================================================
// INITIAL RENDER
// ============================================================
// Display books when page loads (from localStorage or empty array)
printBooks(books);


// ============================================================
// EVENT LISTENERS
// ============================================================
// addEventListener(eventType, callbackFunction)
// Better than onclick attribute because:
// 1. Can attach multiple listeners to same element
// 2. Keeps JavaScript separate from HTML
// 3. More control (can remove listeners, specify options)

addBookBtn.addEventListener('click', addBook)


// ============================================================
// SORTING FUNCTIONALITY
// ============================================================
// sort() modifies the original array (mutates it)
// It takes a COMPARE FUNCTION that determines the order

document.querySelector('#sortByPrice').addEventListener('click', () => {
    // Compare function for numbers:
    // Returns negative if a should come before b
    // Returns positive if a should come after b
    // Returns 0 if they're equal
    // (a.price - b.price) gives us ascending order (small to large)
    // For descending: (b.price - a.price)
    const sortedBooks = books.sort((a, b) => a.price - b.price)
    printBooks(sortedBooks);
})

document.querySelector('#sortByName').addEventListener('click', () => {
    // localeCompare() is the proper way to compare strings
    // It handles special characters and different languages correctly
    // Returns negative, zero, or positive like the compare function expects
    // For descending: b.name.localeCompare(a.name)
    const sortedBooks = books.sort((a, b) => a.name.localeCompare(b.name))
    printBooks(sortedBooks);
})

// Filter button - get min/max values and call filter function
document.querySelector('#filterBtn').addEventListener('click', () => {
    // The '+' converts string input values to numbers
    const min = +document.querySelector('#filterMin').value;
    const max = +document.querySelector('#filterMax').value;
    filterByPrice(min, max);
})


// ============================================================
// SELECT DROPDOWN - COLOR CHANGE
// ============================================================
// 'change' event fires when the select value changes (user picks an option)
// Different from 'input' event which fires on every keystroke

document.querySelector('#colorSelect').addEventListener('change', () => {
    // Access the selected option's value and apply it as background color
    // The value attribute from HTML becomes the color name
    document.body.style.backgroundColor = document.querySelector('#colorSelect').value;
})


// ============================================================
// RADIO BUTTONS - TEXT SIZE
// ============================================================
// querySelectorAll returns a NodeList of ALL matching elements
// 'input[name="textSize"]' is an ATTRIBUTE SELECTOR - selects inputs where name="textSize"

document.querySelectorAll('input[name="textSize"]').forEach(radio => {
    // 'change' event fires when a different radio is selected
    radio.addEventListener('change', () => {
        // radio.value contains the value attribute ('small', 'medium', 'large')
        // These work as font-size values because CSS accepts these keywords
        document.body.style.fontSize = radio.value;
    })

    // BONUS: Allow deselecting a radio button
    // Standard radio buttons can't be deselected, but we can add this behavior
    radio.addEventListener('click', () => {
        // Check if this radio was already selected (same value as current fontSize)
        // If so, uncheck it and reset the font size
        if (radio.checked && radio.value === document.body.style.fontSize) {
            radio.checked = false;
            document.body.style.fontSize = '';  // Reset to default
        }
    })
})


// Alternative simpler version:
// document.querySelectorAll('.radioSize').forEach(radio => {
//     radio.addEventListener('change',() => {
//         document.body.style.fontSize = radio.value;
//     })
// })


// ============================================================
// CHECKBOXES - FEATURE SELECTION
// ============================================================
// Checkboxes are independent - multiple can be checked at once

const featureContainer = document.querySelector('#featureContainer');

// Select ALL checkboxes on the page
// Note: In a real app, you might want a more specific selector
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Clear the container on each change
        // We'll rebuild it from scratch based on current checkbox states
        featureContainer.innerHTML = '';

        // Loop through ALL checkboxes and display only the checked ones
        // This approach is simple but rebuilds everything on each change
        checkboxes.forEach(cb => {
            // .checked is a boolean property (true if checked, false if not)
            if (cb.checked) {
                // Add a div showing this feature's value
                featureContainer.innerHTML += `<div>${cb.value}</div>`
            }
        })
    })
})
