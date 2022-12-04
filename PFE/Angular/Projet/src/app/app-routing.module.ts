import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './admindashboard/add-user/add-user.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EdituserComponent } from './admindashboard/edituser/edituser.component';
import { MsgComponent } from './admindashboard/msg/msg.component';
import { AuthGuard } from './Auth/auth.guard';
import { AvisComponent } from './avis/avis.component';
import { CartComponent } from './cart/cart.component';
import { FactureComponent } from './cart/facture/facture.component';
import { CompareComponent } from './compare/compare.component';
import { AddProductComponent } from './fournisseurdashboard/add-product/add-product.component';
import { CommandesComponent } from './fournisseurdashboard/commandes/commandes.component';
import { SinglecommandeComponent } from './fournisseurdashboard/commandes/singlecommande/singlecommande.component';
import { EditProductComponent } from './fournisseurdashboard/edit-product/edit-product.component';
import { FournisseurComponent } from './fournisseurdashboard/fournisseur/fournisseur.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddproductComponent } from './pharmaciendashboard/addproduct/addproduct.component';
import { AvisClientsComponent } from './pharmaciendashboard/avis-clients/avis-clients.component';
import { MyProductsComponent } from './pharmaciendashboard/my-products/my-products.component';
import { ProductphComponent } from './pharmaciendashboard/my-products/productph/productph.component';
import { PharmacienComponent } from './pharmaciendashboard/pharmacien/pharmacien.component';
import { ProductFrComponent } from './pharmaciendashboard/product-fr/product-fr.component';
import { BeauteComponent } from './products/beaute/beaute.component';
import { BienEtreComponent } from './products/bien-etre/bien-etre.component';
import { ProductsComponent } from './products/products.component';
import { SanteComponent } from './products/sante/sante.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin",component:AdmindashboardComponent,canActivate:[AuthGuard],data:{permittedRoles:["Admin"]}},
  {path:"admin/AddUser",component:AddUserComponent,canActivate:[AuthGuard],data:{permittedRoles:["Admin"]}},
  {path:"admin/messages",component:MsgComponent,canActivate:[AuthGuard],data:{permittedRoles:["Admin"]}},
  {path:"admin/EditUser/:id",component:EdituserComponent,canActivate:[AuthGuard],data:{permittedRoles:["Admin"]}},
  {path:"pharmacien",component:PharmacienComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"fournisseur",component:FournisseurComponent,canActivate:[AuthGuard],data:{permittedRoles:["Fournisseur"]}},
  {path:"avis",component:AvisComponent},
  {path:"fournisseur/AddProduct",component:AddProductComponent,canActivate:[AuthGuard],data:{permittedRoles:["Fournisseur"]}},
  {path:"fournisseur/EditProduct/:id",component:EditProductComponent,canActivate:[AuthGuard],data:{permittedRoles:["Fournisseur"]}},
  {path:"products",component:ProductsComponent},
  {path:"pharmacien/productsfr/:id",component:ProductFrComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"pharmacien/addProduct/:id",component:AddproductComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"pharmacien/myProducts",component:MyProductsComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"pharmacien/myProducts/Product/:id",component:ProductphComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"pharmacien/avis-clients",component:AvisClientsComponent,canActivate:[AuthGuard],data:{permittedRoles:["Pharmacien"]}},
  {path:"products/product/:id",component:SingleProductComponent},
  {path:"compare",component:CompareComponent},
  {path:"cart",component:CartComponent},
  {path:"cart/facture",component:FactureComponent},
  {path:"beaute",component:BeauteComponent},
  {path:"sante",component:SanteComponent},
  {path:"BienEtre",component:BienEtreComponent},

  {path:"fournisseur/commandesclient",component:CommandesComponent,canActivate:[AuthGuard],data:{permittedRoles:["Fournisseur"]}},
  {path:"fournisseur/commandesclient/commande/:id",component:SinglecommandeComponent,canActivate:[AuthGuard],data:{permittedRoles:["Fournisseur"]}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: "home", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
