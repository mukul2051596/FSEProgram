import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StockMarketUI';
  Categories :any;
  empData :any;
  ddlCategory = "0";
  startDate : any;
  endDate:any
  pipe:DatePipe= new DatePipe('en-US')
  
  constructor(private http:HttpClient){
    this.GetCategoryList();
  }

  ngOnInit(): void {
    this.startDate= this.pipe.transform('1-APR-2022','yyyy-MM-dd') as unknown as Date;
    this.endDate= this.pipe.transform(new Date(),'yyyy-MM-dd') as unknown as Date;
    var url='http://localhost:45733/api/CompanyRegistration/v1.0/market/stock/get?companyCode=0&startDate='+ this.startDate+'&endDate='+this.endDate;
    console.log("URL ===" +url);
     this.http.get(url).subscribe(
       data =>{
       console.log('Upcoming ',data);
         this.empData =data;
      }
     );


  }
  GetCategoryList(){
    this.http.get(`http://localhost:45733/api/CompanyRegistration/v1.0/market/stock/GetCompanyList`).subscribe(
      data =>{
        console.log('Upcoming ',data);
        this.Categories =data;
      }

    );
    
  }

  

  SubmitData(){
  //alert(this.ddlCategory + ' ' + this.startDate + ' ' + this.endDate );
   console.log("DDL"+this.ddlCategory)
  var url='http://localhost:45733/api/CompanyRegistration/v1.0/market/stock/get?companyCode='+this.ddlCategory+"&startDate="+this.startDate+"&endDate="+this.endDate;
  console.log("URL ===" +url);
   this.http.get(url).subscribe(
     data =>{
     console.log('Upcoming ',data);
       this.empData =data;
    }

   );
}


}
