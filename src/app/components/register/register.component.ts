import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Country } from 'src/app/_types/Country.enum';
import { Gender } from 'src/app/_types/Gender.enum';
import { User } from '../../_models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  countryType = Object.values(Country).filter(value => typeof value === 'number');
  countryString: typeof Country = Country;
  genderType = Object.values(Gender).filter(value => typeof value === 'number');
  genderString: typeof Gender = Gender;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-green'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.\s_-]+$'),
      Validators.minLength(6), Validators.maxLength(35)]],
      password: ['', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'),
        Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', [Validators.minLength(2), Validators.maxLength(35),
        Validators.required, Validators.pattern('^[A-Za-z.\s_-]+$')]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(35),
        Validators.required, Validators.pattern('^[A-Za-z.\s_-]+$')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      knownAs: ['', [Validators.minLength(2), Validators.maxLength(35),
        Validators.required, Validators.pattern('^[A-Za-z.\s_-]+$')]],
      city: ['', [Validators.minLength(2), Validators.maxLength(35),
        Validators.required, Validators.pattern('^[A-Za-z.\s_-]+$')]],
      stateProv: ['', [Validators.minLength(2), Validators.maxLength(35),
        Validators.required, Validators.pattern('^[A-Za-z.\s_-]+$')]],
      country: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration succesful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
