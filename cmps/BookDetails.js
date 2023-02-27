import AddReview from '../cmps/AddReview.js'
import { bookService } from '../services/book.service.js'

export default {
  props: ['book'],
  template: `
        <section class="book-details">
            <h2>{{this.book.title}}</h2>
            <h3>{{ this.book.authors[0] }}</h3>
            <img :src=" this.book.thumbnail "/>
            <p >{{this.book.description}}</p>
            <p class="page-count-txt"> Page Count: {{bookPageCountMsg}}</p>
            <p class="date">New/Old: {{publishedDateMsg}}</p>
            <AddReview @save-review="saveReview"/>
            <button @click="closeDetails">Close</button>
        </section>
    `,

  methods: {
    closeDetails() {
      this.$emit('hide-details')
    },
    saveReview(review) {
      // Todo:
      console.log('review:', review)
      if (!this.book.review) this.book.review = [review]
      else this.book.review = review
      bookService.save(this.book).then((savedBook) => {
        console.log('savedBook', savedBook)
      })
    },
  },

  computed: {
    bookPageCountMsg() {
      if (this.book.pageCount > 500) return 'Serious Reading'
      if (this.book.pageCount > 200) return 'Descent Reading'
      if (this.book.pageCount < 100) return 'Light Reading'
    },
    publishedDateMsg() {
      const currYear = new Date().getFullYear()
      const yearsDiff = currYear - this.book.publishedDate
      if (yearsDiff > 10) return 'Vintage'
      return 'New'
    },
  },
  components: {
    AddReview,
    bookService,
  },
}
