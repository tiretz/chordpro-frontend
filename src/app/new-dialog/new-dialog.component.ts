import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchResult } from '../apis/api.results';

@Component({
	selector: 'app-new-dialog',
	templateUrl: './new-dialog.component.html',
	styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent {

	public songTitleToSearch: string = "";
	public songArtistsToSearch: string = "";

	public searchResults: SearchResult[] = [];

	constructor(private apiService: ApiService) {}

	querySongSearch() {
		this.searchResults = this.apiService.getSearchResults(this.songTitleToSearch, this.songArtistsToSearch);
		console.log(this.searchResults)
	}
}
