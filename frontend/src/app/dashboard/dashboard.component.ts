
import { Component, OnInit, Input, HostListener } from '@angular/core';
import {LoginService} from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginservice:LoginService,private router:Router) { }
  private companyData=[];private editData=[];
  @Input() model: any ={}; 
  ngOnInit() {
    this.allCompany();
    this.model.company='sonal';
  }

   allCompany(){
    this.companyData=[];
    this.loginservice.allCompany().
    subscribe(
      (data:any[])=>{
        console.log(data['data'].length);
         for(let i=0;i< data['data'].length;i++){
           
            this.companyData.push({'id':data['data'][i]['_id'],'company':data['data'][i]['company'],'contact':data['data'][i]['contact'],'country':data['data'][i]['country']})
            // console.log(this.companyData);
         }
      }
    )
  }

  update_company(id){ //to fetch out prefilled data
    this.loginservice.fetchSingleCompany(id).
    subscribe(
      (data:any[])=>{
        this.editData=data;
        this.model.id=data['data']['0']['_id'];
        this.model.company=data['data']['0']['company'];
        this.model.contact=data['data']['0']['contact'];
        this.model.country=data['data']['0']['country'];
        console.log('here');
        console.log(this.model.company);

      }
    )
  }
  saveData(){
    this.loginservice.updateCompany(this.model.id,this.model.company,this.model.contact,this.model.country).
    subscribe(
      (data:any)=>{
        if(data.res=='success'){
          console.log('data updated');
          this.allCompany();
        }else{
          console.log('not updated');
        }
      }
    )
  }
 
  delete_company(id){
    this.loginservice.deleteCompany(id).
    subscribe(
      (data:any)=>{
        if(data.res =='success'){
          console.log('data deleted');
          this.allCompany();
        }else{
          console.log('not deleted');
        }
      }
    )
  }
}
