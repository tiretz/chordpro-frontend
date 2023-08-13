export interface ITrackInfo {
    albumName: string;
    albumCoverUrl: string;
    albumReleaseDate: Date;
    artists: string[];
    id: string;
    spotifyUrl: string;
    title: string;
}

export interface ITrackMetaInfo {
    chords: string[];
    duration: string;
    key: string;
    mode: number;
    tempo: string;
    timeSignature: string;
}

export interface ITrackLyrics {
    lyrics: string;
}

export interface ISong extends ITrackInfo, ITrackMetaInfo, ITrackLyrics { }