import { getLocaleId } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
Id:string=null;
name:string=null;
constructor(public service:UsersService,private toaster:ToastrService,private router:Router) { }
  ngOnInit(): void 
  {
    if (localStorage.getItem("token")==null){
          this.router.navigateByUrl("login")
    }
    this.getId();
    var dt=new Date()
    this.service.avis={
      Id:0,
      Description:"",
      idClient:this.Id,
      Date:dt.toISOString()
    }
  this.service.getUserinfos().subscribe(
    (res:any)=>{
     this.name=res.prenom+" "+ res.nom;
    }
  )
  }
  getId(){
    this.service.getUserId().subscribe(
     (res:any)=>{
     if(res.id!=null){ //id found
      this.Id=res.id
     }
     else
     {
      alert("Erreur !");
     }
     }
    )
  }
  submit(){
    this.getId()
    this.service.avis.idClient=this.Id;
    this.service.sendavis().subscribe(
      (res:any)=>{
      if( (res.description)!=null){
      this.toaster.success("Message Envoyé !")
      this.router.navigate(["home"])
      }
      }
    )
  }
}
