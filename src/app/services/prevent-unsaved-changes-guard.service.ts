import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserFormComponent } from '../user/user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})

export class PreventUnsavedChangesGuardService implements CanDeactivate<UserFormComponent> {

	canDeactivate (component: UserFormComponent) {
		if(component.form.dirty)
			return confirm("Are you sure?");

		return true;
	}

  constructor() { }
}
