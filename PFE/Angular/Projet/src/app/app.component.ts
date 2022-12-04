import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ChangestatusService } from './Services/changestatus.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private status:ChangestatusService,private router:Router){}
  title = 'Santefy';
  ngOnInit(): void {
    if(localStorage.getItem("token")==null){
      this.router.navigateByUrl("/login");
      }
 this.status.changeloggedin();
 this.status.changestyleadmin();



  }
}
