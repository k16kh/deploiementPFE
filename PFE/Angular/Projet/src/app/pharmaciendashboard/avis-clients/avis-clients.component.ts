import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { Products } from 'src/app/Services/products.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-avis-clients',
  templateUrl: './avis-clients.component.html',
  styleUrls: ['./avis-clients.component.css']
})
export class AvisClientsComponent implements OnInit{
userid:string="";

MyProducts:Products[]=[];
avis:{
  id:number,
  idClient:string,
  idProduit:number,
  message:string,
  stars:number
}[]=[];
filteredavis:{
  id:number,
  idClient:string,
  idProduit:number,
  message:string,
  stars:number,
}[]=[];
list:any=[];
  constructor(public userservice:UsersService,public productservice:ProductsService,private toaster:ToastrService) { }
 async ngOnInit(): Promise<void> {
  await this.getmyid();
   await this.Getmyproducts()
 await  this.Getallavis()
  this.MyProducts.forEach(prod=>{
    this.avis.forEach(av=>{
      if(av.idProduit==prod.id){
       this.filteredavis.push(av)
      }
    })
  })
await this.setlist()
  }
async getmyid(){
 await  this.userservice.getUserId().toPromise().then(
  (res:any)=>{
    this.userid=res.id
  }
 )
}
async Getmyproducts(){
 await this.productservice.GetMyProductsById(this.userid).toPromise().then(
    (res:any)=>{
      this.MyProducts=res;
  })
}
async Getallavis(){
  await this.userservice.Getallcomments().toPromise().then(
    (res:any)=>{
      this.avis=res;
  })
}
getclientname(id:string){
return this.userservice.GetClientNameById(id).toPromise()
}
 async setlist(){
 await  this.filteredavis.forEach(av=>{
   this.getclientname(av.idClient).then(
      (res:any)=>{
      this.list.push({
        nomclient:res.nom + " "+res.prenom,
        message:av.message,
        nomproduit:av.idProduit.toString()
      })
      }
    )
})
}
deleteitem(idprod:number,message:string){
this.userservice.Deletemessagebyidandmessage(idprod,message).subscribe({
  next:(res:any)=>{
    this.toaster.success("Message Supprimé !")
    window.location.reload()
  }
}
)
}
}
