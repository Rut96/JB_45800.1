# Books — Step-by-step mini app (teacher notes → student guide)

> Goal (what we practice):
> `localStorage`, `querySelector`, `filter`, `sort`, `splice`, `forEach`
> (Plus later: `select`, `radio`, `checkbox`)

---

## Step 1 — Sketch the HTML structure (draft)

```html
<body>

  <!-- Book Name -->

  <!-- Book Price -->

  <!-- Book Img -->

  <!-- Smth with choice -->

</body>
```

---

## Step 2 — Fill the HTML (inputs + button)

```html
<!-- Book Name -->
<label>Book name</label>
<input type="text" id="nameBox">

<!-- Book Price -->
<label>Book Price</label>
<input type="number" id="priceBox">

<!-- Book Img -->
<label>Book Img Url</label>
<input type="url" id="imgUrlBox">

<button id="addBookBtn">Add Book</button>

<!-- Smth with choice -->
```

---

## Step 3 — Connect the script, check it works, and outline a plan

```js
const nameBox = document.querySelector('#nameBox');
const priceBox = document.querySelector('#priceBox');
const imgUrlBox = document.querySelector('#imgUrlBox');
const addBookBtn = document.querySelector('#addBookBtn');

// function to add books
// function to print books
```

---

## Step 4 — Read values inside a function and test with console.log

```js
const nameBox = document.querySelector('#nameBox');
const priceBox = document.querySelector('#priceBox');
const imgUrlBox = document.querySelector('#imgUrlBox');
const addBookBtn = document.querySelector('#addBookBtn');

// function to add books
const addBook = () => {
  const name = nameBox.value;
  const price = +priceBox.value;
  const imgUrl = imgUrlBox.value;

  console.log(name, price, imgUrl);
};

// function to print books

addBookBtn.addEventListener('click', addBook);
```

---

## Step 5 — Convert the data into an object

```js
const addBook = () => {
  const name = nameBox.value;
  const price = +priceBox.value;
  const imgUrl = imgUrlBox.value;

  const book = {
    name: name,
    price: price,
    imgUrl: imgUrl
  };

  console.log(book);
};
```

---

## Step 6 — We want to render this object dynamically, so we create a function

```js
// we'll fill this in Step 9
const printBooks = (booksArr) => {
  let html = '';
  booksArr.forEach(book => {
    html += `

        `;
  });
};
```

---

## Step 7 — To fill the template, first “try it” in HTML and copy from there

```html
<!-- Book Img -->
<label>Book Img Url</label>
<input type="url" id="imgUrlBox">

<button id="addBookBtn">Add Book</button>

<div id="booksContainer">
  <div class="bookCard">
    <h3 class="bookName">Book Name</h3>
    <img class="bookImg" src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?semt=ais_hybrid&w=740&q=80" alt="Book Image">
    <p class="bookPrice">Book Price</p>
  </div>
  <div class="bookCard">
    <h3 class="bookName">Book Name</h3>
    <img class="bookImg" src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?semt=ais_hybrid&w=740&q=80" alt="Book Image">
    <p class="bookPrice">Book Price</p>
  </div>
</div>
```

---

## Step 8 — Add simple CSS (just to see cards nicely)

```css
#booksContainer{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.bookCard{
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  width: 200px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

.bookImg{
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.bookPrice{
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
```

---

## Step 9 — Copy the HTML card template into the script (and add `booksContainer` div in HTML)

```js
const printBooks = (booksArr) => {
  let html = '';
  booksArr.forEach(book => {
    html += `
      <div class="bookCard">
        <h3 class="bookName">${book.name}</h3>
        <img class="bookImg" src="${book.imgUrl}" alt="Book Image">
        <p class="bookPrice">${book.price}</p>
      </div>
    `;
  });
  document.querySelector('#booksContainer').innerHTML = html;
};
```

---

## Step 10 — Back to addBook: create an array before everything, push into it, then print

```js
let books = [];

// function to add books
const addBook = () => {
  const name = nameBox.value;
  const price = +priceBox.value;
  const imgUrl = imgUrlBox.value;

  const book = {
    name: name,
    price: price,
    imgUrl: imgUrl
  };

  books.push(book);
  console.log(books);

  // print books
  printBooks(books);
};
```

