import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../Services/products.model';
import { ProductsService } from '../Services/products.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  id:string="";
cartProduct:Products[]=[];
total:number=0;
  constructor(private router:Router,private toaster:ToastrService,public productservice:ProductsService,private userservice:UsersService) { }

  async ngOnInit(): Promise<void> {
   
    if (localStorage.getItem("token")==null){
    this.router.navigate(["login"])
    }
    await this.getMyId()
    this.cartProduct.push()
    this.getcart()

    this.cartProduct.forEach(product=>{
      product.qte=0;
      this.cartProduct.forEach(productm=>{
        if (product.id==productm.id){
          product.qte++;
        }
      })
    }
)
    const today=new Date().toISOString().slice(0,10);
   this.removeduplicate()
   this.calcultotal()
   this.productservice.commande={
    id:0,
    prixtotal:this.total,
    date:today,
    etat:"Non Confirmée",
    idClient:this.id
   }
   this.productservice.payment={
    id:0,
    datecarte:null,
    numcarte:null,
    idCommande:null,
    cvc:null,
    idClient:this.id
   }
   this.productservice.soldproduct={
    id:0,
    idPharmacien:null,
    idProduit:null,
    qte:null,
    prix:null,
    date:null,
   }
  }
  async getMyId(){
    await this.userservice.getUserId().toPromise().then((res:any)=>{
      this.id=res.id
  })
  }
getcart(){
  if (localStorage.getItem("cart")==null){
    this.toaster.warning("Le panier est vide !")
   this.router.navigate(["products"])
  }
this.cartProduct=JSON.parse(localStorage.getItem("cart"))
}
removeduplicate(){
  
const finalproducts=[...this.cartProduct.reduce((map,obj)=>map.set(obj.id,obj),new Map()).values()]
this.cartProduct=finalproducts;
}
calcultotal(){
  this.cartProduct.forEach(product=>{
    this.total=this.total+(product.qte*product.prix)
  })
}
verif(){ 
     //Controle de saisie Credit Card
     const current=new Date();
  const month = String(current.getMonth() + 1).padStart(2, '0');
  const currentYearStr = new Date().getFullYear().toString()
const last2 = currentYearStr.substring(currentYearStr.length - 2);
  if ((this.productservice.payment.numcarte==null) || (this.productservice.payment.cvc==null) || (this.productservice.payment.datecarte==null)){
    this.toaster.error("Veuillez remplir tous les champs svp !")
    return false;
  }
  if ((isNaN(this.productservice.payment.numcarte))|| (this.productservice.payment.numcarte.toString().length<10)){ //changeable length10
   this.toaster.error("Enter un numéro de carte valide svp !")
   return false;
  }
  if ((this.productservice.payment.cvc.length !=3)||(isNaN(Number(this.productservice.payment.cvc)))){
    this.toaster.error("Le format de cvc est incorrect !")
    this.productservice.payment.cvc=null;
    return false;
  }
if ((this.productservice.payment.datecarte.indexOf("/")==0)){
  this.toaster.error("Le format de la date est incorrect !")
  return false;
  
}
else
{
  var date=this.productservice.payment.datecarte;
 if((Number(date.substring(3,5))<Number(last2))){
  this.toaster.error("La date de validité de la carte a expiré !")
  return false;
 }
 else{
  if((Number(date.substring(3,5))==Number(last2))){
    if (Number(date.substring(1,2))<Number(month)){
      this.toaster.error("La date de validité de la carte a expiré !")
      return false;
    }
  }
 }
}
return true;
}
postsoldproduct(){
  const today=new Date().toISOString().slice(0,10);
this.cartProduct.forEach(product=>{
  this.productservice.soldproduct={
    id:0,
    idPharmacien:product.idPharmacien,
    qte:product.qte,
    prix:product.prix,
    idProduit:product.id,
    date:today
  }
  this.productservice.PostSoldProduct().toPromise().then(
    (res:any)=>{
      console.log(res)
    }
  )
})
}
 submit(){
  if (this.verif()==true){
this.productservice.postnewcommande().subscribe({
  next:(res:any)=>{
    this.productservice.payment.idCommande=res.id
    this.productservice.postpay().subscribe({
      next:async (response:any)=>{
       this.toaster.success("Commande effectuée avec succès !")
       this.updatestock()
       this.postsoldproduct()
      await this.userservice.GetClientNameById(this.id).toPromise().then(
        (res:any)=>{
          localStorage.setItem("infos",JSON.stringify(res))
        }
       )
       localStorage.setItem("facture",JSON.stringify(this.cartProduct))
       this.router.navigate(["cart/facture"])
       localStorage.removeItem("cart")
      },
      error:(err)=>{
        this.toaster.error("Erreur Réessayer plus tard svp !")
      }
    })
  },
  error:(err)=>{
this.toaster.error("Erreur Réessayer plus tard svp !")
  }
})
this.router.navigate(["/products"])
}
}
 updatestock(){
this.cartProduct.forEach(product=>{
this.productservice.GetSingleProductById(product.id.toString()).toPromise().then(
  (res:any)=>{
      var modproduct:Products;
      modproduct=res;
      if((modproduct.qte - product.qte)<=0){ //product out of stock
       this.productservice.DeleteSingleProduct(modproduct.id.toString()).toPromise().then()
      }
     else{
      modproduct.qte=(modproduct.qte-product.qte);
      this.productservice.updatestock(modproduct,modproduct.id).toPromise().then()
     }
  })
})
}
deletefromcart(id:number){
  var qte=0;
  this.cartProduct.forEach((product,index)=>{
if(product.id==id){
  qte=product.qte;
this.cartProduct.splice(index,1)
if ((this.cartProduct==null)||(this.cartProduct.length==0)){
localStorage.removeItem("cart")
}
else{
 var temp:any[]=[];
this.cartProduct.forEach(prod=>{
  for(let i=1;i<=prod.qte;i++){
   temp.push(prod)
  }
})
this.cartProduct=temp;
localStorage.setItem("cart",JSON.stringify(this.cartProduct))
}
window.location.reload()
}
  })
}
}
