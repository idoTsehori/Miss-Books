import { bookService } from '../services/book.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import BookDetails from '../cmps/BookDetails.js'
import BookEdit from '../cmps/BookEdit.js'

export default {
  template: `
  <section class="book-index">
             <section class="user-changes-container">
               <BookFilter @filter="setFilterBy"/>
               <BookEdit @book-saved="onSaveBook"/>
             </section>

            <BookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <BookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/>
        </section>
    `,

  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: {},
    }
  },
  methods: {
    removeBook(bookId) {
      bookService.remove(bookId).then(() => {
        const idx = this.books.findIndex((book) => {
          return book.id === bookId
        })
        this.books.splice(idx, 1)
      })
    },
    showBookDetails(bookId) {
      this.selectedBook = this.books.find((book) => book.id === bookId)
    },
    onSaveBook(newBook) {
      console.log('newBook:', newBook)
      this.books.unshift(newBook)
    },
    setFilterBy(filterBy) {
      console.log('filterBy:', filterBy)
      this.filterBy = filterBy
    },
  },

  computed: {
    filteredBooks() {
      const regex = new RegExp(this.filterBy.name, 'i')
      return this.books.filter((book) => regex.test(book.title))
    },
  },
  created() {
    bookService.query().then((books) => (this.books = books))
  },
  components: {
    BookFilter,
    BookList,
    BookDetails,
    BookEdit,
  },
}
