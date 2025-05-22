import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { CategoryComponent } from './pages/category/category.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'content/:id',
    component: ContentComponent
  },
  {
    path: 'category/:category',
    component: CategoryComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];
