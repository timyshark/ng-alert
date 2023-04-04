import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-alert';
  constructor (private alertService: AlertService){
    
  }
  onLike(){
    this.alertService.success('Yay!')
  }
}
