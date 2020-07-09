import { Component, OnInit, OnChanges } from '@angular/core';
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
import { title, config } from 'process';
import { saveAs } from 'file-saver';
import { DataService } from '../services/data.service';
import { CovidData } from '../models/data.model';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-graficoGiorno',
  templateUrl: './graficoGiorno.component.html',
  styleUrls: ['./graficoGiorno.component.css']
})
export class GraficoGiornoComponent implements OnInit {

  constructor(private dataService:DataService,public login: LoginService) { }

  createGraph() {
    let prova: any = document.getElementById('chartwrapper');
     //var canvas : any = document.getElementById("mycanvas");
    let ctx = prova.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cases/P', 'Deaths/P', 'Recoveries/P'],
        datasets: [{
          lineTension: 0,
            label: '',
            borderColor: 'rgba(235, 136, 54, 0.952)',
            pointBorderColor: 'rgba(27, 81, 120, 1)',
            //data: [5, 10, 15, 20, 25, 30],
            data: [3,8,1],
            backgroundColor: [
              'rgba(255, 99, 132, 0)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
          }]
        },
        options: {
        responsive: true,
        showLines: true,
        spanGaps: true,
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
          text: 'Country Chart'
        }
      }
       

    })
    // for (let i = 0; i < this.morti.length; i++) {
    //   this.morti.pop();
    //   this.datesNumbers.pop();
    // }
    let prova2: any = document.getElementById('chartwrapper2');
     //var canvas : any = document.getElementById("mycanvas");
    let ctx2 = prova2.getContext("2d");
    this.chart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Rec. Rate', 'Fat. Rate'],
        datasets: [{
          lineTension: 0,
            label: '',
            borderColor: 'rgba(235, 136, 54, 0.952)',
            pointBorderColor: 'rgba(27, 81, 120, 1)',
            //data: [5, 10, 15, 20, 25, 30],
            data: [5,5],
            backgroundColor: [
              'rgba(255, 99, 132, 0)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
          }]
        },
        options: {
        responsive: true,
        showLines: true,
        spanGaps: true,
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
          text: 'Country Chart'
        }
      }
       

    })
   };

  //variabile in cui si memorizzano i dati nell'asse Y
  asseX = ['Cases %', 'Deaths %', 'Recoveries %'];
  asseX2 = ['Recovery Rate %', 'Fatality Rate %'];
  asseY : number[] = [6,4,2,3,5];
  arrayPerCSVY = [];

  //variabile in sui si memorizzano delle date sottoforma di stringhe
  dates : Date[] = []; 

  //variabile in sui si memorizzano delle date sottoforma di numeri
  datesNumbers : number[] = [];

  chart : Chart;
  chart2 : Chart;
  //Array utilizzato per creare il grafico la prima volta

  myControl = new FormControl(); //per far funzionare il filtro
  countries : string[] = new Array(); // per il filtro dinamico
  filteredOptions: Observable<string[]>; //per il filtro
  public covidData : CovidData []; //appoggio per il collegamento al database
  filtratoPerNazione = new Array();

  covidScelto = new Array();
  
  giornoCorrente; //Conterrà la selezione della data
  
  public country:string; //per memorizzare la stringa dell’input
  
  //Base per costruire il sistema di filtraggio per categoria
  
  public sortOption:string; //variabile per la scelta della data
  
  //Questo metodo salva la scelta di categoria dell'utente nella variabile sortOption
  // sortBy(form : NgForm){
  //   this.sortOption = form.form.value;
  // }

  
  //tentativi patetici di far funzionare il grafico aspettando il caricamento dei dati
  // a = waits(2000);
  // setTimeout(() => {
  //   console.log('aaa');
  // }, 2000)
  // await()
  //delay()

  //Questo è una sorta di puntatore all'elemento html, ma alla fine non lo sto usando
  //@ViewChild('chartwrapper') chartWrapper:ElementRef;
  

   

   addData(chart, label, data) {
    chart.data.labels.push(label);
    //chart.data.data.push(data);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    //console.log('provalabel', label)
    //console.log('provadata', data)
  }
  
  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
}

//Funzione per fare in modo che aspetti che l'array venga popolato prima di caricare
 resolveAfter2Seconds() {
   return new Promise(resolve => {
     setTimeout(() => {
       resolve('resolved');
     }, 2000);
   });
   
 }

 dataFilter () {

   let filtroPerNazione = new Array();
   if (this.country != '' || this.country != null) {
    this.covidData.filter((item) => {
      if (item.country === this.country) {
        filtroPerNazione.push(item)
        this.filtratoPerNazione.push(item);
        //console.log("BECCATO!", item)
      }
    });
    //console.log("Risultato finale",filtroPerNazione);
   }
    //console.log("AAAAAAAA", filtroPerNazione)
  return filtroPerNazione;
 }

  flagGrafico = true;

