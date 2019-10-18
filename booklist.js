//Book class for initialisng

class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class

class UI {
    static displayBooks() {
       
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBooks(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    //To reset values to empty before adding new books
    
    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {

    // For getting books from local storage
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
    return books;
    } 

    //for adding book to the local storage
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    //from removing books from local storage
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        })

        localStorage.setItem('books',JSON.stringify(books));
    }
}


// Event : display books

document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event : get books

document.querySelector('#book-form').addEventListener('submit',(e) => {

    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);
    console.log(book);

    UI.addBookToList(book);      //adding book to UI

    Store.addBook(book);    // adding book to local storage

    UI.clearFields();

    
})

//Event : to remove book

document.querySelector('#book-list').addEventListener('click',(e) => {
    UI.deleteBooks(e.target); // deleting book from UI

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        
})