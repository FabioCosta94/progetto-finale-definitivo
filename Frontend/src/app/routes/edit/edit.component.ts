import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  UsersData } from 'src/app/models/data.model';
import { NgForm } from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router : Router) { }

usersEntry: UsersData;



  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.fetchEntry(id);
  }

  fetchEntry(id){
    this.usersService.getUser(id).subscribe( (res: any ) => {
      this.usersEntry = res;
    })
  }
 
  onSubmit(){
    console.log(this.usersEntry);

    this.usersService.editUser(this.usersEntry)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/details', this.usersEntry.id])
    }), err => {
      console.log(err);
    }
    this.router.navigate(['/details', this.usersEntry.id])
  }

}
