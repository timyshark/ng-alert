import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert.service';
import { AlertSettings } from '../alert-settings';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit, OnDestroy{
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          this.alerts = [];
          return;
        }

        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      }
    );

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription!.unsubscribe();
    this.routeSubscription!.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      this.alerts.find(x => x === alert)!.fade = true;

      setTimeout(() => {
          this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];
                
    const alertTypeClass = {
      [AlertSettings.SUCCESS]: 'alert alert-success',
      [AlertSettings.ERROR]: 'alert alert-danger',
      [AlertSettings.INFO]: 'alert alert-info',
      [AlertSettings.WARNING]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.alertType!]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
