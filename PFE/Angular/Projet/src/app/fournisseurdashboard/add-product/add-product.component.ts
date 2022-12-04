import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
cat:string;
imgurl:string="";
id:string="";
  constructor(public productservice:ProductsService,public userservice:UsersService,private toaster:ToastrService,private router:Router) { }
  async ngOnInit(): Promise<void> {
    this.productservice.Prod_Fournissuer={
      id:0,
      nom:"",
    description:"",
    imageString:"",
    prix:0,
    tva:0,
    qte:0,
    date:"",
    categorie:"",
    idFournisseur:""
    }
    this.cat=null;
  await  this.GetMyId()
    this.productservice.Prod_Fournissuer.idFournisseur=this.id;
  }
 async GetMyId(){
await this.userservice.getUserId().toPromise().then((res:any)=>{
  this.id=res.id
})
} 
loadimage(e){
if (e.target.files){
  var reader=new FileReader();
  reader.readAsDataURL(e.target.files[0])
  reader.onload=(event:any)=>{
    this.imgurl=event.target.result;
    this.productservice.Prod_Fournissuer.imageString=this.imgurl;
  }
}
}
  public  submit(){
  this.GetMyId()
  this.productservice.Prod_Fournissuer.idFournisseur=this.id;
  this.productservice.Prod_Fournissuer.categorie=this.cat;
  this.productservice.PostNewProduct().subscribe(
    (res:any)=>{
      this.toaster.success("Produit Ajouté")
      this.router.navigate(['fournisseur'])
    },
    err=>{
      this.toaster.error("Erreur !")
    }
  );
}
}
