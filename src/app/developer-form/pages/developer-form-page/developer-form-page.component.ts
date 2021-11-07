import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NamesFields } from '../../enums/names-fields';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { DataProviderService } from '../../service/data-provider.service';
import { Technology } from '../../models/technology.model';
import { ValidatorsDeveloperForm } from '../../validators/validators-developer-form';
import { FrontEndDeveloper } from '../../models/front-end-developer.model';
import { Hobbie } from '../../models/hobbie.model';
@Component({
  selector: 'app-developer-form-page',
  templateUrl: './developer-form-page.component.html',
  styleUrls: ['./developer-form-page.component.css']
})
export class DeveloperFormPageComponent implements OnInit {

  public devForm:FormGroup;
  public iconNames = IconNamesEnum;
  public hobbieMonthRange:number=11;
  public hobbieYearsRange:number=5;
  public technologies:Technology[]=[];
  public selectedTechnology:Technology=new Technology();
  constructor(private fb: FormBuilder,private calendar: NgbCalendar,private dataProv:DataProviderService) {}
  //  model?: NgbDateStruct;

  ngOnInit(): void {
    this.devForm=this.createForm();
    this.addSubscribers();
  }

  get hobbies() { return (this.devForm.get('hobbies') as FormArray);}
  getEamilControlError() {
    const control = this.devForm.controls[NamesFields.EMAIL];
    return control.touched && control.errors && control.errors.emailTaken;
  }


  createForm(){
    return this.fb.group({
      [NamesFields.FIRSTNAME]:[null, Validators.required],
      [NamesFields.LASTNAME]:[null, Validators.required],
      [NamesFields.DBDATEPICKER]:[null, Validators.required],
      [NamesFields.EMAIL]:[null, [Validators.required, Validators.email],ValidatorsDeveloperForm.createValidatorEmailNotTaken(this.dataProv)],
      [NamesFields.SELECTJSFRAMEWORK]:[null,Validators.required],
      [NamesFields.SELCTVERSION]:[{value:'',disabled: true},[Validators.required,  Validators.minLength(1)]],
      hobbies:this.fb.array([this.getHobbie()])
    })
  }
  addSubscribers(){
    this.dataProv.getTechnologies().subscribe(res=>{
      
      let v=Object.values(res);
      let k=Object.keys(res)

      for (let index = 0; index <  v.length; index++) {
        this.technologies.push({name:k[index],versions:v[index]})
      }
    },err=>{
      console.log(err);
    })

    this.devForm.controls[NamesFields.SELECTJSFRAMEWORK].valueChanges.subscribe((obj:Technology)=>{
      this.devForm.controls[NamesFields.SELECTJSFRAMEWORK].valid ?
      this.devForm.controls[NamesFields.SELCTVERSION].enable() :
      this.devForm.controls[NamesFields.SELCTVERSION].disable();
      this.selectedTechnology=obj as Technology;
      this.devForm.controls[NamesFields.SELCTVERSION].setValue(undefined);
    });
  }
  getHobbie(){
    this.iconNames.PlusCircle
    return this.fb.group({
      inputHobbyName: ['', Validators.required],
      selectHobbyDuration: ['', Validators.required],
    })
  }
  deleteHobbieClick(i:number){
    if(this.hobbies.length<2){
      alert("Please enter at least one hobby");
      return;
    }
    this.hobbies.removeAt(i);
  }
  addHobbieClick(){
    this.hobbies.push(this.getHobbie());
    
  }
  onSubmit() {
    let hobbiesMas: Hobbie[]=[];
    (this.hobbies.value as any[]).forEach(element => {
      hobbiesMas.push({name:element.inputHobbyName, duration:element.selectHobbyDuration})
    });
 
    let formInfo:FrontEndDeveloper={
      firstName:this.devForm.controls[NamesFields.FIRSTNAME].value,
      lastName:this.devForm.controls[NamesFields.LASTNAME].value,
      dateOfBirth:this.devForm.controls[NamesFields.DBDATEPICKER].value,
      email:this.devForm.controls[NamesFields.EMAIL].value,
      framework:this.devForm.controls[NamesFields.SELECTJSFRAMEWORK].value.name,
      frameworkVersion:this.devForm.controls[NamesFields.SELCTVERSION].value,
      hobbies:hobbiesMas
    }
    console.log(formInfo);
    alert("See consol log");
  }

}
