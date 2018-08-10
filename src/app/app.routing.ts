import { RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { PreventUnsavedChangesGuardService } from './services/prevent-unsaved-changes-guard.service';

export const routing = RouterModule.forRoot([
	{ path: '', redirectTo: '/list', pathMatch:'full' },
	{ path: 'list', component: UserListComponent },
	{ path: 'add', component: UserFormComponent, canDeactivate:[PreventUnsavedChangesGuardService] },
	{ path: 'add/:id', component: UserFormComponent, canDeactivate:[PreventUnsavedChangesGuardService] },
	{ path: '**', component: UserListComponent }
	]);