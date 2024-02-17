import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingOverlayComponent } from '../../modules/editor/components/loading-overlay/loading-overlay.component';

@Injectable({
	providedIn: 'root',
})
export class LoadingOverlayService {
	private overlayRef: MatDialogRef<LoadingOverlayComponent> | undefined;

	constructor(private dialog: MatDialog) {}

	showLoadingOverlay(message?: string) {
		this.overlayRef = this.dialog.open(LoadingOverlayComponent, {
			disableClose: true,
			hasBackdrop: true,
			enterAnimationDuration: '250ms',
			exitAnimationDuration: '250ms',
			panelClass: 'loading-overlay-container',
		});

		if (message) this.overlayRef.componentInstance.message = message;
	}

	updateLoadingOverlayMessage(message: string) {
		if (!this.overlayRef) return;

		this.overlayRef.componentInstance.message = message;
	}

	hideLoadingOverlay() {
		if (!this.overlayRef) return;

		this.overlayRef.componentInstance.message = '';
		this.overlayRef.close();
	}
}
