import { Component, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../passMatchValidator';
import { CardService } from '../../services/card.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(NonNullableFormBuilder)
constructor(private cardServ: CardService , private router: Router) {}
 regietForm = this.fb.group({
  name: ['', [Validators.required,Validators.minLength(3)]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]],
}, {validators: passwordMatchValidator})

showData() {
  console.log(this.regietForm.value);
}
onSubmit(){
  if(this.regietForm.valid){
   this.cardServ.register(this.regietForm.value).subscribe({         //nonnullableFormBulder//
    next:() => {
      alert("Registration successful!")
      this.router.navigate(['/login'])
    },
    error: (err) => {
      console.log('error', err);
      alert('Registration failed. Try again.')
    }

   })
  }else{
    console.log("form not valid");
  }
}

}
