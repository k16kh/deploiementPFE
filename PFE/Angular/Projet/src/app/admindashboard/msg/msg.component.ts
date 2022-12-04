import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
 apilist:{
  date:string,
  description:string,
  id:number,
  idClient:string
 }[]=[];
 list:any=[];
  constructor(public userservice:UsersService,private toaster:ToastrService,private router:Router) { }

 async ngOnInit(): Promise<void> {
   await this.getmessages()
  await   this.setlist()
  if (this.apilist.length==0){
    var element=document.getElementById("deletebt")
    element.style.visibility="hidden";
    element.style.display="none";
  }
  }
async getmessages(){
 await this.userservice.Getallmessagesforadmin().toPromise().then(
  (res:any)=>{
    this.apilist=res
this.apilist.forEach(l=>{
  var date= new Date(l.date).toISOString().slice(0,10)
  l.date=date;
})
  }
  )
}
async setlist(){
  await this.apilist.forEach(msg=>{
   this.getclientname(msg.idClient).then(
      (res:any)=>{
        this.list.push({
          nomclient:res.nom + " " + res.prenom,
          tel:res.tel,
          message:msg.description,
          date:msg.date,
          id:msg.id
        })
      }
    )
  })
}
getclientname(id:string){
  return this.userservice.GetClientNameById(id).toPromise()
  }
  deleteitem(id:number){
   this.userservice.Deletemessagebyadmin(id).subscribe({
    next:(res:any)=>{
      this.toaster.success("Message Supprimé !")
     window.location.reload()
    }
   })
  }
  deleteall(){
    this.userservice.DeleteAllMessagesByAdmin().subscribe({
      next:(res:any)=>{
  this.toaster.success("Tous les messages sont supprimés !")
  this.router.navigate(["admin"])
      }
    })
  }
}
