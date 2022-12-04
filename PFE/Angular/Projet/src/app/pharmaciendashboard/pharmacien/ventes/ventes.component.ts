import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.css']
})
export class VentesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public diagref:MatDialogRef<VentesComponent>) { }

  ngOnInit(): void {
   console.log(this.data)
  }
closedialog(){
  this.diagref.close()
}
}
