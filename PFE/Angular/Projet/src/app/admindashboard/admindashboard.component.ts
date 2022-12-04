import { Component, OnInit } from '@angular/core';
import { UsersForAdmin } from '../Services/users-for-admin.model';
import { UsersService } from '../Services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { ChangestatusService } from '../Services/changestatus.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  users:UsersForAdmin[]=[];
  constructor(public service:UsersService,private change:ChangestatusService,private toaster:ToastrService) { }

  ngOnInit(): void {
   this.users=[];
    this.change.changestyleadmin();
    this.users.push();
    this.getAllusers();
  }
getAllusers(){
this.service.adminGetallusers().subscribe({
  next:(get) => {
    this.users=get;
    this.users.forEach(user=>{
      var date=new Date(user.date_naissance).toISOString().slice(0,10);
      user.date_naissance=date;
    }
    )
  },
  error:(response) =>{
this.toaster.error("Erreur !")
  }
  })
}

}
