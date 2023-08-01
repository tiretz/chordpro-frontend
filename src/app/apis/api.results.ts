export interface ISongInformation {

    title: string;
    artists: string[];
    album: string;
    releaseDateAlbum: Date;
    albumCoverImg: string;
    spotifySongID: string;
    spotifyLink: string;
}

export interface ISongMetaData {
    key: string;
    chords: string[];
    bpm: string;
    duration: string;
    timeSignature: string;
}

export interface IGeniusSongData {
    id: number;
    views: number;
}