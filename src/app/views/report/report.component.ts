import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  from!: NgbDateStruct;
  into!: NgbDateStruct;
  titlesData!: Array<Titles>
  constructor(private titlesService: TitlesService) {

  }
  ngOnInit() {
  }
}
