import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeeList=[
    {
      "employeeid": 1,
      "firstname": "Janet",
      "lastname": "Leverling",
      "birthdate": "30/08/1973",
      "startdate": "02/04/2012",
      "employeetype": "Permanent",
      "salary": 40000,
      "pvfrate": 4
    },
    {
      "employeeid": 2,
      "firstname": "Nancy",
      "lastname": "Davolio",
      "birthdate": "08/12/1978",
      "startdate": "01/05/2012",
      "employeetype": "Permanent",
      "salary": 30000,
      "pvfrate": 5
    },
    {
      "employeeid": 3,
      "firstname": "Andrew",
      "lastname": "Fuller",
      "birthdate": "19/02/1962",
      "startdate": "16/08/2012",
      "employeetype": "Permanent",
      "salary": 50000,
      "pvfrate": 5
    },
    {
      "employeeid": 4,
      "firstname": "Anne",
      "lastname": "Dodsworth",
      "birthdate": "02/07/1969",
      "startdate": "16/11/2012",
      "employeetype": "Part-time",
      "salary": 200,
      "pvfrate": null
    },
    {
      "employeeid": 5,
      "firstname": "Michael",
      "lastname": "Suyama",
      "birthdate": "02/07/1963",
      "startdate": "17/10/2013",
      "employeetype": "Permanent",
      "salary": 40000,
      "pvfrate": 2
    },
    {
      "employeeid": 6,
      "firstname": "Laura",
      "lastname": "Callahan",
      "birthdate": "09/01/1968",
      "startdate": "05/03/2014",
      "employeetype": "Permanent",
      "salary": 52000,
      "pvfrate": 8
    },
    {
      "employeeid": 7,
      "firstname": "Fergus",
      "lastname": "Robinson",
      "birthdate": "18/10/1982",
      "startdate": "02/06/2014",
      "employeetype": "Permanent",
      "salary": 43000,
      "pvfrate": 10
    },
    {
      "employeeid": 8,
      "firstname": "Tom",
      "lastname": "Brown",
      "birthdate": "07/11/1977",
      "startdate": "03/02/2015",
      "employeetype": "Permanent",
      "salary": 35000,
      "pvfrate": 10
    },
    {
      "employeeid": 9,
      "firstname": "Margaret",
      "lastname": "Peacock",
      "birthdate": "11/09/1968",
      "startdate": "01/05/2015",
      "employeetype": "Permanent",
      "salary": 70000,
      "pvfrate": 10
    },
    {
      "employeeid": 10,
      "firstname": "Robert",
      "lastname": "King",
      "birthdate": "29/05/1970",
      "startdate": "04/01/2016",
      "employeetype": "Permanent",
      "salary": 25000,
      "pvfrate": 5
    },
    {
      "employeeid": 11,
      "firstname": "Steven",
      "lastname": "Buchanan",
      "birthdate": "04/03/1975",
      "startdate": "17/10/2016",
      "employeetype": "Part-time",
      "salary": 150,
      "pvfrate": null
    },
    {
      "employeeid": 12,
      "firstname": "Rebecca",
      "lastname": "Wilson",
      "birthdate": "20/04/1985",
      "startdate": "01/03/2017",
      "employeetype": "Permanent",
      "salary": 48000,
      "pvfrate": 4
    }
  ]

  @ViewChild('NgbdDatepicker') bd: NgbDateStruct;
  @ViewChild('NgbdDatepicker') st: NgbDateStruct;
  @ViewChild('closemodal') closemodal;

  birthdate: NgbDateStruct;
  startdate: NgbDateStruct;

  
  employee={
    "employeeid": 0,
    "firstname": "",
    "lastname": "",
    "birthdate": "",
    "startdate": "",
    "employeetype": "Permanent",
    "salary": 0,
    "pvfrate": 2
  }
  myDateValue:Date

  constructor() { }

  ngOnInit(): void {
   console.log(this.startdate)
    this.myDateValue = new Date();
    this.employeeList.map((item) => {
      this.calculate_pvd(item)
    })
    console.log(this.employeeList)
  }

  calculate_pvd(employee){
    employee['age'] = this.calculate_year(employee.birthdate)
    employee['pvd_employee'] = employee.employeetype == "Permanent" ? this.calculate_provident_fund(employee,true) : 0
    employee['pvd_employer'] = employee.employeetype == "Permanent" ? this.calculate_provident_fund(employee,false) : 0
    employee['leave'] = employee.employeetype == "Permanent" ? this.calulate_for_leave(employee) : 0
    employee['year_of_work'] = this.year_of_work(employee)/12
  }

  calculate_provident_fund(employee,pvfrate){
    let pvd_month = employee.salary * ((pvfrate? employee.pvfrate : 10)/100);
    let pvd = {
        bond :0,
        sum_pvd_month:0
    }
    var dateParts:any = employee.startdate.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let month_count = this.month_diff(dateObject,new Date())
    for(let i=1;i<=month_count-3;i++){
      pvd.sum_pvd_month+=pvd_month
      pvd.bond = pvd.bond+((pvd.sum_pvd_month * 0.02 * 30) / 365)
    }
    return pvd
  }

  year_of_work(employee){
    var dateParts:any = employee.startdate.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let month_count = this.month_diff(dateObject,new Date())
    return month_count
  }

  month_diff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  calculate_year(dt) { 
    var dateParts:any = dt.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var diff_ms = Date.now() - dateObject.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  calulate_for_leave(employee){
    var dateParts:any = employee.startdate.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let month_count = this.month_diff(dateObject,new Date())
    let sum_of_leave = employee.pvd_employee.sum_pvd_month + employee.pvd_employee.bond
    if(month_count>(12*5)){
      sum_of_leave += employee.pvd_employer.sum_pvd_month + employee.pvd_employer.bond
    }else if(month_count>(12*3)){
      sum_of_leave += (employee.pvd_employer.sum_pvd_month + employee.pvd_employer.bond)/2
    }
    return sum_of_leave;
  }

  createEmployee(){
    this.employee.employeeid = this.employeeList.length+1
    this.employee.startdate = this.startdate.day+"/"+this.startdate.month+"/"+this.startdate.year
    this.employee.birthdate = this.birthdate.day+"/"+this.birthdate.month+"/"+this.birthdate.year
    this.calculate_pvd(this.employee)
    this.employeeList.push(JSON.parse(JSON.stringify(this.employee)))
    this.clearValue();
    this.closemodal.nativeElement.click();

  }

  clearValue(){
    this.startdate = undefined
    this.birthdate =undefined
    this.employee ={
      "employeeid": 0,
      "firstname": "",
      "lastname": "",
      "birthdate": "",
      "startdate": "",
      "employeetype": "Permanent",
      "salary": 0,
      "pvfrate": 2
    }
  }

}
