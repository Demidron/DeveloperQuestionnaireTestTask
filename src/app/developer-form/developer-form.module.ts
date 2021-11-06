import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperFormPageComponent } from './pages/developer-form-page/developer-form-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeveloperFormPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'dev-form'},
      {path:'dev-form',component:DeveloperFormPageComponent},
    ])
  
  ]
})
export class DeveloperFormModule { }
