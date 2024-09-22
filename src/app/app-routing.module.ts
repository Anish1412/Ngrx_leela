import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './Guard/auth-guard.guard';
import { ResolverService } from './services/resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then( m => m.CounterModule),
    pathMatch:'full'
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path:'posts/details/:id',
    component: SinglePostComponent
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    pathMatch:'full'
  },
  {
    path:'pageNotFound',
    component:PageNotFoundComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo: 'pageNotFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
