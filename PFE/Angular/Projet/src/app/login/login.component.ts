import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangestatusService } from '../Services/changestatus.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public service:UsersService,private toaster:ToastrService ,private router:Router,public change:ChangestatusService) { }

  ngOnInit(): void {
    this.service.loginuserAuth={
      Email:null,
      Password:null
    }
    if(localStorage.getItem("token")!=null){ //somone already is connected
    this.router.navigateByUrl("/home");
    this.change.changeloggedin();
    }
  }
submit(){
  this.service.loginUser().subscribe(
(res:any)=>{
  localStorage.setItem("token",res.token);
  if(localStorage.getItem("token")!=null){
    this.router.navigateByUrl("/home");
    this.change.changeloggedin();
    (this.service.getUserinfos().subscribe(
     (res:any)=>{
      if (res.role=="Client"){ //Si un client normale est connecté
       //client methods
       this.router.navigate(["home"])
      }
      else
      {
        if (res.role=="Admin"){
        this.router.navigateByUrl("/admin")
        }
      }
      if (res.role=="Fournisseur"){
        var date=new Date();
        var datefin=new Date(res.dateFin)
        if (date.getTime()>datefin.getTime()){
         localStorage.removeItem("token");
         this.toaster.error("Votre Date est périmée contactez administrateur !")
         this.router.navigate(["login"])
        }
        else {
        this.router.navigateByUrl("/fournisseur")
        }
      }
       if (res.role=="Pharmacien"){

       var date=new Date();
        var datefin=new Date(res.dateFin)
        if (date.getTime()>datefin.getTime()){
         localStorage.removeItem("token");
         this.toaster.error("Votre Date est périmée contactez administrateur !")
         this.router.navigate(["login"])
        }
        else {
        this.router.navigateByUrl("/pharmacien")
        }
       }
     }
    ));
  }
},
err=> {
this.toaster.error("Vérifier votre Email ou mot de passe !","Erreur !");
}
);
}
}

