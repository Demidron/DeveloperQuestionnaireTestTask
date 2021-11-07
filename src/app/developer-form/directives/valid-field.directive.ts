import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidField]'
})
export class ValidFieldDirective {

  constructor(private control: NgControl) { }
  @HostBinding('class.is-invalid') get invalid() { return this.control.invalid &&this.control.touched; }
  @HostBinding('class.is-valid') get valid() { return this.control.valid; }
}
