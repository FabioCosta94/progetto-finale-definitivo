import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getLocaleDateFormat } from '@angular/common';
import { filter } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import {ElementRef, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { title } from 'process';

 
@Component({
  selector: 'app-filter-by-country',
  templateUrl: './filter-by-country.component.html',
  styleUrls: ['./filter-by-country.component.css']
})

export class FilterByCountryComponent implements OnInit {

  constructor(private dataService:DataService) { }

  //variabile in cui si memorizzano le morti
  morti : number[];
  //variabile in sui si memorizzano delle date sottoforma di stringhe
  dates : String[]; 

  //variabile in sui si memorizzano delle date sottoforma di numeri
  // datesNumbers : number[] = [];

  chart : Chart;

  arrayAppoggio : number[] = [5, 10, 15, 20]

  myControl = new FormControl(); //per far funzionare il filtro
  countries : string[] = new Array(); // per il filtro dinamico
  filteredOptions: Observable<string[]>; //per il filtro
  public covidData : CovidData []; //appoggio per il collegamento al database
 
 
  public country:string; //per memorizzare la stringa dell’input
  
  //Base per costruire il sistema di filtraggio per categoria
  sortingOptions = ["cases", "population", "recoveries", "deaths"];

  public sortOption:string; //variabile per la scelta

  // funzioneProva() {
  //   switch (this.sortOption) {
  //     case 'cases': {
  //       let filtroCat = this.dataService.getData().pipe(
  //         map( covidData => covidData.filter(element => element.cases)));
  //       break;
  //     }
  //     case 'population': {
  //       let filtroCat = this.dataService.getData().pipe(
  //         map( covidData => covidData.filter(element => element.population)));
  //       break;
  //     }
  //     case 'recoveries': {
  //       let filtroCat = this.dataService.getData().pipe(
  //         map( covidData => covidData.filter(element => element.recoveries)));
  //       break;
  //     }
  //     case 'deaths': {
  //       let filtroCat = this.dataService.getData().pipe(
  //         map( covidData => covidData.filter(element => element.deaths)));
  //       break;
  //     }
  //     default: {
  //       console.log('ERRORE')
  //       break;
  //     }
      
  //   }
  // }
  
  


  // filtroCat = this.dataService.getData().pipe(
  // map( covidData => covidData.filter(element => element.country  == this.country)));
  
  
  //showSortResult = false; 
  // sortBy(form : NgForm){
  //   this.sortOption = form.form.value.sort;
    
  //   //scrivere ['deaths'] o .deaths è la stessa cosa in js
  //   this.covidData = this.covidData.sort((a, b) => 
  //     a[this.sortOption]-b[this.sortOption]);
  //   /*Si può anche scrivere come: 
  //     this.covidData = this.covidData.sort(function(a, b) { 
  //       return a[this.sortOption] - b[this.sortOption]; 
  //   })*/
  //   //in questo modo mostra i risultati solo quando ho premuto il pulsante
  //   this.showSortResult=true; 
  //   console.log("ordered: ", this.covidData)

  // }

  //il filtraggio per categoria termina QUI -------------------------------------

  //funzione di delay utile per dopo
//    delay(ms: number) {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// }
  //  filtroGraficoHard = this.dataService.getData().pipe((dataset) => dataset.filter((covidData) => covidData.country == "Italy"));
  //recupero tutti gli elementi di covidData dal database,filtro e tengo solo gli elementi di italy
  



  //  QUESTO PEZZO ERA TUTTO DENTRO filtroPerGraficoDate
    //   this.dates.forEach(date => {
    //   let filtroNoTrattino : String[] = date.split("-");
    //   let filtroUnito : string = filtroNoTrattino.join("");
    //   let dataInNumero = parseInt(filtroUnito);
    //   this.datesNumbers.push(dataInNumero);
    //   console.log(this.datesNumbers);
    // });
  
  //tentativi patetici di far funzionare il grafico aspettando il caricamento dei dati
  // a = waits(2000);
  // setTimeout(() => {
  //   console.log('aaa');
  // }, 2000)
  // await()
  //delay()


  


  //Questo è una sorta di puntatore all'elemento html, ma alla fine non lo sto usando
  //@ViewChild('chartwrapper') chartWrapper:ElementRef;

   createGraph() {
     let prova: any = document.getElementById('chartwrapper');
     //var canvas : any = document.getElementById("mycanvas");
    let ctx = prova.getContext("2d");
     this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['5', '10', '15', '20'],
        datasets: [{
          lineTension: 0,
            label: '',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: 'rgba(27, 81, 120, 1)',
            data: this.arrayAppoggio,
            backgroundColor: [
              'rgba(255, 99, 132, 0)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 5
          }]
        },
        options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0,

                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Filter by Country'
        }
      }
       

    })
    // for (let i = 0; i < this.morti.length; i++) {
    //   this.morti.pop();
    //   this.datesNumbers.pop();
    // }

   };

   addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
  }
  
  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

   updGraph() {
    let filtroCountry = this.dataService.getData().pipe(
      map( covidData => covidData.filter(element => element.country  == this.country)));
  
    //trasformo da elementi di tipo covidData ad elementi di tipo covidData.deaths
    
      let filtroOsservNum = filtroCountry.pipe(
    (map (dataSet => dataSet.map(covidData => covidData.deaths))));
  
    //Assegno i valori di covidData.deaths presi dal db alla variabile 'morti'
    //filtroPerGrafico = this.filtroPerOsservabileNumeri.subscribe ((morti) => this.morti = morti);
    let filtroPerGraficoMorti = filtroOsservNum.subscribe(morti2 => {
      this.morti = morti2;
      console.log(this.morti);
      // this.updGraph();
  });
  
  //trasformo da elementi di tipo covidData ad elementi di tipo covidData.date
  let filtroOsservDate = filtroCountry.pipe(
    (map ((dataSet) => dataSet.map((covidData) => covidData.date))));
  
    
  //Assegno i valori di covidData.dates presi dal db alla variabile 'date', convertite in stringhe
    let filtroPerGraficoDate = filtroOsservDate.subscribe(dates => {
      //console.log(dates);
      this.dates = dates.map((date) => date.toString());
      
      // this.updGraph();
    });

     for (let i = 0; i < this.morti.length; i++) {
      this.removeData(this.chart);
     }

    for (let i = 0; i < this.morti.length; i++) {
      this.addData(this.chart, this.dates[i], this.morti[i])
    }
   
  //  console.log(this.morti)
  //  console.log(this.datesNumbers)
  }
   

//Le funzioni di grafico finiscono qui ---------------------------------------------
 
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
    this.createGraph();
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
// document.getElementById("download").addEventListener('click', function(){
//   /*Get image of canvas element*/
//   var url_base64jp = document.getElementById("lineChart").toDataURL("image/jpg");
//   /*get download button (tag: <a></a>) */
//   var a =  document.getElementById("download");
//   /*insert chart image url to download button (tag: <a></a>) */
//   a.href = url_base64jp;
// });