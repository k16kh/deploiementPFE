import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-singlecommande',
  templateUrl: './singlecommande.component.html',
  styleUrls: ['./singlecommande.component.css']
})
export class SinglecommandeComponent implements OnInit {
id:number=0;
commande:{
  id:number,
  date:string,
  prixtotal:number,
  etat:string,
  idClient:string
}=null;
  constructor(private route:ActivatedRoute,private router:Router,private toaster:ToastrService,public productservice:ProductsService,public userservice:UsersService) { }

 async  ngOnInit(): Promise<void> {
  
    this.route.paramMap.subscribe({
      next:(params)=>{
       this.id= Number(params.get("id"));}})
       await this.Getcommande()
       if (this.commande.etat=="Confirmée"){
        var element=document.getElementById("hide")
        element.style.visibility="hidden";
        element.style.display="none";
        var element2=document.getElementById("hide2")
        element2.style.visibility="hidden"
        element2.style.display="none";
       }
       this.productservice.commande={
        id:this.commande.id,
        date:this.commande.date,
        prixtotal:this.commande.prixtotal,
        etat:"Confirmée",
        idClient:this.commande.idClient
       }
  }
async Getcommande(){
  await this.productservice.GetSingleCommandById(this.id).toPromise().then(
    (res:any)=>{
      this.commande=res;
      var date= new Date(this.commande.date).toISOString().slice(0,10);
      this.commande.date=date;
  })
}
verif(){

}
confirm(){
this.productservice.ConfirmCommand(this.id).subscribe({
  next:(res:any)=>{
    this.toaster.success("Commande Confirmée !")
    this.router.navigate(["fournisseur/commandesclient"])
  },
  error:(err)=>{
    this.toaster.error("Erreur !")
  }
})
}
}
