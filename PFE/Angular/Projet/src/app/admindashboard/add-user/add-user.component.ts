import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  Sexe=[
    {id:1,name:"Homme"},
    {id:2,name:"Femme"}
   ];
   Role=[
     {id:3,type:"Client"},
     {id:4,type:"Fournisseur"},
     {id:5,type:"Pharmacien"},
     {id:6,type:"Admin"}
   ];
  constructor(public service:UsersService,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.service.newuseradmin={
      Nom:null,
      Password:null,
      Prenom:null,
      Email:null,
      Date_naissance:null,
      Adresse:null,
      Sexe:null,
      PhoneNumber:null,
      Role:null,
      DateFin:null
    }
  }
changerole(){
  if ((this.service.newuseradmin.Role=="Fournisseur") || (this.service.newuseradmin.Role=="Pharmacien")){
    var element=document.getElementById("datefin");
    element.style.display="block";

    var element2 = <HTMLInputElement> document.getElementById("submit");
    element2.disabled = false;
  }
  else if(this.service.newuseradmin.Role=="Admin") {
  var element2 = <HTMLInputElement> document.getElementById("submit");
  element2.disabled = true;

  }
  else {
    var element=document.getElementById("datefin");
    element.style.display="none";

    var element2 = <HTMLInputElement> document.getElementById("submit");
    element2.disabled = false;
  }
}
register(){
  this.service.registerbyAdmin().subscribe({
  next:  (res:any)=>{
      if (res.succeeded){
        this.toaster.success("Utilisateur Ajouté","Succès !");
       this.router.navigate(["admin"])

      }//success
},
error:(err)=>{
  this.toaster.error("Erreur !")
}})
}}
