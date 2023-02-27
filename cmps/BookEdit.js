import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>Add a Book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.title" placeholder="Book Name">
                <!-- <input type="number" v-model.number="car.maxSpeed"> -->
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptyBook(),
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
          // this.$router.push('/book')
        })
        .catch((err) => {
          eventBusService.emit('show-msg', { txt: 'book save failed', type: 'error' })
        })
    },
  },
}
