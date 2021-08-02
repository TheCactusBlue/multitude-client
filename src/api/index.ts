import axios, {AxiosInstance} from "axios";
import {Channel, Message} from "../models";
import {Commands, Events, PickCommandData, PickEventData} from "../models/operations";

const apiPool: { [url: string]: MultitudeAPI } = {};

export function getAPIFromPool(url: string) {
  if (apiPool[url] === undefined) {
    const api = new MultitudeAPI(url);
    apiPool[url] = api;
    return api;
  }
  return apiPool[url]
}

export class MultitudeAPI {
  private axios: AxiosInstance;
  private socket: WebSocket;
  private socketHandlers: { [key: string]: Set<any> } = { };

  private accessToken: string = '';

  private isSocketOpen = false;
  private bufferedMessages: string[] = [];


  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: baseURL,
    });
    this.socket = new WebSocket('ws' + baseURL.substring(4)); // replace http with ws
    this.socket.onmessage = msg => {
      const { op, data } = JSON.parse(msg.data);
      this.socketHandlers[op].forEach(x => x(data));
    }
    this.socket.onopen = () => {
      this.isSocketOpen = true;
      this.bufferedMessages.forEach(this.socket.send);
    }

    this.axios.interceptors.request.use(x => {
      x.headers['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
      return x;
    });
  }

  send<K extends Commands['op']>(op: K, data: PickCommandData<K>) {
    const d = JSON.stringify({
      op, data
    });
    if (!this.isSocketOpen) {
      this.bufferedMessages.push(d);
      return;
    }
    this.socket.send(d);
  }

  addHandler<K extends Events['op'], F extends (data: PickEventData<K>) => void>(op: K, handler: F): F {
    // handlers[op] = handler;
    if (this.socketHandlers[op] === undefined) {
      this.socketHandlers[op] = new Set();
    }
    this.socketHandlers[op].add(handler);
    return handler;
  }

  removeHandler<K extends Events['op']>(op: K, handler: (data: PickEventData<K>) => void) {
    this.socketHandlers[op].delete(handler);
  }

  async connect(): Promise<void> {
    await this.axios.post(`/connect`);
  }

  async getChannels() {
    const { data } = await this.axios.get<Channel[]>('/channel');
    return data;
  }

  async sendMessage(channelId: string, message: string): Promise<void> {
    await this.axios.post(`/channel/${channelId}/message`, { content: message });
  }

  async getMessages(channelId: string): Promise<Message[]> {
    const { data } = await this.axios.get<Message[]>(`/channel/${channelId}/message`);
    return data;
  }
}
