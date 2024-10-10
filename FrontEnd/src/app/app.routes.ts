import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'menu/:category', component: MenuComponent },
  { path: 'edit/:id', component: EditComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'Menu',
    component: MenuComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminAddProductComponent,
  },
];
