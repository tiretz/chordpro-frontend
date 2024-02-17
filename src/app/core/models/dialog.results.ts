import { ITrackInfo, ITrackMetaInfo } from './api.results';

export interface IAutomaticDialogResult extends ITrackInfo {}

export interface IManualDialogResult extends ITrackInfo, ITrackMetaInfo {}
