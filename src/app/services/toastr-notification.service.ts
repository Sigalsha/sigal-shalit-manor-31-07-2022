import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrNotificationService {
  constructor(private toastr: ToastrService) {}

  error(msg: string, title: string): void {
    this.toastr.error(msg, title);
  }

  warning(msg: string, title: string): void {
    this.toastr.warning(msg, title);
  }

  success(msg: string, title: string): void {
    this.toastr.success(msg, title, { timeOut: 1500 });
  }

  info(msg: string, title: string): void {
    this.toastr.info(msg, title);
  }
}
