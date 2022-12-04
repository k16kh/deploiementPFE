import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsFournisseur } from 'src/app/Services/products-fournisseur.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  cat:string;
  imgurl:string="";
  id:string="";
  constructor(private route:ActivatedRoute ,public productservice:ProductsService,public userservice:UsersService,private toaster:ToastrService,public routeur:Router) { }

  async ngOnInit(): Promise<void> {
    this.productservice.Prod_Fournissuer={
      id:null,
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
    this.route.paramMap.subscribe({
      next:(params)=>{
       this.id= params.get("id");}})
       this.GetProduct()
      
  }

 async GetMyId(){
await this.userservice.getUserId().toPromise().then((res:any)=>{
  this.id=res.id
})
} 
async GetProduct(){
  await this.productservice.GetProductById(this.id).toPromise().then(
    (res:any)=>{
      this.productservice.Prod_Fournissuer=res;
    }
  )
}
  loadimage(e){
    this.imgurl=this.productservice.Prod_Fournissuer.imageString;
    if (e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.imgurl=event.target.result;
        this.productservice.Prod_Fournissuer.imageString=this.imgurl;
      }
    }
    }
submit(){
  var number=Number(this.id); // conveert string to num  ( entier ) 
  this.productservice.Prod_Fournissuer.id=number;
 this.productservice.PutProduct(this.id).subscribe({
  next:(res:any)=>{
    this.routeur.navigate(['fournisseur'])
    this.toaster.success("Modification Effectuée Avec Succés !")
  },
  error:(err)=>{
    this.toaster.error("Erreur !")
  }
  }
 )
}
delete(){
  this.productservice.DeleteProduct(this.id).subscribe(
    (res:any)=>{
      this.routeur.navigate(['fournisseur'])
    this.toaster.success("Produit Supprimé Avec Succés !")
    }
  )
}
}
