import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes:{
    id:number,
    date:string,
    prixtotal:number,
    etat:string,
    idClient:string
  }[]=[];
  constructor(public productservice:ProductsService,public userservice:UsersService) { }

  ngOnInit(): void {
    this.GetAllCommandes()
  
  }
GetAllCommandes(){
  this.productservice.GetALLCommandes().subscribe({
    next:(res:any)=>{
this.commandes=res;

    }
  })
  
}
}
