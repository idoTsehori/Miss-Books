const { createApp } = Vue

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'

import BookIndex from './cmps/BookIndex.js'

import HomePage from './pages/HomePage.js'
import AboutUs from './pages/AboutUs.js'

const options = {
  template: `
        <section class="container">
            <AppHeader @setRoute="route = $event"/>
            <main class="router-view">
                <HomePage v-if="route === 'HomePage'"/>
                <BookIndex v-if="route === 'BookIndex'"/>
                <AboutUs v-if="route === 'AboutUs'"/>
            </main>
            <AppFooter />
        </section>
    `,
  data() {
    return {
      route: 'HomePage',
    }
  },
  components: {
    AppHeader,
    AppFooter,
    BookIndex,
    HomePage,
    AboutUs,
  },
}
const app = createApp(options)
app.mount('#app')
