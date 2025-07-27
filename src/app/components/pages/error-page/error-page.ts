import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.html',
  imports:[CommonModule, RouterModule],
  styleUrls: ['./error-page.css'],
})
export class ErrorPage implements OnInit {
  code: string = 'Error';
  message: string = 'Something went wrong.';

  constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) this.code = params['code'];
      if (params['message']) this.message = params['message'];
    });
  }
}
