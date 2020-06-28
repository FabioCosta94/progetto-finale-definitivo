import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-by-two',
  templateUrl: './filter-by-two.component.html',
  styleUrls: ['./filter-by-two.component.css']
})

export class FilterByTwoComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getEntries()
  }

  public covidData : CovidData [];
  public showResult = false;
  continent:string;
  classification:string;
  //mi servono da mettere nell'html come *ngFor="let continent of continents"
  continents = ["Europe", "America", "Asia", "Oceania", "Africa", "Antartide"]
  classifications = ["Very low", "Low" , "Medium" , "High" , "Very high"]

  //voglio filtrare per continent e classification

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
    })
  }

  filterBy(form : NgForm){
    //form.form.value.continent conterrà il valore che l'utente ha scritto in continent, idem per classification
    this.continent = form.form.value.continent;
    this.classification = form.form.value.classification;

    if(this.continent && this.classification){ //non entra se country è undefined
      this.showResult=true;
    }
  }


}
