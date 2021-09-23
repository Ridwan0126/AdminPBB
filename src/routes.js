/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  Dashboard,
  EditFitur,
  ListFitur,
  TambahFitur,
  ListPbb,
  TambahPbb,
  EditPbb,
  ListPembayaran,
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/fitur",
    name: "Master Fitur",
    icon: "nc-icon nc-world-2",
    component: ListFitur,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/fitur/tambah",
    name: "Tambah Fitur",
    component: TambahFitur,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/fitur/edit/:id",
    name: "Edit Fitur",
    component: EditFitur,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pbb",
    name: "Master Pbb",
    icon: "nc-icon nc-cart-simple",
    component: ListPbb,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/pbb/tambah",
    name: "Tambah Pbb",
    component: TambahPbb,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pbb/edit/:id",
    name: "Edit Pbb",
    component: EditPbb,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pembayaran",
    name: "Master Pembayaran",
    icon: "nc-icon nc-cart-simple",
    component: ListPembayaran,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
