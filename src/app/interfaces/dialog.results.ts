import { ITrackInfo, ITrackMetaInfo } from "../apis/api.results";

export interface IAutomaticDialogResult extends ITrackInfo { }

export interface IManualDialogResult extends ITrackInfo, ITrackMetaInfo { }