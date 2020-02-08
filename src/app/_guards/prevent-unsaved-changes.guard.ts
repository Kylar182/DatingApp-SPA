import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Any unsaved changes will be lost, are you sure you want to continue?');
    }
    return true;
  }
}