filtroCountry;

   async updGraph(form: NgForm) {

    this.flagGrafico = false;

    console.log("Giorno corrente", this.giornoCorrente);



    //Memorizzo l'input data dell'utente
    this.sortOption = form.form.value.sort;
    //console.log(form.form.value.sort);

    //Memorizzo l'input nazione dell'utente
    this.filtroCountry = this.dataService.getData().pipe(
      map( covidData => covidData.filter(element => element.country  == this.country)));

  //     let filtroOsservNum;

      
    //svuoto il vettore dei dati che aveva già
     for (let i = 0; i < 3; i++) {
      this.removeData(this.chart);
     }

     for (let i = 0; i < 2; i++) {
      this.removeData(this.chart2);
     }

     for (let i = 0; i < this.arrayPerCSVY.length; i++){
       this.arrayPerCSVY.pop()
     }

//------------------------------------------------------------------------------
    
let filtroPerData = new Array();
 this.dataFilter().filter((item) => {
   console.log(item.date)
   if (item.date == this.giornoCorrente) {
     filtroPerData.push(item)
     //console.log("BECCATO!", item)
   }
 });
 console.log("VVVVVVVVVVVVV",filtroPerData)
 //console.log("Risultato finale",filtroPerNazione);


  let valorefinaleY = filtroPerData[0];
  let vettoreFinaleY = new Array();

      //vettoreFinaleY.push(valorefinaleY.population/1000);
      vettoreFinaleY.push((valorefinaleY.cases/valorefinaleY.population)*100);
      vettoreFinaleY.push((valorefinaleY.deaths/valorefinaleY.population)*100);
      vettoreFinaleY.push((valorefinaleY.recoveries/valorefinaleY.population)*100);

      let vettoreFinaleY2 = new Array();
      vettoreFinaleY2.push(valorefinaleY.recoveryRate);
      vettoreFinaleY2.push(valorefinaleY.fatalityRate);

      this.arrayPerCSVY.push(valorefinaleY.population);
      this.arrayPerCSVY.push(valorefinaleY.cases);
      this.arrayPerCSVY.push(valorefinaleY.deaths);
      this.arrayPerCSVY.push(valorefinaleY.recoveries);
      this.arrayPerCSVY.push(valorefinaleY.recoveryRate);
      this.arrayPerCSVY.push(valorefinaleY.fatalityRate);


//Chiamata della funzione per far caricare l'array
await this.resolveAfter2Seconds();



     //riempo il vettore con i nuovi dati
    for (let i = 0; i < this.asseX.length; i++) {
      this.addData(this.chart, this.asseX[i], vettoreFinaleY[i])
      console.log('provaprova', this.asseX);
      console.log("guarda QUI", vettoreFinaleY)
    }

    for (let i = 0; i < this.asseX2.length; i++) {
      this.addData(this.chart2, this.asseX2[i], vettoreFinaleY2[i])
      console.log('provaprova', this.asseX2);
      console.log("guarda QUI", vettoreFinaleY2)
    }

    //await this.resolveAfter2Seconds();

    this.chart.update();
    this.chart2.update();
    this.flagGrafico = true;
   
  //  console.log(this.morti)
  //  console.log(this.datesNumbers)
  }
   

//Le funzioni di grafico finiscono qui ---------------------------------------------
   


  getEntries(){ //mi prendo i dati
    return this.dataService.getData().subscribe( (response : CovidData[]) => {
      this.covidData = response;
      //console.log("fammi vedere", this.covidData);
      response.forEach(item => {
        this.countries.push(item.country); //pusha nel vettore le country
        //console.log(this.countries); //check
      })
      this.createGraph();
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
  
//----------------------------------------------------------------------------------------------------



public buttonsTexts:Array<string> = ['Add Data'];

public addButton(index:number):void {
  this.buttonsTexts = [...this.buttonsTexts, `Data ${index+2}`];
}

public testiPulsante:Array<string> = ['Agg Data quiiii'];

public aggPulsante(index:number):void {
  this.testiPulsante = [...this.testiPulsante, `Data ${index+2}`];
}


// add(){ 
//   let row = document.createElement('div');   
//     row.className = 'row'; 
//     row.innerHTML = ` <br> <input type="text">`; 
//     document.querySelector('.showInputField').appendChild(row); 
// } 

async add(){ 
  let menu = document.createElement('form');   
    menu.className = ''; 
    menu.innerHTML = `
    <mat-form-field>
        <input type="text" placeholder="Choose a country" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto" id="country" required [(ngModel)]="country">
        <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                {{option}}
            </mat-option>
        </mat-autocomplete>
    </mat-form-field>
</form>
<class="pt-5" #form="ngForm">
<div class="form-group row">
    <label for="continent" class="col-sm-2 col-form-label">Choose category</label>
    <div class="col-sm-10">
        <select class="form-control" id="sort" ngModel required name="sort">
            <option *ngFor="let option of dates"> {{option}} </option>
        </select>
    </div>
</div>`; 
    document.querySelector('.showInputField').appendChild(menu); 
} 

//Salvataggio su png--------------------------------------------------------------------------------
saveAsImage(){
  var chartHtml = document.getElementById('chartwrapper')as HTMLCanvasElement;
  var urlImage= chartHtml.toDataURL('image/png');
  var saveLink = document.getElementById('downloadLink') as HTMLAnchorElement;
  saveLink.href=urlImage;
   
 }

 saveAsImage2(){
  var chartHtml = document.getElementById('chartwrapper2')as HTMLCanvasElement;
  var urlImage= chartHtml.toDataURL('image/png');
  var saveLink = document.getElementById('downloadLink2') as HTMLAnchorElement;
  saveLink.href=urlImage;
   
 }

//Salvataggio in formato CSV

csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'Covid List :',
  useBom: true,
  noDownload: false,
  headers: ["country", "population", "cases", "deaths", "recoveries", "recoveryRate", "fatalityRate", "date"]
};


pushArray(){
  let nuovoArray = new Array();
  nuovoArray.push({
    "country":this.country, 
    "population":this.arrayPerCSVY[0], 
    "cases": this.arrayPerCSVY[1],
    "deaths": this.arrayPerCSVY[2],
    "recoveries": this.arrayPerCSVY[3],
    "recovery_Rate": this.arrayPerCSVY[4],
    "fatality_Rate": this.arrayPerCSVY[5],
    "date": this.giornoCorrente
  })
    return nuovoArray;
  }



  downloadCSV(){
    //funzione che trasforma i dati dal database in formato Csv
    new  AngularCsv(this.pushArray(), "Covid", this.csvOptions);}

}