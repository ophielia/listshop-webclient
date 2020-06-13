import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  // Form Validator
  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  get name() {
    return this.contactForm.get('name') as FormControl;
  }
  get phone() {
    return this.contactForm.get('phone') as FormControl;
  }
  get email() {
    return this.contactForm.get('email') as FormControl;
  }
  get message() {
    return this.contactForm.get('message') as FormControl;
  }

  send() {
    console.log(this.contactForm.value);
  }
}
