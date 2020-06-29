import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getLocaleDateFormat } from '@angular/common';
import { filter } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

 
@Component({
  selector: 'app-filter-by-country',
  templateUrl: './filter-by-country.component.html',
  styleUrls: ['./filter-by-country.component.css']
})
export class FilterByCountryComponent implements OnInit {
 
  constructor(private dataService:DataService) { }

  //funzione di delay utile per dopo
//    delay(ms: number) {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// }

  //  filtroGraficoHard = this.dataService.getData().pipe((dataset) => dataset.filter((covidData) => covidData.country == "Italy"));
  //recupero tutti gli elementi di covidData dal database,filtro e tengo solo gli elementi di italy
  filtroByCountry = this.dataService.getData().pipe(
    map( covidData => covidData.filter(element => element.country  == 'Italy')));
  //trasformo tutti gli elementi di covidData in numero
  morti : number[];

    filtroPerOsservabileNumeri = this.filtroByCountry.pipe(
  (map (dataSet => dataSet.map(covidData => covidData.deaths))));

  //filtroPerGrafico = this.filtroPerOsservabileNumeri.subscribe ((morti) => this.morti = morti);
  filtroPerGraficoMorti = this.filtroPerOsservabileNumeri.subscribe(morti2 => {
    this.morti = morti2;
    console.log(this.morti);
});

filtroPerOsservabileDate = this.filtroByCountry.pipe(
  (map ((dataSet) => dataSet.map((covidData) => covidData.date))));

  dates : String[];

  filtroPerGraficoDate = this.filtroPerOsservabileDate.subscribe(dates => {
    console.log(dates);
    this.dates = dates.map((date) => date.toString());
  });


  // aaa = delay(2000);

  // prova : number[];
  // prova2 = this.morti.forEach(x => console.log(x))
  
  //per il grafico
  lineChartData: ChartDataSets[] = [
    //Qui ci vanno tutti i dati di una categoria specifica, ordinati per data giornaliera, 
    //di una specifica country, ma i dati arrivano già in ordine di data quindi ok
    // {data: this.dataService.getData().deathRate}
    // {data: this.getEntries.deathRate}
    //{data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 100],
    //ronaldinhosoccer = wait(50);

    {data: //[5, 10, 15, 20],
      this.morti,
      //this.prova,
      label: 'Casi coronavirus'},
  ];

  //Le lables verranno probabilmente cancellate, oppure no. All'inizio era Label[].
  lineChartLabels: String[] = 
  //['Gennaio','Febbraio','Marzo','Aprile'];
  this.dates;

  lineChartOptions = {
    responsive: true,
  };

  
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
 
  myControl = new FormControl(); //per far funzionare il filtro
  countries : string[] = new Array(); // per il filtro dinamico
  filteredOptions: Observable<string[]>; //per il filtro
  public covidData : CovidData []; //appoggio per il collegamento al database
 
 
  public country:string; //per memorizzare la stringa dell’input
 
 
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
    this.getEntries() //prende i dati
    this.filteredOptions = this.myControl.valueChanges
      .pipe(  //filtro dimanico
        startWith(''),
        map(value => this._filter(value))
      );
  }
 
  //funzione per il filtro dinamico
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
 
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
 
 
 
}