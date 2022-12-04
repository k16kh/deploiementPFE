import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddUserComponent } from './admindashboard/add-user/add-user.component';
import { EdituserComponent } from './admindashboard/edituser/edituser.component';
import { PharmacienComponent } from './pharmaciendashboard/pharmacien/pharmacien.component';
import { FournisseurComponent } from './fournisseurdashboard/fournisseur/fournisseur.component';
import { AvisComponent } from './avis/avis.component';
import {DataTablesModule} from "angular-datatables";
import { AddProductComponent } from './fournisseurdashboard/add-product/add-product.component';
import { EditProductComponent } from './fournisseurdashboard/edit-product/edit-product.component';
import { AngularPaginatorModule } from 'angular-paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProductsComponent } from './products/products.component';
import { ProductFrComponent } from './pharmaciendashboard/product-fr/product-fr.component';
import { AddproductComponent } from './pharmaciendashboard/addproduct/addproduct.component';
import { MyProductsComponent } from './pharmaciendashboard/my-products/my-products.component';
import { ProductphComponent } from './pharmaciendashboard/my-products/productph/productph.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cart/cart.component';
import { CommandesComponent } from './fournisseurdashboard/commandes/commandes.component';
import { SinglecommandeComponent } from './fournisseurdashboard/commandes/singlecommande/singlecommande.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {MatDialogModule} from '@angular/material/dialog';
import { FeedbackComponent } from './products/single-product/feedback/feedback.component';
import { AvisClientsComponent } from './pharmaciendashboard/avis-clients/avis-clients.component';
import { MsgComponent } from './admindashboard/msg/msg.component';
import { CompareComponent } from './compare/compare.component';
import { VentesComponent } from './pharmaciendashboard/pharmacien/ventes/ventes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FactureComponent } from './cart/facture/facture.component';
import {NgxPrintModule} from 'ngx-print';

import {MatSelectModule} from '@angular/material/select';


import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BeauteComponent } from './products/beaute/beaute.component';
import { SanteComponent } from './products/sante/sante.component';
import { BienEtreComponent } from './products/bien-etre/bien-etre.component'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    AdmindashboardComponent,
    AddUserComponent,
    EdituserComponent,
    PharmacienComponent,
    FournisseurComponent,
    AvisComponent,
    AddProductComponent,
    EditProductComponent,
    ProductsComponent,
    ProductFrComponent,
    AddproductComponent,
    MyProductsComponent,
    ProductphComponent,
    SingleProductComponent,
    CartComponent,
    CommandesComponent,
    SinglecommandeComponent,
    FeedbackComponent,
    AvisClientsComponent,
    MsgComponent,
    CompareComponent,
    VentesComponent,
    FactureComponent,
    BeauteComponent,
    SanteComponent,
    BienEtreComponent,
  ],
  entryComponents:[FeedbackComponent],
  imports: [
  
    SelectDropDownModule,

    MatSelectModule,    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatPaginatorModule,
    CommonModule,
    NgxStarRatingModule,
    DataTablesModule,
    NgxPrintModule,
    ReactiveFormsModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  AngularPaginatorModule, FontAwesomeModule,



  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
