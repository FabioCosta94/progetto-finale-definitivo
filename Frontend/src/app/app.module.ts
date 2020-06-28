import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { TestApiComponent } from './routes/test-api/test-api.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';


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
    CountryPipe,
    WelcomeComponent,
    ContinentclassificationPipe,
    SortComponent,
    FilterByComponent,
    FilterByTwoComponent,
    FilterByCountryComponent,
    TestApiComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
