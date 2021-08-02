import { Message } from "./index";

interface SubscribeChannel {
  op: 'subscribeChannel',
  data: {
    channelId: string;
  };
}

interface MessageCreated {
  op: 'messageCreated';
  data: Message;
}

interface UnknownOperation {
  op: '___';
  data: unknown;
}

export type Commands = UnknownOperation
  | SubscribeChannel;
export type Events = UnknownOperation
  | MessageCreated;

export type PickCommandData<K> = Extract<Commands, { op: K }>['data'];
export type PickEventData<K> = Extract<Events, { op: K }>['data'];
