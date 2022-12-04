import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Products } from 'src/app/Services/products.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit,OnDestroy {
  @ViewChild("content",{static:true}) content!:ElementRef
Products:Products[]=[];
client:{
  nom:string,
  prenom:string,
  tel:string
}
today:string="";
  constructor(private router:Router) { }
ngOnDestroy(): void {
  localStorage.removeItem("infos")
  localStorage.removeItem("facture")
}
  ngOnInit(): void {
    const today=new Date()
    this.today=today.toDateString()
    if ("facture" in localStorage){
      this.client={
        nom:null,
        prenom:null,
        tel:null
      }
      this.client=JSON.parse(localStorage.getItem("infos"))
    this.Products=JSON.parse(localStorage.getItem("facture"))
    }
    else
    {
   this.router.navigate(["products"])
    }
  }
calcultotaleachproduct(prix:number,qte:number){
  return prix*qte;
}
calcultotal(){
  var total=0;
  this.Products.forEach(product=>{
   total=total+this.calcultotaleachproduct(product.prix,product.qte)
  })
  return total;
}
PDF(){
  var element=document.getElementById("content")
  element.style.width="800px";
  element.style.height='1200px';
  html2canvas(this.content.nativeElement).then(canvas => {
    // Few necessary setting options

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'px', 'letter'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save('Facture.pdf'); // Generated PDF
    });
    element.style.width="auto"
    element.style.height="auto"
}
}
