import { Component } from '@angular/core';
import { StateService } from '../state.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

	constructor(private stateService: StateService) {}

	toggleDrawer() {
		this.stateService.toggleSideNavState();
	}

	onDownloadButtonClick() {
		this.downloadFile("test.chopro", (<any>window).monaco.editor.getModels()[0].getValue());
	}

	downloadFile(filename: string, text: string) {

		// Create dummy element
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
	  
		element.style.display = 'none';
		document.body.appendChild(element);
	  
		element.click();
	  
		document.body.removeChild(element);
	}
}
