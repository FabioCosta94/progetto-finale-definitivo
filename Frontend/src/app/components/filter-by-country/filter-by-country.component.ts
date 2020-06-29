import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { FormControl } from '@angular/forms';
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

  

  //funzione di delay utile per dopo
//    delay(ms: number) {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// }
  //  filtroGraficoHard = this.dataService.getData().pipe((dataset) => dataset.filter((covidData) => covidData.country == "Italy"));
  //recupero tutti gli elementi di covidData dal database,filtro e tengo solo gli elementi di italy
  filtroCountry = this.dataService.getData().pipe(
    map( covidData => covidData.filter(element => element.country  == 'Italy')));

  //trasformo da elementi di tipo covidData ad elementi di tipo covidData.deaths
  morti : number[];
    filtroOsservNum = this.filtroCountry.pipe(
  (map (dataSet => dataSet.map(covidData => covidData.deaths))));

  //Assegno i valori di covidData.deaths presi dal db alla variabile 'morti'
  //filtroPerGrafico = this.filtroPerOsservabileNumeri.subscribe ((morti) => this.morti = morti);
  filtroPerGraficoMorti = this.filtroOsservNum.subscribe(morti2 => {
    this.morti = morti2;
    console.log(this.morti);
    // this.updGraph();
});

//trasformo da elementi di tipo covidData ad elementi di tipo covidData.date
filtroOsservDate = this.filtroCountry.pipe(
  (map ((dataSet) => dataSet.map((covidData) => covidData.date))));

  dates : String[];

  datesNumbers : number[] = [];
//Assegno i valori di covidData.dates presi dal db alla variabile 'date', convertite in stringhe
  filtroPerGraficoDate = this.filtroOsservDate.subscribe(dates => {
    //console.log(dates);
    this.dates = dates.map((date) => date.toString());
    
    this.dates.forEach(date => {
      let filtroNoTrattino : String[] = date.split("-");
      let filtroUnito : string = filtroNoTrattino.join("");
      let dataInNumero = parseInt(filtroUnito);
      this.datesNumbers.push(dataInNumero);
      console.log(this.datesNumbers);
    });
    
    // this.updGraph();
  });

  
  //tentativi patetici di far funzionare il grafico aspettando il caricamento dei dati
  // a = waits(2000);
  // setTimeout(() => {
  //   console.log('aaa');
  // }, 2000)
  // await()
  //delay()


  chart : Chart;

  arrayAppoggio : number[] = [5, 10, 15, 20]


  //Questo è una sorta di puntatore all'elemento html
  @ViewChild('chartwrapper') chartWrapper:ElementRef;

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
     for (let i = 0; i < this.morti.length; i++) {
      this.removeData(this.chart);
     }

    for (let i = 0; i < this.morti.length; i++) {
      this.addData(this.chart, this.dates[i], this.morti[i])
    }
   
  //  console.log(this.morti)
  //  console.log(this.datesNumbers)
  }
   



  // prova : number[];
  // prova2 = this.morti.forEach(x => console.log(x))
  
  //per il grafico
  // lineChartData: ChartDataSets[] = [
  //   //Qui ci vanno tutti i dati di una categoria specifica, ordinati per data giornaliera, 
  //   //di una specifica country, ma i dati arrivano già in ordine di data quindi ok
  //   // {data: this.dataService.getData().deathRate}
  //   // {data: this.getEntries.deathRate}
  //   //{data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 100],
  //   //ronaldinhosoccer = wait(50);

    
    
  //   {data: //[5, 250, 50, 100],
  //     this.morti,
  //     //this.prova,
  //     label: 'Casi coronavirus'},
      
  // ];

  // //Le lables verranno probabilmente cancellate, oppure no. All'inizio era Label[].
  // lineChartLabels: String[] = 
  // //['Gennaio','Febbraio','Marzo','Aprile'];
  // this.dates;

  // lineChartOptions = {
  //   responsive: true,
  //   elements: {
  //     line: {
  //         tension: 0 // disables bezier curves
  //     }
  // },
  //   scales: {
  //     yAxes: [
  //       {
  //         display: true,
  //         ticks: {
  //           suggestedMin: 0,

  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  
  // lineTension: 0;
  
  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

//Le funzioni di grafico finiscono qui ---------------------------------------------
 
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