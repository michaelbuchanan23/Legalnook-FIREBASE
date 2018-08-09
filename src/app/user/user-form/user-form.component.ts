import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

	id;
	form: FormGroup;
	title: string;
	user = new User();
	userDoc: AngularFirestoreDocument<User>;
	singleUser:Observable<User>;

	submit() {
		if (this.id) {
			this.afs.doc('users/'+this.id).update({
				username:this.user.username,
				email: this.user.email,
				lawschool: this.user.lawschool,
				password: this.user.password
			});
		} else {
			this.afs.collection('users').add({
				username:this.user.username,
				email: this.user.email,
				lawschool: this.user.lawschool,
				password: this.user.password
			});
		}
		this._router.navigate(['']);
	}
	constructor(fb: FormBuilder, private _router: Router, private afs: AngularFirestore, private _route:ActivatedRoute) { 
		this.form = fb.group({
			username: ['',Validators.required],
			email: ['',Validators.required],
			lawschool: ['',Validators.required],
			password: ['',Validators.required]
		})
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			this.id=params["id"];
		});

		if(!this.id) {
			this.title = "New User";
		}
		else {
			this.title = "Edit User";
			this.userDoc = this.afs.doc('users/'+this.id);
			this.singleUser = this.userDoc.valueChanges();
			this.singleUser.subscribe((user) => {
				this.form.get('username').setValue(user.username);
				this.form.get('email').setValue(user.email);
				this.form.get('lawschool').setValue(user.lawschool);
				this.form.get('password').setValue(user.password);
			});
		}

	}

}