---

## Step 11 — We can shorten the addBook function without losing meaning

```js
const addBook = () => {
  const book = {
    name: nameBox.value,
    price: +priceBox.value,
    imgUrl: imgUrlBox.value
  };

  books.push(book);
  printBooks(books);
};
```

---

## Step 12 — Next: localStorage

To do this, we replace our array with data from localStorage.  
(And to show cards immediately after refresh, don’t forget to call `printBooks(books)`.)

```js
// let books = [];
let books = localStorage.getItem('booksData')
  ? JSON.parse(localStorage.getItem('booksData'))
  : [];
```

---

## Step 13 — Another way to write the same thing 

```js
let books = [];

const loadBooks = () => {
  const json = localStorage.getItem('booksData');
  if (!json) return;
  books = JSON.parse(json);
};

loadBooks();
```

---

## Step 14 — save to localStorage inside addBook

```js
// function to add books
const addBook = () => {
  const book = {
    name: nameBox.value,
    price: +priceBox.value,
    imgUrl: imgUrlBox.value
  };

  books.push(book);
  localStorage.setItem('booksData', JSON.stringify(books));
  printBooks(books);
};
```

---

## Step 15 — At the end, call printBooks so books show immediately on page load

```js
// let books = [];
let books = localStorage.getItem('booksData')
  ? JSON.parse(localStorage.getItem('booksData'))
  : [];

// function to add books
const addBook = () => {
  const book = {
    name: nameBox.value,
    price: +priceBox.value,
    imgUrl: imgUrlBox.value
  };

  books.push(book);
  localStorage.setItem('booksData', JSON.stringify(books));
  printBooks(books);
};

// function to print books
const printBooks = (booksArr) => {
  let html = '';
  booksArr.forEach(book => {
    html += `
      <div class="bookCard">
        <h3 class="bookName">${book.name}</h3>
        <img class="bookImg" src="${book.imgUrl}" alt="Book Image">
        <p class="bookPrice">${book.price}</p>
      </div>
    `;
  });
  document.querySelector('#booksContainer').innerHTML = html;
};

printBooks(books);

addBookBtn.addEventListener('click', addBook);
```

---

## Step 16 — Add validation

```js
const validation = () => {
  if (nameBox.value === '') {
    alert("Missing book name.");
    nameBox.focus();
    return false;
  }
  if (priceBox.value === '' || isNaN(priceBox.value) || +priceBox.value <= 0) {
    alert("Invalid book price.");
    priceBox.focus();
    return false;
  }
  if (imgUrlBox.value === '') {
    alert("Missing book image URL.");
    imgUrlBox.focus();
    return false;
  }
  return true;
};
```

---

## Step 17 — Call validation inside addBook

```js
const addBook = () => {
  if (!validation()) return;

  const book = {
    name: nameBox.value,
    price: +priceBox.value,
    imgUrl: imgUrlBox.value
  };

  books.push(book);
  localStorage.setItem('booksData', JSON.stringify(books));
  printBooks(books);
};
```

---

## Step 18 — For better UX: clear inputs after adding a book

```js
const clearInputFields = () => {
  nameBox.value = '';
  priceBox.value = '';
  imgUrlBox.value = '';
};
```

```js
const addBook = () => {
  if (!validation()) return;

  const book = {
    name: nameBox.value,
    price: +priceBox.value,
    imgUrl: imgUrlBox.value
  };

  books.push(book);
  localStorage.setItem('booksData', JSON.stringify(books));
  printBooks(books);
  clearInputFields();
};
```

---

## Step 19 — Add sortByPrice button + function

If you write one line — you can do it without `{}`.

```js
const sortBooksByPrice = () => {
  const sortedBooks = books.sort((a, b) => a.price - b.price);
  printBooks(sortedBooks);
};
```

```js
document.querySelector('#sortByPrice').addEventListener('click', sortBooksByPrice);
```

---

## Step 20 — Another example: sortByName

