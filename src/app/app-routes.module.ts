import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

const routes: Routes = [
  { path: 'load', component: LoadComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'photos' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }







