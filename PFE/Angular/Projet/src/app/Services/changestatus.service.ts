import { Injectable } from '@angular/core';
import { UsersForAdmin } from './users-for-admin.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ChangestatusService {

  constructor(private service:UsersService) { }
  changeloggedin(){
    if(localStorage.getItem("token")!=null){
      var element=document.getElementById("login");
   element.style.visibility="hidden";
    element.style.display="none";
    var element2=document.getElementById("register");
    element2.style.visibility="hidden";
    element2.style.display="none";
    var element3=document.getElementById("logout");
    element3.style.visibility="visible";
    element3.style.display="block";
  }}
  changestyleadmin(){
    if (localStorage.getItem("token")!=null){
      this.service.getUserinfos().subscribe(
        (res:any)=>{
         if (res.role=="Admin"){ //Si un admin  est connecté
          var element=document.getElementById("admin");
          element.style.visibility="visible";
          element.style.display="block";
         }
        }
       )
     }
  }
  changestylepharmacien(){
    if (localStorage.getItem("token")!=null){
      this.service.getUserinfos().subscribe(
        (res:any)=>{
         if (res.role=="Pharmacien"){ //Si un pharmacien  est connecté
          var element=document.getElementById("pharmacien");
          element.style.visibility="visible";
          element.style.display="block";
         }
        }
       )
     }
  }
  changestylefournisseur(){
    if (localStorage.getItem("token")!=null){
      this.service.getUserinfos().subscribe(
        (res:any)=>{
         if (res.role=="Fournisseur"){ //Si un fournisseur  est connecté
          var element=document.getElementById("fournisseur");
          element.style.visibility="visible";
          element.style.display="block";
         }
        }
       )
     }
  }
  }

