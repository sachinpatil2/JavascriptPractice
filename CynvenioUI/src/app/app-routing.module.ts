import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ZstackComponent } from './zstack/zstack.component';
import { DexpertComponent } from './dexpert/dexpert.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'zstack', component: ZstackComponent },
  { path: 'dexpert', component: DexpertComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
