import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guards';
import { HomeComponent } from './home/components/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'login', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path:'features', 
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path:'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'notes', canActivate:[AuthGuard],
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  },

  {
    path: 'note-trash', canActivate:[AuthGuard],
    loadChildren: () => import('./note-trash/note-trash.module').then(m => m.NoteTrashModule)
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  } ,
  {
    path:'**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
