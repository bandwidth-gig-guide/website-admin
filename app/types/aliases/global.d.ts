import { StateCode } from '../enums/StateCode';

declare global {
  type uuid = string;
  type url = string;
  type statecode = StateCode;
}

export {};