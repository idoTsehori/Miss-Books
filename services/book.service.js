'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import BooksDB from '../assets/books.json' assert { type: 'json' }
// console.log('books:', gBooks)

const BOOK_KEY = 'booksDB'

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  AddReview,
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
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
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
  return {
    id: '',
    title: '',
    authors: ['UNKNOWN'],
    description: 'lalalalala',
    thumbnail: 'https://cdn.pixabay.com/photo/2015/08/27/10/14/icon-909830__340.png',
    listPrice: { amount: 19, currencyCode: 'USD', isOnSale: false },
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    utilService.saveToStorage(BOOK_KEY, BooksDB)
  }
}

// function _createBook(name, author) {
//   const book = getEmptyBook(name, author)
//   book.name = name
//   book.author = author
//   return book
// }

function AddReview(bookId, review) {
  get(bookId).then((book) => {
    review.id = utilService.makeId()
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    save(book)
  })
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
    book.prevBookId = books[bookIdx - 1] ? books[bookIdx - 1].id : books[books.length - 1].id
    return book
  })
}
