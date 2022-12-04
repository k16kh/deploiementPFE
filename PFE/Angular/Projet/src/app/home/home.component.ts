import { Component, OnInit } from '@angular/core';
import { Products } from '../Services/products.model';
import { ProductsService } from '../Services/products.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
Products:Products[]=[];
  constructor(public service:UsersService,public productservice:ProductsService) { }

  ngOnInit(): void {
    this.GetProducts()
  }
  
async GetProducts(){
await this.productservice.GetAllProducts().toPromise().then(
  (res:any)=>{
   this.Products=res;
  }
)
}

}
