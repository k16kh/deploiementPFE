import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-productph',
  templateUrl: './productph.component.html',
  styleUrls: ['./productph.component.css']
})
export class ProductphComponent implements OnInit {
id:string="";
imgurl:string="";
  constructor(public productservice:ProductsService,private route:ActivatedRoute,private toaster:ToastrService,private router:Router) { }

   async ngOnInit(): Promise<void> {
    await this.GetProduct()
    this.productservice.Product={
      nom:null,
      description:null,
      tva:null,
      prix:null,
      idPharmacien:null,
      id:0,
      categorie:null,
      imageString:null,
      qte:null,
      date:null
    }
  }
  loadimage(e){
    this.imgurl=this.productservice.Product.imageString;
    if (e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.imgurl=event.target.result;
        this.productservice.Product.imageString=this.imgurl;
      }
    }
    }
GetProduct(){
  this.route.paramMap.subscribe({
    next:(params)=>{
     this.id= params.get("id");}})
  if (this.id!=null){
  this.productservice.GetSingleProductById(this.id).subscribe({
    next:(res:any)=>{
    this.productservice.Product=res;
      var date=new Date( this.productservice.Product.date).toISOString().slice(0,10);
     this.productservice.Product.date=date;
     this.imgurl=this.productservice.Product.imageString;
    },
    error:(error)=>{
      this.toaster.error("Erreur !")
    }
  })
  }
  else
  {
this.toaster.error("Erreur !")
  }
}
update(){
if (this.productservice.Product!=null){
  this.productservice.updateSingleProduct(this.id).subscribe({
    next:(res:any)=>{
     this.toaster.success("Modification effectuée avec succès !")
     this.router.navigate(["pharmacien/myProducts"])
    },
    error:(error)=>{
      this.toaster.error("Erreur !")
    }
  })
}
}
delete(){
if (this.productservice.Product!=null){
  this.productservice.DeleteSingleProduct(this.id).subscribe({
    next:(res:any)=>{
this.toaster.success("Produit supprimé avec succès !");
this.router.navigate(["pharmacien/myProducts"])
    },
    error:(err)=>{
      this.toaster.error("Erreur !")
    }
  })
}
}
}
