import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangestatusService } from '../Services/changestatus.service';
import { Products } from '../Services/products.model';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
products:Products[]=[];
cartproducts:Products[]=[];
count:number=0;
  constructor(public productservice:ProductsService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.GetProducts();
    this.count=JSON.parse(localStorage.getItem("cart")).length;

  }

GetProducts(){
 this.productservice.GetAllProducts().subscribe({
  next:(res:any)=>{
this.products=res;
  },
  error:(err)=>{
  }
 })
}
addtocart(id:number){
this.productservice.GetSingleProductById(id.toString()).subscribe({
  next:(res:any)=>{
   if ("cart" in localStorage){
    this.cartproducts=JSON.parse(localStorage.getItem("cart"))
    this.cartproducts.push(res);
    localStorage.setItem("cart",JSON.stringify(this.cartproducts))
    this.toaster.success("Produit ajouté dans le panier !")
    this.count=JSON.parse(localStorage.getItem("cart")).length;
   }
   else{
    this.cartproducts.push(res);
    localStorage.setItem("cart",JSON.stringify(this.cartproducts))
    this.toaster.success("Produit ajouté dans le panier !")
    this.count=JSON.parse(localStorage.getItem("cart")).length;
   }
  },
  error:(err)=>{
    this.toaster.error("Erreur !")
  }
})
}
}
