import HomePage from './pages/HomePage.js'
import AboutUs from './pages/AboutUs.js'
import BookIndex from './pages/BookIndex.js'

// import BookDetails from './pages/BookDetails.js'
// import CarEdit from './pages/CarEdit.js'

// import BookIndex from './pages/BookIndex.js'
// import HomePage from './pages/HomePage.js'
// import AboutUs from './pages/AboutUs.js'

const { createRouter, createWebHashHistory } = VueRouter

const options = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
      //   children: [
      //     {
      //       path: 'team',
      //       component: AboutTeam,
      //     },
      //     {
      //       path: 'services',
      //       component: AboutServices,
      //     },
      //   ],
    },
    {
      path: '/book',
      component: BookIndex,
    },
    // {
    //   path: '/car/:carId',
    //   component: BookDetails,
    // },
    // {
    //   path: '/car/edit/:carId?',
    //   component: CarEdit,
    // },
    // Last fallback if no route was matched:
    // {
    //   path: '/:catchAll(.*)',
    //   component: AboutPage,
    // },
  ],
}
export const router = createRouter(options)
