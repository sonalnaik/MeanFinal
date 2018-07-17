import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private loginservice:LoginService) { }
  private companyData=[];private editData=[];
  model:any ={};

  ngOnInit() {
    
  }

  saveData(){
    this.loginservice.saveCompany(this.model.company,this.model.contact,this.model.country).
    subscribe(
      (data:any={})=>{
        if(data.res =='success'){
          console.log('data saved');
        }
      }
    )
  }

  
}
