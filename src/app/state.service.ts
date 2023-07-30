import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StateService {

	private isSideNavOpenValue = true;
	private isSideNavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isSideNavOpenValue);

	isSideNavOpen$:  Observable<boolean> = this.isSideNavOpen.asObservable();

	toggleSideNavState() {
		this.isSideNavOpenValue = !this.isSideNavOpenValue;
		this.isSideNavOpen.next(this.isSideNavOpenValue);
	}
}
