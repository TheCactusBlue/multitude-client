import React from "react";
import styled from "styled-components";

import {Message} from "../models";
import {MessageElement} from "../components/Message";
import {MessageInput} from "../components/Message/Input";
import { getAPIFromPool } from "../api";

function useMessages(serverUrl: string, channelId: string) {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    setLoading(true);
    setMessages([]);

    const api = getAPIFromPool(serverUrl);

    const messageCreatedHandler = api.addHandler('messageCreated', m => {
      if (m.channel === channelId) {
        setMessages(msgList => [...msgList, m]);
      }
    });

    async function fn() {
      // TODO: clean the order
      await api.connect();

      setMessages(await api.getMessages(channelId));
      api.send('subscribeChannel', { channelId });
    }
    fn().catch(setError);
    return () => {
      api.removeHandler('messageCreated', messageCreatedHandler)
    }
  }, [serverUrl, channelId]);

  return { messages, isLoading, error }
}

const Panel = styled.div`
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 0;
  background-color: ${p => p.theme.colors.bodyD1};
  padding: 4px 8px 4px 0;
  display: grid;
  grid-template-rows: 1fr auto;
`;

const List = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    border-radius: 16px;
    width: 8px;
    background-color: #2E3338;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #202225;
  }
`;

interface MessagesViewProps {
  serverUrl: string;
  channelId: string;
}

export function MessagesView({ serverUrl, channelId }: MessagesViewProps) {
  const { messages, error } = useMessages(serverUrl, channelId);
  const ref = React.useRef<any>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  if (error) {
    return <div>{(error as any).toString()}</div>
  }

  const api = getAPIFromPool(serverUrl);

  return (
    <Panel>
      <List ref={ref}>
        { messages.map(x => <MessageElement message={x} key={x.id}/>) }
      </List>
      <MessageInput onMessageSend={async content => {
        await api.sendMessage(channelId, content);
      }}/>
    </Panel>
  )
}