import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EmployeeInfoService} from './employee-info.service';
import {EmployeeModel} from '../models/employee/employee.model';
import { Chart } from 'angular-highcharts';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public employeesList: EmployeeModel[];
  public chart: any;
  public genderChart: any;
  public employeesByTitleArray: any[] = [];
  public employeesByGenderArray: any[] = [];
  public displayedColumns = ['name', 'jobTitle', 'tenure', 'gender'];
  public dataSource: MatTableDataSource<EmployeeModel>;



  constructor(public empService: EmployeeInfoService) {
    this.empService.getEmployeeInfo().subscribe(data => {
      this.employeesList = data;
      this.dataSource = new MatTableDataSource(this.employeesList);
      // calls to generate charts should be done only after the data is received
      this.setPaginationAndSorting();
      this.generateEmployeeByTitleArray();
      this.generateEmployeeCountByGender();
      this.generateEmployeesByJobTitle();
      this.generateEmployeesByGender();
    });
  }

  ngOnInit() {
  }

  /**
   * method to calculate employees by title
   *
   */
  public generateEmployeeByTitleArray() {
    this.employeesList.forEach(emp => {
      if (this.employeesByTitleArray.length === 0) {
        this.employeesByTitleArray.push({name: emp.jobTitle, y: 1});
      } else {
        let employee = this.employeesByTitleArray.find(e => e.name === emp.jobTitle);
        if (employee !== undefined) {
          employee.y++;
        } else {
          this.employeesByTitleArray.push({name: emp.jobTitle, y: 1});
        }
      }
    });
  }

  /**
   * method to calculate employees by gender
   */
  public generateEmployeeCountByGender() {
    let counts = {};
    for (let i = 0; i < this.employeesList.length; i++) {
      const num = this.employeesList[i].gender;
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // iterating and pushing the values into array
    for ( const x in counts) {
      this.employeesByGenderArray.push(counts[x]);
    }
    console.log(this.employeesByGenderArray);
  }

  /**
   * Chart configuration: Employees by job title
   */
  public generateEmployeesByJobTitle() {
   this.chart = new Chart({
     chart: {
       type: 'pie'
     },
     title: {
       text: 'Employees by Job Title'
     },
     tooltip: {
       pointFormat: '{series.name}: <b>{point.percentage}%</b>'
     },
     credits: {
       enabled: false
     },
     plotOptions: {
       pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
           enabled: true,
           format: '<b>{point.name}</b>: {point.y}'
         }
       }
     },
     series : [{
       name: 'Employees',
       data: this.employeesByTitleArray
     }]
   });
  }


  /**
   * Chart configuration: Employees by gender
   */
  public generateEmployeesByGender(){
    this.genderChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Employees by Job Title'
      },
      xAxis: {
        categories: [
          'Male',
          'Female'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count (number)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      },
      series : [{
        name: 'Employees',
        data: this.employeesByGenderArray
      }]
    });
  }


  /**
   * to set the paginator and sorting on the table
   */
  public setPaginationAndSorting(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * clearing the arrays when the component is destroyed
   */
  public ngOnDestroy(){
    this.employeesByGenderArray = [];
    this.employeesByTitleArray = [];
  }

}
