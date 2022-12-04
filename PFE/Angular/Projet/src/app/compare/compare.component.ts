import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VirtualTimeScheduler } from 'rxjs';
import { Products } from '../Services/products.model';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
Products:Products[]=[];
  constructor(private router:Router,private toaster:ToastrService,private dialogRef: MatDialogRef<CompareComponent>) { }

  ngOnInit(): void {
    this.getproducts()
  }
  getproducts(){
    if((localStorage.getItem("compare")==null)){
       this.toaster.warning("La Liste est vide !")
       this.closedialog()
    }
    else {
      if((JSON.parse(localStorage.getItem("compare"))).length==1 || (((JSON.parse(localStorage.getItem("compare"))).length==undefined))){
        this.router.navigate(["products"])
        this.toaster.warning("Un minimum de 2 produits sont nécessaires à la comparaison des produits.")
        this.closedialog()
      }
      else{
       this.Products=  JSON.parse(localStorage.getItem("compare"))
       console.log(this.Products)
      }
    }
  }
closedialog(){
this.dialogRef.close()
}
navigate(id:number){
this.router.navigate(["/products/product/",id])
this.dialogRef.close()
setTimeout(() => 
{
    window.location.reload()
},
50);
}
deleteall(){
  localStorage.removeItem("compare")
  this.router.navigate(["/products"])
  this.dialogRef.close()
}
}
