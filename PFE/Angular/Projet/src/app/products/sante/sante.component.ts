import { Component, OnInit } from '@angular/core';
import { Products } from '../../Services/products.model';
import { ProductsService } from '../../Services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sante',
  templateUrl: './sante.component.html',
  styleUrls: ['./sante.component.css']
})
export class SanteComponent implements OnInit {

  constructor(public productservice:ProductsService,private toaster:ToastrService) { }
  products:Products[]=[];
  cartproducts:Products[]=[];
  count:number=0;


  ngOnInit(): void {
    this.GetProducts();
    this.count=JSON.parse(localStorage.getItem("cart")).length;
  }

  GetProducts(){
    this.productservice.GetProductBySante().subscribe({
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
    

