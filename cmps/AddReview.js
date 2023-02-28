export default {
  props: ['book'],
  template: `
             <section class="review-container">
             <form @submit.prevent="saveReview">
              <label>
                Full name: 
                <input type="text" placeholder="name" v-model="fullName"/>
              </label>
              <label>
                Rate:
                <select v-model="rate">
                  <option v-for="n in 5" :value="n" :key="n">{{'⭐'.repeat(n)}}</option>
                
                
                </select>
              </label>
              <label>
                Read date:  
                <input  v-model="date"
                 type="date" value="2018-07-22"
                min="2018-01-01" max="2020-12-31"/>
              </label>

              <button>Save</button>
            </form>
             </section>
        `,
  data() {
    return {
      fullName: '',
      rate: null,
      date: null,
    }
  },
  methods: {
    saveReview() {
      // console.log('this.fullName', this.fullName)
      // console.log('this.rate', this.rate)
      // console.log('this.date', this.date)
      this.$emit('save-review', { fullName: this.fullName, rate: this.rate, date: this.date })
    },
  },
}
