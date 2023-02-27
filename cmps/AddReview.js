export default {
  props: ['book'],
  template: `
             <section class="review-container">
             <form @submit.prevent="saveReview">
              <label>
                Full name: 
                <input type="text" placeholder="name"/>
              </label>
              <label>
                Rate:
                <select name="cars" id="cars">
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </label>
              <button>Save</button>
            </form>
             </section>
        `,

  created() {
    console.log('this.book', this.book)
  },
  methods: {
    saveReview() {
      console.log('saved')
    },
  },
  //   computed: {
  //     bookPageCountMsg() {
  //       if (this.book.pageCount > 500) return 'Serious Reading'
  //       if (this.book.pageCount > 200) return 'Descent Reading'
  //       if (this.book.pageCount < 100) return 'Light Reading'
  //     },
  //     publishedDateMsg() {
  //       const currYear = new Date().getFullYear()
  //       const yearsDiff = currYear - this.book.publishedDate
  //       if (yearsDiff > 10) return 'Vintage'
  //       return 'New'
  //     },
  //   },
}
