import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangestatusService } from 'src/app/Services/changestatus.service';
import { FournisseurModel } from 'src/app/Services/fournisseur-model.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';
import { VentesComponent } from './ventes/ventes.component';

@Component({
  selector: 'app-pharmacien',
  templateUrl: './pharmacien.component.html',
  styleUrls: ['./pharmacien.component.css']
})
export class PharmacienComponent implements OnInit {
  id:string="";
  name:string="";
Fournisseurs:FournisseurModel[]=[];
  constructor(private change:ChangestatusService,public service:UsersService,public diag:MatDialog,public productservice:ProductsService) { }

 async ngOnInit(): Promise<void> {
  await this.GetMyId();
    this.change.changestylepharmacien();
    this.GetFournisseurs();
  }
GetFournisseurs(){
this.service.GetAllFournisseur().subscribe(
  (res:any)=>{
   this.Fournisseurs=res;
  }
)
}
async GetMyId(){
  await this.service.getUserId().toPromise().then((res:any)=>{
       this.id=res.id
   })
 this.service.getUserinfos().subscribe({
   next:(res:any)=>{
    this.name=res.prenom+" "+res.nom;
   }
 })
 }
 async view(){
  var response:any;
  let dialogConfig = new MatDialogConfig();
  dialogConfig.width="100%"
 await this.productservice.GetSoldProductsById(this.id).toPromise().then(
    (res:any)=>{
     response=res;
    }
  )
dialogConfig.data=response;
 this.diag.open(VentesComponent,dialogConfig)
 }
}
