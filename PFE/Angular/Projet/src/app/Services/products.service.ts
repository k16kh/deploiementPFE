import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsFournisseur } from './products-fournisseur.model';
import { Products } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
Prod_Fournissuer:ProductsFournisseur;
newProduct:Products;
Product:Products;
cart:Products[];
commande:{
  id:number,
  date:string,
  prixtotal:number,
  etat:string,
  idClient:string
}
payment:{
  id:number,
  datecarte:string,
numcarte:number,
idCommande:number,
cvc:string,
idClient:string
}
soldproduct:{
  id:number,
  idPharmacien:string,
  idProduit:number,
  qte:number,
  prix:number,
  date:string
}
url:string="http://localhost:25876/api";
  constructor(private http:HttpClient) {
   }
   //fournisseur methods
   PostNewProduct(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.post(this.url+"/AspNetProductsFrs",this.Prod_Fournissuer,{headers : tokenHeader})
   }
   GetProductById(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/AspNetProductsFrs/"+id,{headers : tokenHeader})
   }
   PutProduct(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.put(this.url+"/AspNetProductsFrs/"+id,this.Prod_Fournissuer,{headers : tokenHeader})
   }
   DeleteProduct(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.delete(this.url+"/AspNetProductsFrs/"+id,{headers : tokenHeader})
   }
   //pharmacien methods
   GetSoldProductsById(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/AspNetSoldProducts/GetSoldById?id="+id,{headers : tokenHeader})
   }
   PostSoldProduct(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.post(this.url+"/AspNetSoldProducts",this.soldproduct,{headers : tokenHeader})
   }
   PostWebsiteNewProduct(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.post(this.url+"/AspNetProducts",this.newProduct,{headers:tokenHeader});
   }
   GetMyProductsById(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/AspNetProducts/GetMyProductsById?id="+id,{headers:tokenHeader});
   }
   GetSingleProductById(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/AspNetProducts/"+id,{headers:tokenHeader});
   }
   updateSingleProduct(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.put(this.url+"/AspNetProducts/"+id,this.Product,{headers:tokenHeader})
   }
   DeleteSingleProduct(id:string){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.delete(this.url+"/AspNetProducts/"+id,{headers:tokenHeader})
   }
   GetAllProducts(){
    return this.http.get(this.url+"/AspNetProducts")
   }
   GetProductByIdPh(id:string){
    return this.http.get(this.url+"/AspNetProducts/"+id)
   }
   //commandes
   postnewcommande(){
    return this.http.post(this.url+"/AspNetCommandes",this.commande)
   }
   postpay(){
      return this.http.post(this.url+"/AspNetPayments",this.payment)
   }
   GetALLCommandes(){
    return this.http.get(this.url+"/AspNetCommandes")
  }
  GetAllPayments(){
    return this.http.get (this.url+"/AspNetPayments")
  }
  GetSingleCommandById(id:number){
    return this.http.get(this.url+"/AspNetCommandes/"+id)
  }
  ConfirmCommand(id:number){
    return this.http.put(this.url+"/AspNetCommandes/"+id,this.commande)
  }
  updatestock(product:Products,id:number){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
  return this.http.put(this.url+"/AspNetProducts/"+id,product,{headers:tokenHeader})
  }

  // cat 
  
  GetProductByBeaute(){
    return this.http.get(this.url+"/AspNetProducts/GetMyProductsByCatBeaute")
   }

   
   GetProductBySante(){
    return this.http.get(this.url+"/AspNetProducts/GetMyProductsByCatSante")
   }

   

   GetProductByBienEtre(){
    return this.http.get(this.url+"/AspNetProducts/GetMyProductsByCatBienetre")
   }
}
