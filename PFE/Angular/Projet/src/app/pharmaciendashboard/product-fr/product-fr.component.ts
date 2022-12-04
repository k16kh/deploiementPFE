import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsFournisseur } from 'src/app/Services/products-fournisseur.model';
import { UsersForAdmin } from 'src/app/Services/users-for-admin.model';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-product-fr',
  templateUrl: './product-fr.component.html',
  styleUrls: ['./product-fr.component.css']
})
export class ProductFrComponent implements OnInit {
 id_fr:string="";
 fournisseur:string;
 Products:ProductsFournisseur[]=[];
  constructor(private route:ActivatedRoute,public userservice:UsersService) { }

  ngOnInit(): void {
    this.Get_fournisseurId();
    this.Get_FournisseurName();
    this.GetProducts_Fr();
  }
Get_fournisseurId(){
  this.route.paramMap.subscribe({
    next:(params)=>{
     this.id_fr= params.get("id");}})
}
Get_FournisseurName(){
this.userservice.getUserbyId(this.id_fr).subscribe(
  (res:any)=>{
    if ((res.nom!=null) || (res.prenom!=null)){
  this.fournisseur=res.nom+" "+res.prenom}
  }
)
}
async GetProducts_Fr(){
  this.userservice.GetAllProductsByFournisseurId(this.id_fr).subscribe({
    next:(res:any)=>{
      this.Products=res;
      this.Products.forEach(produit=>{
        var date=new Date(produit.date).toISOString().slice(0,10);
       produit.date=date;
      })
    }
  }
  )
}
}
