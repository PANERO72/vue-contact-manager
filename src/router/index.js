import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import ContactManager from '../views/ContactManager.vue';
import AddContact from '../views/AddContact.vue';
import EditContact from '../views/EditContact.vue';
import PageNotFound from '../views/PageNotFound.vue';
import ViewContact from '../views/ViewContact.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   redirect: '/contacts',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'contacts',
    component: ContactManager 
  },
  {
    path: '/contacts/add',
    name: 'coontacts-add',
    component: AddContact 
  },
  {
    path: '/contacts/edit/:contactId',
    name: 'contacts-edit',
    component: EditContact 
  },
  {
    path: '/contacts/view/:contactId',
    name: 'contacts-view',
    component: ViewContact 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-no-found',
    component: PageNotFound
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
});

export default router;