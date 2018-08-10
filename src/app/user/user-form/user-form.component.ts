import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../user';
import { Observable } from 'rxjs';
import { Lawschool } from '../../lawschools/lawschool';
import { map } from 'rxjs/operators';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

	id;
	form: FormGroup;
	title: string;
	button: string;
	user = new User();
	userDoc: AngularFirestoreDocument<User>;
	singleUser:Observable<User>;
	lawSchoolsCol: AngularFirestoreCollection<Lawschool>;
	lawSchools: any;

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
			this.button = "Add User"
		}
		else {
			this.title = "Edit User";
			this.button = "Save Changes";
			this.userDoc = this.afs.doc('users/'+this.id);
			this.singleUser = this.userDoc.valueChanges();
			this.singleUser.subscribe((user) => {
				this.form.get('username').setValue(user.username);
				this.form.get('email').setValue(user.email);
				this.form.get('lawschool').setValue(user.lawschool);
				this.form.get('password').setValue(user.password);
			});
		}

		this.lawSchoolsCol = this.afs.collection('lawschools', ref => ref.orderBy('lawSchool'));
		this.lawSchools = this.lawSchoolsCol.snapshotChanges()
		.pipe(
			map(actions => {
				return actions.map( a => {
					const data = a.payload.doc.data() as Lawschool;
					const id = a.payload.doc.id;
					return { id, data };
				});
			})
			);
	}

}
