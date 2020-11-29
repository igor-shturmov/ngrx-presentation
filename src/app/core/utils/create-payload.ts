import { Payload } from '../interfaces/payload';

export const createPayload = <T>(defaultPayload?: T): (payloadData?: T) => Payload<T> => (payload: T = defaultPayload) => ({ payload });
