import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { RegistrationnService } from '../registrationn.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginMessage={message : ""};

  user: FormGroup;
  constructor(private fb: FormBuilder, private service: RegistrationnService) { }

  ngOnInit() {
  this.user = this.fb.group({
    email : [''],
    password : ['']
  });

  }
  onSubmit() {
    const email = this.user.get('email').value;
    const pass = this.user.get('password').value;
    const Data ={
      email : email,
      password :pass
    }
    const userData = JSON.stringify(Data);
    this.service.register(userData)
    .subscribe(Response =>{
      this.loginMessage= {message :Response.message};
      console.log( "Success", Response)
    },
    error =>{
      console.log("Failed", error)
    })

  }

}
