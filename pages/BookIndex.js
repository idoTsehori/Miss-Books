import { bookService } from '../services/book.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import BookDetails from '../cmps/BookDetails.js'
// import BookEdit from './BookEdit.js'

import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
  <section class="book-index">
             <section  class="user-changes-container">
              <button class="add-book-btn"
              > <RouterLink :to="'/book/edit/'">Add a NewBook</RouterLink> 
            </button>
               <BookFilter @filter="setFilterBy"/>
             </section>

            <BookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
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
      bookService
        .remove(bookId)
        .then(() => {
          const idx = this.books.findIndex((book) => {
            return book.id === bookId
          })
          this.books.splice(idx, 1)
          eventBusService.emit('show-msg', { txt: 'Book is removed', type: 'success' })
        })
        .catch((err) => {
          eventBusService.emit('show-msg', { txt: 'Book is failed', type: 'error' })
        })
    },
    showBookDetails(bookId) {
      this.$router.push('/book/' + bookId)
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
  },
}
