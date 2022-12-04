import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { UsersForAdmin } from 'src/app/Services/users-for-admin.model';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
msg:string;
  constructor(@Inject(MAT_DIALOG_DATA) private data:any,private dialogRef: MatDialogRef<FeedbackComponent>,private router:Router,public userservice:UsersService,private toaster:ToastrService) { 
  }

  ngOnInit(): void {
    this.msg=null;
    if (localStorage.getItem("token")==null){
   this.router.navigate(["login"])
    }
  }
closedialog(){
 this.dialogRef.close()
}
submit(){
  if (this.data.alreadygave==true){
   this.toaster.warning("Vous avez déjà donné un avis sur ce produit !")
   this.closedialog()
  }
  else
  {
    this.userservice.postnewopinion={
      id:0,
      stars:0,
      idProduit:this.data.productid,
      idClient:this.data.clientid,
      message:this.msg
    }
    this.userservice.postopinion().subscribe({
      next:(res)=>{
       this.toaster.success("Message Envoyé !")
       this.closedialog()
      }
    })
  }
}
}