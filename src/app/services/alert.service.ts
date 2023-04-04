import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { AlertSettings } from '../ui/alert-settings';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new BehaviorSubject<Alert>(new Alert());
  private defaultId = 'default-alert';
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
      return this.subject.asObservable().pipe(filter(x => {
        if (x) return (x && x.id === id)
        else return false
      } ));
    }

  success(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.SUCCESS, message }));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.ERROR, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.INFO, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.WARNING, message }));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
