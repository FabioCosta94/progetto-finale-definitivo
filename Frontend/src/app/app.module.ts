import { GraficoGiornoComponent } from './graficoGiorno/graficoGiorno.component';
import { UsersService } from './services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SortFieldPipe } from './pipes/sortField.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './routes/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpperCasePipe } from './pipes/upper-case.pipe';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CountryPipe } from './pipes/country.pipe';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { FilterByTwoComponent } from './components/filter-by-two/filter-by-two.component';
import { ContinentclassificationPipe } from './pipes/continentclassification.pipe';
import { SortComponent } from './routes/sort/sort.component';
import { FilterByComponent } from './routes/filter-by/filter-by.component';
import { FilterByCountryComponent } from './components/filter-by-country/filter-by-country.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { CommonModule } from '@angular/common';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import{NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    UpperCasePipe,
    LoadingScreenComponent,
    SortFieldPipe,
    CountryPipe,
    WelcomeComponent,
    ContinentclassificationPipe,
    SortComponent,
    FilterByComponent,
    FilterByTwoComponent,
    FilterByCountryComponent,
    LineChartComponent,
    LoginComponent, 
    RegisterComponent,
    GraficoGiornoComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxScrollTopModule,
    NgxPaginationModule
    
  ],
  providers: [DataService,UsersService,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
