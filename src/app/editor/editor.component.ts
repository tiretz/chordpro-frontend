import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

	options = {}

	isSideNavOpen: boolean | undefined;
	subscription: Subscription | undefined;

	constructor(private stateService: StateService) {}

	ngOnInit() {
		this.subscription = this.stateService.isSideNavOpen$.subscribe(isSideNavOpen => this.isSideNavOpen = isSideNavOpen);
	}

	ngOnDestroy() {
		this.subscription && this.subscription.unsubscribe();
	}

	openedChange() {
		// Resize editor to fit container width
		(<any>window).monaco?.editor.getEditors()[0].layout();
	}
}