import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-alert';
  constructor (private alertService: AlertService){
    
  }
  onClick(type: string,message:string){
    this.alertService.alert(new Alert({alertType:type, message}))
  }
}
