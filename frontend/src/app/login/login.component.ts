import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']        
})
export class LoginComponent implements OnInit {
  model:any ={};
  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
  }

  login(){
    var username = this.model.username;
    var password = this.model.password;
   
    this.loginservice.handleLogin(username,password).
    subscribe(
      (data:any=[])=>{
        if(data.res =='success'){
            console.log('logged In successfully!!');
            console.log(data.username +"--"+data.password);
              localStorage['username']=data.username;
              localStorage['password']=data.password;
              this.router.navigate(['dashboard']); 
        }else{
          console.log('login failed'); 
        }
      }
      
    )
  }
}
