import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../Services/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public cpassword:string;
  Sexe=[
    {id:1,name:"Homme"},
    {id:2,name:"Femme"}
   ];
  constructor(public service:UsersService,private toaster:ToastrService,private router:Router) { }
  ngOnInit(): void {
    this.service.newuser={
      Nom:null,
      Password:null,
      Prenom:null,
      Email:null,
      Date_naissance:null,
      Adresse:null,
      Sexe:null,
      PhoneNumber:null
    }
  }
 
submit(){
if (this.service.verif(this.cpassword)==true){
  this.service.registerUser().subscribe(
(res:any)=>{
  if (res.succeeded){
    this.toaster.success("Inscription effectuée !","Succès !");
   this.router.navigate(["login"]);
  }//success
  else
  {
    res.erros.forEach(element => {
      switch(element){
        case "DuplicateUserName":
          this.toaster.error("Utilisateur existe deja");
          break;
      }
    }
    );
  }
})
}}
}
