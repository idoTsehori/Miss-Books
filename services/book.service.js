'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import gBooks from '../assets/books.json' assert { type: 'json' }
console.log('books:', gBooks)

const BOOK_KEY = 'booksDB'

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
}

// function query(filterBy = {}) {
function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    // if (filterBy.txt) {
    //   const regex = new RegExp(filterBy.txt, 'i')
    //   books = books.filter((book) => regex.test(book.name))
    // }
    // if (filterBy.minSpeed) {
    //   cars = cars.filter((car) => car.maxSpeed >= filterBy.minSpeed)
    // }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

// function getEmptyCar(vendor = '', maxSpeed = 0) {
function getEmptyBook() {
  return { id: '', name: '', author: '' }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    // books = []
    // books.push(_createBook('hey', 'haim'))
    // books.push(_createBook('lal', 'haim'))
    // books.push(_createBook('shu', 'haim'))
    // books.push(_createBook('dudu', 'haim'))
    utilService.saveToStorage(BOOK_KEY, gBooks)
  }
}

// function _createBook(name, author) {
//   const book = getEmptyBook(name, author)
//   book.id = utilService.makeId()
//   book.name = name
//   book.author = author
//   return book
// }
