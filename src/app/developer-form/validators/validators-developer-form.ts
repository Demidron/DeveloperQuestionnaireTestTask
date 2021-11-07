import { AbstractControl, FormControl } from "@angular/forms";
import { DataProviderService } from "../service/data-provider.service";

export class ValidatorsDeveloperForm {
  
  static createValidatorEmailNotTaken(dataProv: DataProviderService) {
    return (control: AbstractControl) => {
      return new Promise<{emailTaken: boolean;} | null>(
        (resolve) => {
          setTimeout(() => {
            dataProv.checkEmail().subscribe(result=>{
              let res=(result as {registeredEmails:string[]}).registeredEmails.includes(control.value) ? {emailTaken: true} : null;
              resolve(res ? {emailTaken: true} : null);
            })
          }, 2000);
        }
      );
    }
  }
}