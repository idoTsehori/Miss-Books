import BookPreview from './BookPreview.js'

export default {
  props: ['books'],
  template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>

                    <section class="book-btns">
                      <button @click="showDetails(book.id)">Details</button>
                      <button @click="remove(book.id)">x</button>
                      <RouterLink :to="'/book/edit/'+book.id">Edit</RouterLink> 
                     </section>
                </li>
            </ul>
        </section>
    `,
  methods: {
    remove(bookId) {
      this.$emit('remove', bookId)
    },
    showDetails(bookId) {
      console.log('bookId', bookId)
      this.$emit('show-details', bookId)
    },
  },
  components: {
    BookPreview,
  },
}