```js
const sortByName = () => {
  const sortedBooks = books.sort((a, b) => a.name.localeCompare(b.name));
  printBooks(sortedBooks);
};

document.querySelector('#sortByName').addEventListener('click', sortByName);
```

---

## Step 21 — Filter example

HTML:

```html
<button id="filterBtn">Filter</button>
<input id="filterMin" type="number" placeholder="min">
<input id="filterMax" type="number" placeholder="max">
```

JS:

```js
const filterByPriceRange = (min, max) => {
  if (max < min || min < 0 || max < 0) {
      alert('Invalid filter values');
      return;
  }
  const filteredBooks = books.filter(book => book.price >= min && book.price <= max);
  printBooks(filteredBooks);
};
```

```js
document.querySelector('#filterBtn').addEventListener('click', () => {
  const minPrice = +document.querySelector('#filterMin').value;
  const maxPrice = +document.querySelector('#filterMax').value;
  filterByPriceRange(minPrice, maxPrice);
});
```

---

## Step 22 — Deleting a book

```js
const printBooks = (booksArr) => {
  let html = '';
  booksArr.forEach((book, index) => {
    html += `
      <div class="bookCard">
        <h3 class="bookName">${book.name}</h3>
        <img class="bookImg" src="${book.imgUrl}" alt="Book Image">
        <p class="bookPrice">${book.price}</p>

        <button class="deleteBookBtn" onclick="deleteBook(${index})">Delete Book</button>
      </div>
    `;
  });
  document.querySelector('#booksContainer').innerHTML = html;
};
```

And the function:

```js
const deleteBook = (index) => {
  console.log(index);
  books.splice(index, 1);
  localStorage.setItem('booksData', JSON.stringify(books));
  printBooks(books);
};
```

---

## Step 23 — select, radio, checkbox (HTML)

```html
<form id="bookForm">
  <label for="colorSelect">Choose a color:</label>
  <select id="colorSelect">
    <option disabled selected>Default</option>
    <option value="yellow">Yellow</option>
    <option value="gray">Gray</option>
    <option value="blue">Blue</option>
  </select>

  <!-- radio btns -->
  <fieldset>
    <legend>Choose a size:</legend>

    <input type="radio" id="sizeSmall" class="radioSize" name="textSize" value="small">
    <label for="sizeSmall">Small</label><br>

    <input type="radio" id="sizeMedium" class="radioSize" name="textSize" value="medium">
    <label for="sizeMedium">Medium</label><br>

    <input type="radio" id="sizeLarge" class="radioSize" name="textSize" value="large">
    <label for="sizeLarge">Large</label><br>
  </fieldset>

  <!-- checkboxes -->
  <fieldset>
    <legend>Select additional features:</legend>

    <input type="checkbox" id="feature1" value="feature1">
    <label for="feature1">Feature 1</label><br>

    <input type="checkbox" id="feature2" value="feature2">
    <label for="feature2">Feature 2</label><br>

    <input type="checkbox" id="feature3" value="feature3">
    <label for="feature3">Feature 3</label><br>

    <div id="featureContainer"></div>
  </fieldset>
</form>
```

---

## Step 24 — Function for select (choose color)

```js
document.querySelector('#colorSelect').addEventListener('change', () => {
  document.body.style.backgroundColor = document.querySelector('#colorSelect').value;
});

```

---

## Step 25 — Function for radio

```js
// document.querySelectorAll('.radioSize').forEach(radio => {
//     radio.addEventListener('change',() => {
//         document.body.style.fontSize = radio.value;
//     })
// })

document.querySelectorAll('input[name="textSize"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.body.style.fontSize = radio.value;
    })

    radio.addEventListener('click', () => {
        if (radio.checked && radio.value === document.body.style.fontSize) {
            radio.checked = false;
            document.body.style.fontSize = '';  
        }
    })
})
```

---

## Step 26 — Function for checkbox

```js
const featureContainer = document.querySelector('#featureContainer');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // console.log(checkbox.id, checkbox.checked);
        featureContainer.innerHTML = '';

        checkboxes.forEach(cb => {
            if (cb.checked) {
                featureContainer.innerHTML += `<div>${cb.value}</div>`
            }
        })
    })
})
```


