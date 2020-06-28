import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CovidData } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getEntries()
  }

  public covidData : CovidData [];
  sortingOptions = ["cases", "population", "recoveries", "deaths"];

  sortOption:string; //variabile per la scelta
  showSortResult = false; 


  sortBy(form : NgForm){
    this.sortOption = form.form.value.sort;
    
    //scrivere ['deaths'] o .deaths è la stessa cosa in js
    this.covidData = this.covidData.sort((a, b) => 
      a[this.sortOption]-b[this.sortOption]);
    /*Si può anche scrivere come: 
      this.covidData = this.covidData.sort(function(a, b) { 
        return a[this.sortOption] - b[this.sortOption]; 
    })*/
    //in questo modo mostra i risultati solo quando ho premuto il pulsante
    this.showSortResult=true; 
    console.log("ordered: ", this.covidData)

  }

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
    })
  }

}
