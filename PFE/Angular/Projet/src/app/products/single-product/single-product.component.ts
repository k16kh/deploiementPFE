import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/Services/products.model';
import { ProductsService } from 'src/app/Services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeedbackComponent } from './feedback/feedback.component';
import { data } from 'jquery';
import { UsersService } from 'src/app/Services/users.service';
import { JsonPipe } from '@angular/common';
import { CompareComponent } from 'src/app/compare/compare.component';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
textchange:string="Comparer";
incompare:boolean=false;
gaveopinion:boolean=false;
qte:number=1;
userid:string="";
id:string="";
Product:Products;
cartproducts:Products[]=[];
compareprod:Products[]=[];
count:number=0;
ratescore:number=0;
avis:boolean=false;
postdata:{
  productid:string,
  clientid:string,
  alreadygave:boolean
}
  constructor(private route:ActivatedRoute,public productservice:ProductsService,private toaster:ToastrService,public diag:MatDialog,public userservice:UsersService,private router:Router) { }
 async ngOnInit(): Promise<void> {
  await  this.GetProductId()
  await this.getuserid()
  this.postdata={
    clientid:this.userid,
     productid:this.id,
     alreadygave:false
  }
    this.userloggedin()
    this.Product={
      nom:null,
      imageString:null,
      id:null,
      description:null,
      date:null,
      idPharmacien:null,
      prix:null,
      tva:null,
      qte:null,
      categorie:null
    }
    this.userservice.postnewopinion={
      id:0,
      stars:0,
      idProduit:0,
      idClient:null,
      message:null,
    }
    await this.GetProductById()
    try{
    if (JSON.parse(localStorage.getItem("cart")).length!=null){
      this.count=JSON.parse(localStorage.getItem("cart")).length;
    }
    } catch{
    console.log("cart is empty")
    }
    this.IsCompare()
  }
  IsCompare(){
    if ((JSON.parse(localStorage.getItem("compare")).length!=null) || (JSON.parse(localStorage.getItem("compare")).length!=undefined))
this.compareprod=JSON.parse(localStorage.getItem("compare"))
this.compareprod.forEach(prod=>{
  if (prod.id.toString()==this.id){
    this.incompare=true;
    this.textchange="Supprimer de comparateur"
    }
})
      }
GetProductId(){
  this.route.paramMap.subscribe({
    next:(params)=>{
     this.id= params.get("id");}})
}
GetProductById(){
  this.productservice.GetProductByIdPh(this.id).toPromise().then(
    (res:any)=>{
    this.Product=res;
    
  })
}
addtocart(){
 if ((this.qte>=1) && (this.qte<=100)){
  if (this.id!=null){
    this.productservice.GetSingleProductById(this.id).subscribe({
      next:(res:any)=>{
        if ("cart" in localStorage){
          this.cartproducts=JSON.parse(localStorage.getItem("cart"))
         for(let i=1;i<=this.qte;i++){
          this.cartproducts.push(res);
         }
          localStorage.setItem("cart",JSON.stringify(this.cartproducts))
          this.toaster.success("Produit ajouté dans le panier !")
          this.count=JSON.parse(localStorage.getItem("cart")).length;
         }
         else{
          for(let i=1;i<=this.qte;i++){
            this.cartproducts.push(res);
           }
          localStorage.setItem("cart",JSON.stringify(this.cartproducts))
          this.toaster.success("Produit ajouté dans le panier !")
          this.count=JSON.parse(localStorage.getItem("cart")).length;
         }
      }
    })
  }
}
}
rate(){
if (this.avis==false){ //new opinion
if (this.gaveopinion==false){
this.userservice.postnewopinion={
  id:0,
  idClient:this.userid,
  idProduit:Number(this.id),
  stars:this.ratescore,
  message:null
}
this.userservice.postopinion().subscribe({
  next:(res:any)=>{
    this.toaster.success("Merci Pour Votre Avis !")
    this.avis=true;
    this.gaveopinion=true;
  }
})
}
}
}
async getmyscore(){
await this.userservice.Gaveopinion(this.id,this.userid).toPromise().then(
  res=>{
    if (res==true){ //utilisateur a deja un opinion
      this.gaveopinion=true;
      this.postdata.alreadygave=true;
      var formElement = <HTMLFormElement>document.getElementById('feedback');
formElement.style.display='none';
formElement.style.visibility="hidden";
     this.userservice.Getopinionsingleproduct(this.id,this.userid).subscribe({
      next:(res:any)=>{
        if(res.stars==0){
          this.avis=false;
        }
        else
        {
          this.avis=true;
        }
        this.ratescore=res.stars
      }
     })
    }
    else{
      this.avis=false;
      this.gaveopinion=false
    }
  }
)
}
userloggedin(){
  if (localStorage.getItem("token")==null){
    this.ratescore=0;
    this.avis=true;
  }
  else{
    this.getmyscore()
  }
}
async getuserid(){
  if (localStorage.getItem("token")!=null){
  await this.userservice.getUserId().toPromise().then(
    (res:any)=>{
      this.userid=res.id
    }
  )
  }
}
feedback(){
  if (localStorage.getItem("token")==null){
    this.router.navigate(["login"])
  }
  else{
  let dialogConfig = new MatDialogConfig();
  dialogConfig.data=this.postdata;
  dialogConfig.width="540px";
 this.diag.open(FeedbackComponent,dialogConfig)
  }
}
addtocompare(){
  if (this.incompare==false){
 this.productservice.GetSingleProductById(this.id).subscribe({
  next:(res:any)=>{
    if("compare" in localStorage){
      this.compareprod=JSON.parse(localStorage.getItem("compare"))
      this.compareprod.push(res)
      localStorage.setItem("compare",JSON.stringify(this.compareprod))
      this.incompare=true;
      this.textchange="Supprimer de comparateur"
    }
    else{
      this.compareprod.push(res)
      localStorage.setItem("compare",JSON.stringify(this.compareprod))
      this.incompare=true;
      this.textchange="Supprimer de comparateur"
    }
  }
 })
}
if (this.incompare==true){
  this.compareprod=JSON.parse(localStorage.getItem("compare"))
  this.compareprod.forEach((element,index)=>{
    if (element.id==Number(this.id)){
    this.compareprod.splice(index,1)
    }
  })
localStorage.setItem("compare",JSON.stringify(this.compareprod))
this.textchange="Comparer"
this.incompare=false;
}
}
opencompare(){
  let dialogConfig = new MatDialogConfig();
  dialogConfig.width="100%"
  dialogConfig.maxHeight="100%"
 this.diag.open(CompareComponent,dialogConfig)
}
}