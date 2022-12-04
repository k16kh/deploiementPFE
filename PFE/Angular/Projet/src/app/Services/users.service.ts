import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FournisseurModel } from './fournisseur-model.model';
import { ProductsFournisseur } from './products-fournisseur.model';
import { UsersForAdmin } from './users-for-admin.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
url="http://localhost:25876/api"; //change after hosting
users:UsersForAdmin[]=[];
prod:ProductsFournisseur;
postnewopinion:{
  id:number,
  stars:number,
  idProduit:number,
  idClient:string,
  message:string
}
avis:{
  Id:number,
  idClient:string,
  Description:string,
  Date:string
}
newuser:{ //register new user infos
 Nom:string,
 Prenom:string,
 Password:string,
 Email:string,
 Date_naissance:string,
 Adresse:string,
 Sexe:string,
 PhoneNumber:string,
};
newuseradmin:{
  Nom:string,
 Prenom:string,
 Password:string,
 Email:string,
 Date_naissance:string,
 Adresse:string,
 Sexe:string,
 PhoneNumber:string,
 Role:string,
 DateFin:Date
}
edituseradmin:{
  Nom:string,
 Prenom:string,
 Email:string,
 Date_naissance:string,
 Adresse:string,
 Sexe:string,
 PhoneNumber:string,
 Role:string,
 DateFin:Date
}
loginuserAuth:{
  Email:string,
  Password:string
}
  constructor(private http:HttpClient,private toaster:ToastrService) { 
  }
  //controle de saisie:
  verif(cpassword:string){
    const nameregex=new RegExp(/^[a-zA-Z ]+$/);
    const mailregex=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
     if ((this.newuser.Nom == null) || (this.newuser.Prenom==null) || (this.newuser.Adresse==null) || (this.newuser.Date_naissance==null) || (this.newuser.Email==null) || (this.newuser.Password==null) || (this.newuser.PhoneNumber==null) || (this.newuser.Sexe==null)){
      this.toaster.error("Veuillez vérifier les champs svp !","Erreur");
      return false;
     }
      if ((nameregex.test(this.newuser.Nom)==false) || (this.newuser.Nom.length<=3)){
      this.toaster.error("Veuillez saisir un nom valide !");
      this.newuser.Nom="";
      return false;
    }
    if ((nameregex.test(this.newuser.Prenom)==false) || (this.newuser.Prenom.length<=4)){
      this.toaster.error("Veuillez saisir un prénom valide !");
      this.newuser.Prenom="";
      return false;
  }
  if (mailregex.test(this.newuser.Email)==false){
    this.toaster.error("Veuillez saisir une adresse mail valide !");
    this.newuser.Email="";
    return false;}
    if (this.newuser.Password.length<=8){
      this.toaster.error("Veuillez saisir un mot de passe valide !");
      this.newuser.Password="";
      return false;
}
if (this.newuser.Password!=cpassword){
  this.toaster.error("La confirmation de mot de passe est invalide !");
  this.newuser.Password="";
  cpassword="";
  return false;
}
var current=new Date()
var date=new Date(this.newuser.Date_naissance);
if (((current.getFullYear()-date.getFullYear()) <= 12) || date.getFullYear()<=1900)  //age condition changeable 
 {
  this.toaster.error("L'âge minimum pour l'inscription est 12");
  this.newuser.Date_naissance=null;
  return false;
} 
return true;
  }
  veriflogin(){
    const mailregex=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if ((this.loginuserAuth.Email==null) || (this.loginuserAuth.Password)){
      this.toaster.error("Veuillez remplir tous les champs !","Erreur");
      return false;
    }
    if (mailregex.test(this.loginuserAuth.Email)==false){
      this.toaster.error("Veuillez saisir une adresse mail valide !");
      this.loginuserAuth.Email="";
    return false;
    }
    return true;
  }
  registerUser(){
    return this.http.post(this.url+"/AppUsers/Register",this.newuser);
  }
  loginUser(){
    return this.http.post(this.url+"/AppUsers/Login",this.loginuserAuth)
  }
  getUserId(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/UserProfile/UserId",{headers : tokenHeader});
  }
  getUserinfos(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.url+"/UserProfile/UserInfos",{headers : tokenHeader});
  }
  roleMatch(allowedRoles):boolean{ //verifacation role
    var isMatch=false;
    var payload=JSON.parse(window.atob(localStorage.getItem("token").split(".")[1]));
    var userRole=payload.role;
    allowedRoles.forEach(element =>{
      if (userRole==element){
      isMatch=true;
      return false;
      }
      return isMatch;
      });
    return isMatch;      
    }
    adminGetallusers():Observable<UsersForAdmin[]>{
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
     return  this.http.get<UsersForAdmin[]>(this.url+"/UserProfile/GetUsersbyAdmin",{headers : tokenHeader});
    }
    registerbyAdmin(){
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
     return  this.http.post(this.url+"/AppUsers/CreateClientByAdmin",this.newuseradmin,{headers : tokenHeader});
    }
    getUserbyId(id:string):Observable<UsersForAdmin>{
     return this.http.get<UsersForAdmin>(this.url+"/AppUsers/"+id);
    }
    editUserbyId(id:string,updateuser:UsersForAdmin):Observable<UsersForAdmin>{
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
       return this.http.put<UsersForAdmin>(this.url+"/AppUsers/"+id , updateuser,{headers : tokenHeader});
    }
    deleteUserbyId(id:string):Observable<UsersForAdmin>{
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
      return this.http.delete<UsersForAdmin>(this.url+"/AppUsers/"+id,{headers : tokenHeader})
    }
    sendavis(){
      this.avis.Id=0;
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
      return this.http.post(this.url+"/AspNetUsersAvis",this.avis,{headers : tokenHeader})
    }
    Gaveopinion(idprod:string,idclient:string){
      return this.http.get(this.url+"/AspNetUsersAvisProducts/GaveOpinion?idprod="+idprod+"&idclient="+idclient)
    }
    Getopinionsingleproduct(idprod:string,idclient:string){
return this.http.get(this.url+"/AspNetUsersAvisProducts/GetInfosByBothId?idprod="+idprod+"&idclient="+idclient)
    }
    postopinion(){
      this.postnewopinion.id=0;
      return this.http.post(this.url+"/AspNetUsersAvisProducts",this.postnewopinion)
    }
  
    Getallcomments(){   //consulter les messages des produits de pharmacien
      return this.http.get(this.url+"/AspNetUsersAvisProducts/GetAvisByPh")
    }
    Deletemessagebyidandmessage(id:number,message:string){
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
      return this.http.delete(this.url+"/AspNetUsersAvisProducts/DeleteAvisByIdProduct?idprod="+id+"&message="+message,{headers : tokenHeader})
    }
    GetClientNameById(id:string){
      return this.http.get(this.url+"/UserProfile/GetClientNameById?id="+id)
    }
    Getallmessagesforadmin(){
      return this.http.get(this.url+"/AspNetUsersAvis")
    }
    Deletemessagebyadmin(id:number){
     return this.http.delete(this.url+"/AspNetUsersAvis/"+id)
    }
    DeleteAllMessagesByAdmin(){
      var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
      return this.http.delete(this.url+"/AspNetUsersAvis/Deleteallbyadmin",{headers : tokenHeader})
    }
    //Fournisseur methods
   GetAllProductsByFournisseurId(id:string):Observable<ProductsFournisseur[]>{
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get<ProductsFournisseur[]>(this.url+"/AspNetProductsFrs/GetAspNetProductsFrsbyId/?id="+id,{headers : tokenHeader})
   }
   GetAllFournisseur():Observable<FournisseurModel[]>{
  var  tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
  return this.http.get<FournisseurModel[]>(this.url+"/UserProfile/GetAllFournisseurs",{headers:tokenHeader})
   }
}
