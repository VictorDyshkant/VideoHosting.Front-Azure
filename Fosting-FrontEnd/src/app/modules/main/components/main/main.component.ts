import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/aCommon/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  id: string = '';

  constructor(private loginService: LoginService, private nav: Router) {
    this.id = localStorage.getItem(environment.id);
  }

  logout() {
    this.loginService.logout()
      .subscribe(
        ok => {
          localStorage.clear();
          this.nav.navigate(['/login']);
      });
  }

}
