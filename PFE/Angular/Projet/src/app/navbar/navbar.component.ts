import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangestatusService } from '../Services/changestatus.service';
import { Products } from '../Services/products.model';
import { ProductsService } from '../Services/products.service';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  search:string="";
  myControl = new FormControl('');
  options: string[]= [];
  filteredOptions: Observable<string[]>;
  Products:Products[]=[];
  constructor(public change:ChangestatusService,private router:Router,public productservice:ProductsService) { }
 async  ngOnInit(): Promise<void> {

    this.change.changeloggedin();
    this.change.changestyleadmin();
    this.change.changestylefournisseur();
    this.change.changestylepharmacien();
   
 await    this.GetProducts()
this.Products.forEach(prod=>{
  this.options.push(prod.nom)
})
   this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("compare")
    this.change.changeloggedin();
    this.router.navigateByUrl("/home");
   window.location.reload();
  }
  async GetProducts(){
    await this.productservice.GetAllProducts().toPromise().then(
      (res:any)=>{
       this.Products=res;
      }
    )
  }
navigate(){
this.Products.forEach( async prod=>{
  if (prod.nom==this.search){
    this.router.navigate(["products","product",prod.id])
    await new Promise(f => setTimeout(f, 200));
    window.location.reload()
  }
})
}
 async nav(object){
var id=0;
this.Products.forEach(prod=>{
  if (prod.nom==object.option.value){
 id=prod.id;
  }
})
this.router.navigate(["products","product",id])
await new Promise(f => setTimeout(f, 200));
window.location.reload()
}
toggle(){

var elements=document.getElementsByName("toggle-li")
for(let i=0;i<=elements.length;i++){
 if( elements[i].style.display=='none'){
  elements[i].style.display='block';
 }
 else{
  elements[i].style.display='none';
 }
}
const navlinks=document.getElementsByClassName("nav-items")[0];
navlinks.classList.toggle("active")
}
}
