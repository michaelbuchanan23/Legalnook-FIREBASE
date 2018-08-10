import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Lawschool } from '../../lawschools/lawschool';
import { SortPipe } from '../../utility/sort.pipe';

interface User {
	username: string;
	email: string;
	password: string;
	lawschool: string;
}

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

	usersCol: AngularFirestoreCollection<User>;
	users: any
	
	lawSchoolsCol: AngularFirestoreCollection<Lawschool>;
	lawSchools: any;

	// sortProperty: string = "username";
	// sortOrder: string = "asc";

	// sort(sortBy: string): void {
	// 	if(sortBy === this.sortProperty)
	// 		this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
	// 	else {
	// 		this.sortProperty = sortBy;
	// 		this.sortOrder = 'asc';
	// 	}
	// }

	add() {
		this._router.navigate(['add']);
	}

	delete (userId,name) {  
		if (confirm("Are you sure you want to delete " + name + "?")){      
			this.afs.doc('users/'+userId).delete();  
		}  
	}

	constructor(private afs: AngularFirestore, private _router: Router) { }

	ngOnInit() {

		this.usersCol = this.afs.collection('users');
  	//this.users = this.usersCol.valueChanges();
  	this.users = this.usersCol.snapshotChanges()
  	.pipe(
  		map(actions => {
  			return actions.map( a => {
  				const data = a.payload.doc.data() as User;
  				const id = a.payload.doc.id;
  				return { id, data };
  			});
  		})
  		);

  	this.lawSchoolsCol = this.afs.collection('lawschools');
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
