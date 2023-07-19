let myLibrary = []

class Book {
  constructor (title, author, noOfPages) {
    this.title = title
    this.author = author
    this.noOfPages = noOfPages
    this.isRead = false
  }

  static addBookToLibrary (...books) {
    for (const book of books) {
      myLibrary.push(book)
    }
  }
}

// main program logic flow
Book.addBookToLibrary(
  new Book('The Country of Floptropica 1', 'Pooja', 19),
  new Book('The Country of Floptropica 2', 'Pooja', 19),
  new Book('The Country of Floptropica 3', 'Pooja', 19)
)

// DOM manipulation below
const booksContainer = document.getElementsByClassName('books-container')

function drawBooks (books) {
  for (const book of books) {
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
        'font-weight: bold;' +
        'height: 6vh;' +
        'overflow: hidden;'
    )

    // solution to add new line via textContent obtained from
    // https://stackoverflow.com/questions/9980416/how-can-i-insert-new-line-carriage-returns-into-an-element-textcontent
    // bookAuthor.setAttribute(
    //   'style',
    //   'white-space: pre-line;'
    // bookNoOfPages.setAttribute('style', 'white-space: pre-line;')

    bookAuthor.setAttribute(
      'style',
      'padding-top: 0.5rem; height:2rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;'
    )

    const removeBookBtn = document.createElement('button')
    removeBookBtn.innerHTML = 'Remove book'
    removeBookBtn.addEventListener('click', () => {
      const bookIndex = myLibrary.indexOf(book)
      myLibrary.splice(bookIndex, 1)
      booksContainer[0].removeChild(bookCard)
    })

    const markAsReadBtn = document.createElement('button')
    markAsReadBtn.innerHTML = !book.isRead
      ? 'Mark as Read'
      : 'Read <i class="fa fa-check"></i>'
    markAsReadBtn.addEventListener('click', () => {
      book.isRead = !book.isRead
      if (book.isRead) {
        markAsReadBtn.innerHTML = 'Read <i class="fa fa-check"></i>'
        markAsReadBtn.classList.add('read')
      } else {
        markAsReadBtn.innerHTML = 'Mark as Read'
        markAsReadBtn.classList.remove('read')
      }
    })

    bookCard.className = 'book-card'
    bookCard.append(
      bookTitle,
      bookAuthor,
      bookNoOfPages,
      removeBookBtn,
      markAsReadBtn
    )

    booksContainer[0].appendChild(bookCard)
  }
}

const newBookForm = document.querySelector('#new-book-form')
newBookForm.addEventListener('submit', event => {
  event.preventDefault()

  let title = document.getElementsByName('title')[0].value
  let author = document.getElementsByName('author')[0].value
  let noOfPages = document.getElementsByName('noOfPages')[0].value

  const newBook = new Book(title, author, noOfPages)
  myLibrary.push(newBook)
  drawBooks([newBook])
  newBookForm.classList.add('hidden')
  newBookForm.reset()
})

const addBookBtn = document.querySelector('.add-book-button')
addBookBtn.addEventListener('click', e =>
  newBookForm.classList.remove('hidden')
)

const closeFormBtn = document.querySelector('.form-close-btn')
closeFormBtn.addEventListener('click', () =>
  newBookForm.classList.add('hidden')
)

// if this button (which is also on the form) is set as submit (the default),
// when user presses Enter on invalid form inputs, the form will try to validate prematurely
// -> solves invalid form control is not focusable issue
// https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable
closeFormBtn.type = 'button'

drawBooks(myLibrary)
