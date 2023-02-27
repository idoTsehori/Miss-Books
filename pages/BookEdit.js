import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>{{book.id ?'Edit The Book':'Add a New Book'}}</h2>
            <form @submit.prevent="save">
              <label>name
                <input type="text" v-model="book.title" placeholder="Book Name">
              </label>
              <label>price
                <input type="number" v-model.number="book.listPrice.amount">

              </label>
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptyBook(),
    }
  },
  created() {
    console.log('this.book', this.book)
    const { bookId } = this.$route.params
    console.log('bookId:', bookId)
    if (bookId) {
      bookService.get(bookId).then((book) => (this.book = book))
    }
  },
  methods: {
    save() {
      bookService
        .save(this.book)
        .then((savedBook) => {
          this.book = bookService.getEmptyBook()
          this.$emit('book-saved', savedBook)
          eventBusService.emit('show-msg', { txt: 'book saved', type: 'success' })
          this.$router.push('/book')
        })
        .catch((err) => {
          eventBusService.emit('show-msg', { txt: 'book save failed', type: 'error' })
        })
    },
  },
}
