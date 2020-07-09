import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UsersData } from 'src/app/models/data.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router : Router) { }

  usersEntry: UsersData;
  id: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchEntry()
  }

  fetchEntry(){
    this.usersService.getUser(this.id).subscribe( (res: any ) => {
      this.usersEntry = res;
    })
  }

  delete(){
    this.usersService.deleteUser(this.id)
    .subscribe(data => {
      this.router.navigate(['/dashboard']);
      console.log("deleted");
    }, (err) => {
      console.log(err);
    });
    this.router.navigate(['/dashboard']);
  }
}
