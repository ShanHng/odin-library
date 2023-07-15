let myLibrary = []

function Book (title, author, noOfPages) {
  // the constructor...
  this.title = title
  this.author = author
  this.noOfPages = noOfPages
  this.isRead = false
}

function addBookToLibrary (...books) {
  // do stuff here
  for (const book of books) {
    myLibrary.push(book)
  }
}

// main program logic flow
addBookToLibrary(
  new Book('The Country of Floptropica 1', 'Pooja', 19),
  new Book('The Country of Floptropica 2', 'Pooja', 19),
  new Book('The Country of Floptropica 3', 'Pooja', 19)
)

// DOM manipulation below
const booksContainer = document.getElementsByClassName('books-container')

for (const book of myLibrary) {
  const bookCard = document.createElement('div')
  const bookTitle = document.createElement('div')
  const bookAuthor = document.createElement('div')
  const bookNoOfPages = document.createElement('div')

  bookTitle.textContent = book.title
  bookAuthor.textContent = 'Author: ' + book.author
  bookNoOfPages.textContent = 'No of Pages: ' + book.noOfPages

  bookCard.style.cssText = ' display: grid; gap:'

  bookTitle.setAttribute(
    'style',
    'border-bottom: 1px solid grey;' +
      'padding-bottom: 1rem;' +
      'font-weight: bold;'
  )

  // solution to add new line via textContent obtained from
  // https://stackoverflow.com/questions/9980416/how-can-i-insert-new-line-carriage-returns-into-an-element-textcontent
  // bookAuthor.setAttribute(
  //   'style',
  //   'white-space: pre-line;'
  // bookNoOfPages.setAttribute('style', 'white-space: pre-line;')

  bookAuthor.setAttribute('style', 'padding-top: 1rem;')

  const removeBookBtn = document.createElement('button')
  removeBookBtn.innerHTML = 'Remove book'
  removeBookBtn.addEventListener('click', () => {
    const bookIndex = myLibrary.indexOf(book)
    myLibrary.splice(bookIndex, 1)
    booksContainer[0].removeChild(bookCard)
  })

  const markAsReadBtn = document.createElement('button');
  markAsReadBtn.innerHTML = !book.isRead ? 'Mark as Read' : 'Read <i class="fa fa-check"></i>'
  markAsReadBtn.addEventListener('click', () => {
    book.isRead = !book.isRead;
    if (book.isRead) {
      markAsReadBtn.innerHTML = 'Read <i class="fa fa-check"></i>';
      markAsReadBtn.classList.add("read");
    } else {
      markAsReadBtn.innerHTML = 'Mark as Read'
      markAsReadBtn.classList.remove("read");
    }
  })

  bookCard.className = 'book-card'
  bookCard.append(bookTitle, bookAuthor, bookNoOfPages, removeBookBtn, markAsReadBtn)

  booksContainer[0].appendChild(bookCard)
}

const newBookForm = document.querySelector('#new-book-form')
newBookForm.addEventListener('submit', event => event.preventDefault())

const addBookBtn = document.querySelector('.add-book-button')
addBookBtn.addEventListener('click', e =>
  newBookForm.classList.remove('hidden')
)

const closeFormBtn = document.querySelector('.form-close-btn')
closeFormBtn.addEventListener('click', () =>
  newBookForm.classList.add('hidden')
)
