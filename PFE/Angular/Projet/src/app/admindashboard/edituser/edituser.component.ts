import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersForAdmin } from 'src/app/Services/users-for-admin.model';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  datefin:string=null;
  updateuser:UsersForAdmin;
  textid:string=null;
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
  constructor(private route:ActivatedRoute,public service:UsersService,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.service.edituseradmin={
      Nom:null,
      Prenom:null,
      Email:null,
      Date_naissance:null,
      Adresse:null,
      Sexe:null,
      PhoneNumber:null,
      Role:null,
      DateFin:null
    }
    this.route.paramMap.subscribe({
      next:(params)=>{
       const id= params.get("id");
       if (id){
         //calling api method
          this.service.getUserbyId(id).subscribe({
             next:(response)=>{
              console.log(response)
              this.service.edituseradmin = {
                Nom:response.nom,
                Prenom:response.prenom,
                Email:response.email,
                Date_naissance:response.date_naissance,
                Adresse:response.adresse,
                Sexe:response.sexe,
                PhoneNumber:response.phoneNumber,
                Role:response.role,
                DateFin:response.dateFin                      
                  }
              this.textid=response.id;
              this.datefin =new Date(this.service.edituseradmin.DateFin).toISOString().slice(0,10);
              console.log(this.service.edituseradmin.DateFin);

              console.log("kj");
console.log(this.datefin);
              var date=new Date(this.service.edituseradmin.Date_naissance).toISOString().slice(0,10);
             this.service.edituseradmin.Date_naissance=date;
           

                 if ((this.service.edituseradmin.Role=="Fournisseur")  || (this.service.edituseradmin.Role=="Pharmacien")){
                  var element=document.getElementById("datefin");
                        element.style.display="block";
                }
             }
          }
          )
       }
      }
    }

    )
  }
  editUser(){
    this.updateuser={
      nom:this.service.edituseradmin.Nom,
      prenom:this.service.edituseradmin.Prenom,
      email:this.service.edituseradmin.Email,
      adresse:this.service.edituseradmin.Adresse,
      sexe:this.service.edituseradmin.Sexe,
      phoneNumber:this.service.edituseradmin.PhoneNumber,
      id:this.textid,
      date_naissance:this.service.edituseradmin.Date_naissance,
      role:this.service.edituseradmin.Role,
      dateFin:new Date(this.datefin)
    }
this.service.editUserbyId(this.textid,this.updateuser).subscribe({
  next:(response)=>{
   this.toaster.success("Utilisateur modifié !");
   this.router.navigate(["admin"]);
  }
}

);
  }
deleteUser(){
  this.service.deleteUserbyId(this.textid).subscribe({
    next:(response)=>{
      this.router.navigate(['admin']);
      this.toaster.success("Utilisateur Supprimé !")
    }
  }

  )
}
}
