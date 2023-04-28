import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { Titles } from 'src/app/models/titles';
import { Users } from 'src/app/models/users';
import { TitlesService } from 'src/app/services/titles.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  from!: NgbDateStruct;
  into!: NgbDateStruct;
  filter = {
    from: '',
    into: '',
    selectedFilter: 'none',
  }
  titlesData!: Array<Titles>
  usersData!: Array<Users>
  titleChosen!: Array<any>
  constructor(private titlesService: TitlesService, private usersService: UsersService) {

  }
  ngOnInit() {
  }

  findFilter(): void {
    const from = this.getSelectedDate(this.filter.from);
    const into = this.getSelectedDate(this.filter.into);

    const epochTimeFrom = from.getTime();
    const epochTimeInto = into.getTime();


    if (this.filter.from === '' || this.filter.from === '') {
      Swal.fire({
        icon: 'error',
        text: 'Date filter form cannot be empty.'
      })
    }
    switch (this.filter.selectedFilter) {
      case "1": {
        this.titlesService.getAll().subscribe(
          response => {
            var result: Array<Object> = [
            ]
            response.forEach(function (data) {
              console.log(data)
              var dataCreatedDate = new Date(data.createdAt!);
              if (dataCreatedDate.getTime() >= epochTimeFrom && dataCreatedDate.getTime() <= epochTimeInto) {
                result.push(data)
              }
            })
            this.titlesData = []
            console.log(result)
            this.titlesData = result
          }
        )
        break;
      }
      case "2": {
        this.titlesService.getAll().subscribe(
          response => {
            var result: Array<Object> = [
            ]
            for (let data of response) {
              for (let titleData of JSON.parse(data.titles!)) {
                if (titleData.is_chosen) {
                  result.push(titleData)
                }

              }

            }
            this.titleChosen = []
            console.log(result)
            this.titleChosen = result
          }
        )
        break;
      }
      case "3": {
        this.titlesService.getAll().subscribe(
          response => {
            var result: Array<Object> = [
            ]
            for (let data of response) {
              var dataCreatedDate = new Date(data.createdAt!);
              if (dataCreatedDate.getTime() >= epochTimeFrom && dataCreatedDate.getTime() <= epochTimeInto) {

                for (let panelData of JSON.parse(data.panels!)) {

                  if (panelData.uid) {
                    this.usersService.getById(JSON.parse(panelData.uid)).subscribe(
                      response => {
                        result.push(response)
                      }
                    )

                  }
                }


              }
            }
            this.usersData = []
            console.log(result)
            this.usersData = result
          }
        )
        break;
      }
      case "4": {
        this.titlesService.getAll().subscribe(
          response => {
            var result: Array<Object> = [
            ]
            for (let data of response) {
              console.log(data)
              var dataCreatedDate = new Date(data.createdAt!);
              if (dataCreatedDate.getTime() >= epochTimeFrom && dataCreatedDate.getTime() <= epochTimeInto) {
                if (JSON.parse(data.adviser!).uid) {
                  this.usersService.getById(JSON.parse(data.adviser!).uid).subscribe(
                    response => {
                      result.push(response)
                    }
                  )

                }

              }
            }
            this.usersData = []
            console.log(result)
            this.usersData = result
          }
        )
        break;
      }
      default:
        Swal.fire({
          icon: 'error',
          text: 'Please select what to filter.'
        })
        break;
    }

  }
  getCurrentUser(uid: number): Object {
    var object = {};
    this.usersService.getById(uid).subscribe(
      response => {
        object = response
      }
    )
    return object;
  }
  getSelectedDate(from: string): Date {
    return new Date(from);
  }

  exportexcel(filename: string, element_name: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Successfully download a report sheet',
    }).then((result) => {
      let element = document.getElementById(element_name);
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, `${filename}.xlsx`);
    })
    /* pass here the table id */


  }

  downloadfile(url: string) {
    saveAs(url)
  }
}
