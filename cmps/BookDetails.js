import AddReview from '../cmps/AddReview.js'
import { bookService } from '../services/book.service.js'

export default {
  // props: ['book'],
  template: `
        <section class="book-details" v-if="book">
            <h2>{{book.title}}</h2>
            <h3>{{ book.authors[0] }}</h3>
            <img :src=" book.thumbnail "/>
            <p >{{book.description}}</p>
            <p class="page-count-txt"> Page Count: {{bookPageCountMsg}}</p>
            <p class="date">New/Old: {{publishedDateMsg}}</p>
            <AddReview  @save-review="saveReview"/>
            <!-- <RouterLink :to="'/book/' + book.prevBookId">Prev</RouterLink> -->
            <ul class="reviews-container" v-if="book.reviews.length">
              <li v-for="review in book.reviews" :key="review.id">
                <h5>Name: {{review.fullName}}</h5>
                <h5>Rate: {{changerateValToStars(review.id)}}</h5>
                <h5>Date: {{review.date}}</h5>
                <button @click="removeReview(review.id)" class="delete-btn">X</button>
              </li>
            </ul>

            <button @click="closeDetails">Close</button>
        </section>
    `,

  data() {
    return {
      // reviews: [],
      book: null,
    }
  },
  created() {
    this.loadBook()
  },
  watch: {
    bookId() {
      this.loadBook()
    },
  },
  methods: {
    loadBook() {
      bookService.get(this.bookId).then((book) => {
        this.book = book
        this.book.reviews = this.book.reviews || []
      })
    },
    closeDetails() {
      this.$emit('hide-details')
      this.$router.push(`/book`)
    },
    saveReview(review) {
      bookService.AddReview(this.book.id, review)
      this.book.reviews.push(review)
    },
    removeReview(reviewId) {
      console.log('reviewId:', reviewId)
    },
    changerateValToStars(reviewId) {
      const review = this.book.reviews.find((review) => review.id === reviewId)
      console.log('rev', review)
      return '⭐'.repeat(review.rate)
    },
  },

  computed: {
    bookId() {
      return this.$route.params.bookId
    },

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
