import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ProductsFournisseur } from 'src/app/Services/products-fournisseur.model';
import { Products } from 'src/app/Services/products.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  myid:string="";
idp:string="";
Product_fr:ProductsFournisseur;
imgurl:string="";
  constructor(private route:ActivatedRoute,public productservice:ProductsService,public userservice:UsersService,private toaster:ToastrService,private router:Router) { }

 async ngOnInit(): Promise<void> { 
  await this.GetMyId()
    this.productservice.newProduct={
      id:0,
      nom:null,
      description:null,
      prix:null,
      date:null,
      idPharmacien:null,
      qte:null,
      imageString:null,
      tva:null,
      categorie:null
    }
    this.getproductid();
    this.GetProduct();
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
getproductid(){
  this.route.paramMap.subscribe({
    next:(params)=>{
     this.idp= params.get("id");}})
}
GetProduct(){
  this.productservice.GetProductById(this.idp).subscribe(
    (res:any)=>{
      this.Product_fr=res;
      if(this.Product_fr!=null){
        this.imgurl=this.Product_fr.imageString;
        this.productservice.newProduct.nom=this.Product_fr.nom;
        this.productservice.newProduct.description=this.Product_fr.description;
        this.productservice.newProduct.date=this.Product_fr.date;
        this.productservice.newProduct.categorie=this.Product_fr.categorie;
        this.productservice.newProduct.prix=this.Product_fr.prix;
        this.productservice.newProduct.qte=this.Product_fr.qte;
        this.productservice.newProduct.tva=this.Product_fr.tva;
        this.productservice.newProduct.imageString=this.Product_fr.imageString;
        this.productservice.newProduct.id=0;
        var date=new Date(this.productservice.newProduct.date).toISOString().slice(0,10);
      this.productservice.newProduct.date=date;
      }
    }
  )
}
async GetMyId(){
 await  this.userservice.getUserId().toPromise().then(
    (res:any)=>{
this.myid=res.id;
    }
  )
}
submit(){
  if (this.myid!=null){
  this.productservice.newProduct.idPharmacien=this.myid;
  this.productservice.newProduct.imageString=this.imgurl;
 this.productservice.PostWebsiteNewProduct().subscribe({
  next:(res:any)=>{
    this.toaster.success("Produit ajouté dans le site avec succès !");
    this.router.navigate(["pharmacien"])
  },
  error:(error)=>{
this.toaster.error("Erreur !")
  }
 })
}
}
}
