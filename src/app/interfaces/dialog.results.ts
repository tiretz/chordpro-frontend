import { ISongInformation, ISongMetaData } from "../apis/api.results";

export interface IAutomaticDialogResult extends ISongInformation { }

export interface IManualDialogResult extends ISongInformation, ISongMetaData { }