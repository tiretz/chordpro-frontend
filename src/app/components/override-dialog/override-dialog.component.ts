import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-override-dialog',
  templateUrl: './override-dialog.component.html',
  styleUrls: ['./override-dialog.component.css']
})
export class OverrideDialogComponent {

	title: string;
	message: string;

	constructor(public dialogRef: MatDialogRef<OverrideDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OverrideDialogModel) {

		this.title = data.title;
		this.message = data.message;
	}
}

export class OverrideDialogModel {

	constructor(public title: string, public message: string) { }
}