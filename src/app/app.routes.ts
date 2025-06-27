import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Productparent } from './components/productparent/productparent';
import { Details } from './components/details/details';
import { AddProduct } from './components/add-product/add-product';
import { loginUserGuard } from './Gards/login-user-guard';
import { Signup } from './components/signup/signup';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/login/login';





export const routes: Routes = [{

  
    path: '',
    component: Main,
    children: [

      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home, title: 'Home_page' },
      { path: 'parent', component: Productparent, title: 'product_parent',canActivate:[loginUserGuard]},
      { path: 'parent/:idFromDB', component: Details, title: 'Product_Details'},
      { path: 'Add-Product', component: AddProduct, title: 'add-product',canActivate:[loginUserGuard]},
    ]
  },
  { path: 'login', component: Login, title: 'login',canActivate:[loginUserGuard] },
  { path: 'signUp', component: Signup, title: 'signUp',canActivate:[loginUserGuard] },
  { path: '**', component: Notfound, title: 'Not_Found' },
];



































 
