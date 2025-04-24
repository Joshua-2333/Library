// Constructor for Book
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
}

// Function to display each book on the page
function displayBooks(books = myLibrary) {
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';
  books.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="remove-book" data-id="${book.id}">Remove</button>
      <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
    `;
    bookContainer.appendChild(bookCard);
  });
}

// Function to remove a book from the library
function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
}

// Function to toggle the read status of a book
function toggleRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.read = !book.read;
    displayBooks();
  }
}

// Event listener for the "New Book" button
document.getElementById('new-book-button').addEventListener('click', () => {
  const form = document.getElementById('new-book-form');
  form.style.display = 'block';
});

// Event listener for the form submission
document.getElementById('new-book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  document.getElementById('new-book-form').style.display = 'none';
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
});

// Event listener for the remove book buttons
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-book')) {
    const id = event.target.getAttribute('data-id');
    removeBook(id);
  } else if (event.target.classList.contains('toggle-read')) {
    const id = event.target.getAttribute('data-id');
    toggleRead(id);
  }
});

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', () => {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const books = myLibrary.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
  });
  displayBooks(books);
});

// Initialize the library with some books
let myLibrary = [
  new Book('1', 'To Kill a Mockingbird', 'Harper Lee', 281, true),
  new Book('2', '1984', 'George Orwell', 328, false),
  new Book('3', 'Pride and Prejudice', 'Jane Austen', 272, true),
  new Book('4', 'The Great Gatsby', 'F. Scott Fitzgerald', 180, false),
  new Book('5', 'The Catcher in the Rye', 'J.D. Salinger', 272, true),
];

// Display the books
displayBooks();