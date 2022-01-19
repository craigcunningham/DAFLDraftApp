import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Directive({
  selector: '[appCheckPermission]'
})
export class CheckPermissionDirective {
  private permissions = [];
  private user: User;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }

  @Input()
  set appCheckPermission(permissions) {
    // console.log('val: ' + permissions);
    this.permissions = permissions;
    this.user = this.userService.GetUser();
    this.updateView(permissions);
  }
  private updateView(permissions) {
    if (this.checkPermission(permissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission(permissions) {
  if (this.user && this.user.permissions) {
      return this.user.permissions === permissions;
    } else {
      return false;
    }
  }
}
