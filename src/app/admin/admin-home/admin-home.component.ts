import { Component, OnInit } from '@angular/core';
import { CheckAuthService } from 'src/app/auth/check-auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private checkAuth: CheckAuthService) { }

  ngOnInit(): void {
    this.checkAuth.autologin();
  }

}
