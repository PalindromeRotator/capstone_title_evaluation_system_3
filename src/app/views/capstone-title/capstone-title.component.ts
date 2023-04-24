import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/models/titles';
import { TitlesService } from 'src/app/services/titles.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-capstone-title',
  templateUrl: './capstone-title.component.html',
  styleUrls: ['./capstone-title.component.scss']
})
export class CapstoneTitleComponent {
  titleArray: Array<Titles> = []
  constructor(private titlesService: TitlesService, private router: Router) { }
  ngOnInit() {
    this.titlesService.getAll().subscribe(
      response => {
        this.titleArray = response
      }
    )
  }

  viewEntry(data: any): void {
    const stringifyVar = JSON.stringify(data)
    this.router.navigate(['/view-entry', stringifyVar])
  }
}
