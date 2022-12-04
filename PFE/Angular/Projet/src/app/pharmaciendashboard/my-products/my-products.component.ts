import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { Products } from 'src/app/Services/products.model';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
myid:string="";
Products:Products[]=[];
  constructor(public userservice:UsersService,public productservice:ProductsService) { }

  async ngOnInit(): Promise<void> {
await this.GetMyId();
this.GetMyProducts();
  }
  async GetMyId(){
    await  this.userservice.getUserId().toPromise().then(
       (res:any)=>{
   this.myid=res.id;
       }
     )
   }
   GetMyProducts(){
    this.productservice.GetMyProductsById(this.myid).subscribe({
      next:(res:any)=>{
         this.Products=res;
         this.Products.forEach(prod=>{
          var date=new Date(prod.date).toISOString().slice(0,10);
          prod.date=date;
         })
      }
    })
   }
}
