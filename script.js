let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

// main program logic flow
addBookToLibrary({
    title:"The Country of Floptropica",
    author: "Pooja",
    noOfPages: 19,
});

// DOM manipulation below
const booksContainer = document.getElementsByClassName("books-container");

for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookNoOfPages = document.createElement("div");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = "Author: " + book.author;
    bookNoOfPages.textContent = "No of Pages: " + book.noOfPages;

    bookTitle.setAttribute("style", "border-bottom: 1px solid grey;" + "padding-bottom: 1rem;" + "font-weight: bold;");
    bookAuthor.setAttribute("style", "white-space: pre-line;" + "padding-top: 1rem;");
    bookNoOfPages.setAttribute("style", "white-space: pre-line;");

    bookCard.className = "book-card";
    bookCard.append(bookTitle, bookAuthor, bookNoOfPages);

    booksContainer[0].appendChild(bookCard);
}   
