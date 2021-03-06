import { GraficoGiornoComponent } from './graficoGiorno/graficoGiorno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { SortComponent } from './routes/sort/sort.component';
import { FilterByComponent } from './routes/filter-by/filter-by.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';


const routes: Routes = [
  { path: "", redirectTo : '/welcome', pathMatch: 'full' },
  {path: "welcome", component: WelcomeComponent},
  { path: "dashboard", component : DashboardComponent },
  { path: "add", component : AddComponent },
  { path: "details/:id", component : DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "filterBy", component: FilterByComponent},
  { path: "sort", component: SortComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'graficoGiorno', component: GraficoGiornoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
