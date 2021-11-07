import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperFormPageComponent } from './pages/developer-form-page/developer-form-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidFieldDirective } from './directives/valid-field.directive';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DeveloperFormPageComponent,
    ValidFieldDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'dev-form'},
      {path:'dev-form',component:DeveloperFormPageComponent},
    ])
  
  ]
})
export class DeveloperFormModule { }
