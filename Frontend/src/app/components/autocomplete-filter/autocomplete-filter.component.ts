import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CovidData } from '../../models/data.model';
import { DataService } from 'src/app/services/data.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-autocomplete-filter',
  styleUrls: ['./autocomplete-filter.component.css'],
  template:`
  <!-- <form>
  <mat-form-field>
      <input type="text" placeholder="Choose a country" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto" id="country" required [(ngModel)]="country">
      <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
              {{option}}
          </mat-option>
      </mat-autocomplete>
  </mat-form-field>
</form> -->
`
})
export class AutocompleteFilterComponent implements OnInit {


  // constructor(private templatePasser:TemplatePasser){ }
  // @ViewChild('template') templateRef:TemplateRef
  // ngAfterViewInit(){
  //     this.templatePasser.template =template;
  //  }


  constructor(private dataService:DataService, 
    // private templatePasser: TemplatePasser
    ) { }

  countries : string[] = new Array(); // per il filtro dinamico
  myControl = new FormControl();
  sortingOptions = ["cases", "population", "recoveries", "deaths"];
  filteredOptions: Observable<string[]>;
  public covidData : CovidData []; //appoggio per il collegamento al database


  getEntries(){ //mi prendo i dati
    return this.dataService.getData().subscribe( (response : CovidData[]) => {
      this.covidData = response;
      response.forEach(item => {
        this.countries.push(item.country); //pusha nel vettore le country
        console.log(this.countries); //check
      })
    
    })
  }


  ngOnInit() {
    this.getEntries
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
}

