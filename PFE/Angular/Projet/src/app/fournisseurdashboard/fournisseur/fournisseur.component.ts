import { ANIMATION_MODULE_TYPE, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ChangestatusService } from 'src/app/Services/changestatus.service';
import { ProductsFournisseur } from 'src/app/Services/products-fournisseur.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
Products:ProductsFournisseur[]=[];
id:string;
name:string;
  constructor(private change:ChangestatusService,public prodservice:ProductsService,public userservice:UsersService) { }
    
   async ngOnInit(): Promise<void> {
    this.change.changestylefournisseur();
     this.Products.push();
   await  this.GetMyId();
   this.GetProducts_Fr();
  }
async GetProducts_Fr(){
  this.userservice.GetAllProductsByFournisseurId(this.id).subscribe({
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
async GetMyId(){
 await this.userservice.getUserId().toPromise().then((res:any)=>{
      this.id=res.id
  })
this.userservice.getUserinfos().subscribe({
  next:(res:any)=>{
   this.name=res.prenom+" "+res.nom;
  }
})
}
}
