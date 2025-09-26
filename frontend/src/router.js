import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import AdminProducts from "./views/AdminProducts.vue";
import AdminUsers from "./views/AdminUsers.vue";
import Catalog from "./views/Catalog.vue";

const routes = [
  { path: "/", component: Catalog },
  { path: "/login", component: Login },
  { path: "/admin", component: AdminDashboard,
    children: [
      { path: "", component: AdminProducts },
      { path: "users", component: AdminUsers },
      { path: "products", component: AdminProducts },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
