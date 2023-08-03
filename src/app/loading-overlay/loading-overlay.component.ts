import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-loading-overlay',
	templateUrl: './loading-overlay.component.html',
	styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent {

	message: string = '';

	constructor(private dialogRef: MatDialogRef<LoadingOverlayComponent>) { }
}