import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { loginUserGuard } from './Gards/login-user-guard';
import { Signup } from './components/signup/signup';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/login/login';
import { AddUnitComponent } from './components/add-product/add-product';
import { UnitsComponent } from './components/product-cards/product-cards';
import { UsersComponent } from './components/users/users';
import { AddUserComponent } from './components/adduser/adduser';
import { EditUserComponent } from './components/updateuser/updateuser';
import { UnitDetailsComponent } from './components/details/details';
import { ListingsComponent } from './components/listings/listings';
import { AddListingComponent } from './components/listings-form/listings-form';
import { UpdateListingComponent } from './components/listings-update/listings-update';
import { BookingsComponent } from './components/bookings/bookings';





export const routes: Routes = [{

  
    path: '',
    component: Main,
    children: [

      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home, title: 'Home_page' },
      { path: 'users', component: UsersComponent, title: 'users',canActivate:[loginUserGuard]},
      { path: 'users/add', component: AddUserComponent, title: 'add-users',canActivate:[loginUserGuard]},
      { path: 'users/update/:id', component: EditUserComponent, title: 'edit-users',canActivate:[loginUserGuard]},
      { path: 'Add-unit', component: AddUnitComponent, title: 'add-unit',canActivate:[loginUserGuard]},
      { path: 'units', component: UnitsComponent,title:'units', },
      {path: 'units/:id',component: UnitDetailsComponent,title:'unit details'},
      { path: 'listings', component: ListingsComponent },
      { path: 'listings/add', component: AddListingComponent  },
      {path: 'listings/update/:id',component: UpdateListingComponent},
       { path: 'bookings', component: BookingsComponent },
      
    ]
  },
  { path: 'login', component: Login, title: 'login',canActivate:[loginUserGuard] },
  { path: 'signUp', component: Signup, title: 'signUp',canActivate:[loginUserGuard] },
  { path: '**', component: Notfound, title: 'Not_Found' },
];



































 
