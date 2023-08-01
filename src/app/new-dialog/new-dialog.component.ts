import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ISongInformation } from '../apis/api.results';

@Component({
	selector: 'app-new-dialog',
	templateUrl: './new-dialog.component.html',
	styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent {

	public songTitleToSearch: string = "";
	public songArtistsToSearch: string = "";

	public searchResults: ISongInformation[] = [];

	constructor(private apiService: ApiService) {}

	async querySongSearch() {
		// this.searchResults = await this.apiService.getSearchResults(this.songTitleToSearch, this.songArtistsToSearch);
		this.searchResults = [
			{
			  title: "Wish You Were Here",
			  artists: [
				"Pink Floyd",
			  ],
			  album: "A Collection Of Great Dance Songs",
			  releaseDateAlbum: new Date("1981-11-01T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b273b3ca136e83344321ebd3de01",
			  spotifySongID: "1HzDhHApjdjXPLHF6GGYhu",
			  spotifyLink: "https://open.spotify.com/intl-de/track/1HzDhHApjdjXPLHF6GGYhu?si=bac9baebf3954144",
			},
			{
			  title: "wish you were gay",
			  artists: [
				"Billie Eilish",
			  ],
			  album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
			  releaseDateAlbum: new Date("2019-03-29T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
			  spotifySongID: "3Fj47GNK2kUF0uaEDgXLaD",
			  spotifyLink: "https://open.spotify.com/intl-de/track/3Fj47GNK2kUF0uaEDgXLaD?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Mine - Radio Edit",
			  artists: [
				"Philip George",
			  ],
			  album: "Wish You Were Mine",
			  releaseDateAlbum: new Date("2014-12-28T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b27325f92c1a22808b250fc1b1cb",
			  spotifySongID: "412luShbmlgqqgYFStIB1s",
			  spotifyLink: "https://open.spotify.com/intl-de/track/412luShbmlgqqgYFStIB1s?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Sober",
			  artists: [
				"Conan Gray",
			  ],
			  album: "Kid Krow",
			  releaseDateAlbum: new Date("2020-03-20T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b27388e3cda6d29b2552d4d6bc43",
			  spotifySongID: "0kn2gu8Pd03DiYHzRvX2Xk",
			  spotifyLink: "https://open.spotify.com/intl-de/track/0kn2gu8Pd03DiYHzRvX2Xk?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Here",
			  artists: [
				"Avril Lavigne",
			  ],
			  album: "Goodbye Lullaby (Expanded Edition)",
			  releaseDateAlbum: new Date("2011-03-08T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b27372c9f7a7c75eba39726106a6",
			  spotifySongID: "5XHf9PBxxHmJFuiDkGNIOA",
			  spotifyLink: "https://open.spotify.com/intl-de/track/5XHf9PBxxHmJFuiDkGNIOA?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Here",
			  artists: [
				"Rednex",
			  ],
			  album: "Sex & Violins",
			  releaseDateAlbum: new Date("1994-08-12T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b27380eb31d4f1ce8158f8adbebc",
			  spotifySongID: "1SqGaM1N6OUvp5GUfx7zAb",
			  spotifyLink: "https://open.spotify.com/intl-de/track/1SqGaM1N6OUvp5GUfx7zAb?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Gay",
			  artists: [
				"Claud",
			  ],
			  album: "Sideline Star",
			  releaseDateAlbum: new Date("2019-10-25T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b2732b7ef9f0c2c65887437bed82",
			  spotifySongID: "1UOgQpv8Ofd3OtlmpCjmTM",
			  spotifyLink: "https://open.spotify.com/intl-de/track/1UOgQpv8Ofd3OtlmpCjmTM?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Here",
			  artists: [
				"Wyclef Jean",
			  ],
			  album: "The Ecleftic -2 Sides II A Book",
			  releaseDateAlbum: new Date("2000-05-01T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b2733556605afe7ea14ff4e38fb4",
			  spotifySongID: "5Qye5mopKdm3F83ebKp6tQ",
			  spotifyLink: "https://open.spotify.com/intl-de/track/5Qye5mopKdm3F83ebKp6tQ?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Here",
			  artists: [
				"Das Traumstern-Orchester",
			  ],
			  album: "Spielt die schönsten Rock-Klassiker, Vol. 2",
			  releaseDateAlbum: new Date("2016-07-29T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b273dffb10b72e2caf6c4a008d1e",
			  spotifySongID: "420x1GZjI7sCluCbLFrKAR",
			  spotifyLink: "https://open.spotify.com/intl-de/track/420x1GZjI7sCluCbLFrKAR?si=bac9baebf3954144",
			},
			{
			  title: "Wish You Were Here",
			  artists: [
				"SuperM",
			  ],
			  album: "Super One -The 1st Album",
			  releaseDateAlbum: new Date("2020-09-25T00:00:00.000Z"),
			  albumCoverImg: "https://i.scdn.co/image/ab67616d0000b273724a0cb04dbc89d9dd6ee06d",
			  spotifySongID: "1jriDhlQ4iaxu7XimeUJiP",
			  spotifyLink: "https://open.spotify.com/intl-de/track/1jriDhlQ4iaxu7XimeUJiP?si=bac9baebf3954144",
			},
		  ];
	}
}
