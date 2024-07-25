// Array to store books
let library = [];

// Function to add a book
function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const genre = document.getElementById('genre').value;

    // Validate input
    if (title.trim() === '' || author.trim() === '' || isNaN(pages) || genre.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Add book to library
    const newBook = { title, author, pages, genre };
    library.push(newBook);

    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('genre').value = '';

    // Display updated book list
    displayBooks(library);
}

// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p>No books in the library.</p>';
        return;
    }

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to search books by title
function searchBooks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = library.filter(book => book.title.toLowerCase().includes(searchInput));
    
    displayBooks(filteredBooks);

    // Display message if no results found
    const noResultsMessage = document.getElementById('no-results-message');
    if (filteredBooks.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

// Event listeners
document.getElementById('add-book-form').addEventListener('submit', addBook);
document.getElementById('search-input').addEventListener('input', searchBooks);

// Initial display of books (empty library)
displayBooks(library);
