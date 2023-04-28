import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TitlesService } from 'src/app/services/titles.service';

@Component({
  selector: 'app-evaluate-title',
  templateUrl: './evaluate-title.component.html',
  styleUrls: ['./evaluate-title.component.scss']
})
export class EvaluateTitleComponent {
  grade = {
    title_1: 0,
    title_2: 0,
    title_3: 0
  }
  constructor(private route: ActivatedRoute, private titleService: TitlesService, private routes: Router) { }
  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.titleService.getById(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(
      response => {
        this.grade = JSON.parse(response.grades!);

      }
    )
  }

  checkValue(event: any) {
    if (event.target.checked && event.target.value === '1') {
      this.grade.title_1 += 1
    }
    else if (event.target.checked && event.target.value === '2') {
      this.grade.title_2 += 1
    }
    else if (event.target.checked && event.target.value === '3') {
      this.grade.title_3 += 1
    }
  }

  submit(): void {
    this.titleService.update(parseInt(this.route.snapshot.paramMap.get('id')!), { grades: JSON.stringify(this.grade) }).subscribe(
      response => {
        this.routes.navigate(['/capstone-titles'])
      },
      error => {

      }
    )
  }
}
