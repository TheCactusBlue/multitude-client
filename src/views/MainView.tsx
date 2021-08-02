import React from "react";
import styled from 'styled-components';

import {ChannelsView} from "../components/ChannelTree";
import {TabGrid} from "../components/Tab";
import {MessagesView} from "./MessageView";
import {useAppSelector} from "../store";
import {Helmet} from "react-helmet";


const Container = styled.div`
  background-color: ${p => p.theme.colors.bodyD1};
  display: grid;
  grid-template-columns: auto 1fr;
`

const ChannelSidebar = styled.div`
  width: 280px;
  resize: horizontal;
  overflow: auto;
  background-color: #2D2F35;
  display: grid;
  grid-template-rows: min-content 1fr;

  &::-webkit-resizer {
    display: none;
  }
`;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #292B2F;
  height: 64px;
  padding-left: 20px;
  .details {
    margin-left: 10px;
  }
  p {
    font-size: 11px;
    color: #8e9297;
  }
`;

const Avatar = styled.img`
  width: 48px;
  border-radius: 8px;
`;

// The "Main Grid layout", with the channel list browser + message view.
export function MainView() {
  const user = useAppSelector(x => x.user.user!);

  const tabs = useAppSelector(x => x.channel.tabs);

  return (
    <Container>
      <Helmet>
        <title>Multitude</title>
      </Helmet>
      <ChannelSidebar>
        <AvatarBox>
          <Avatar src={`http://localhost:6001/avatar/${user.id}`}/>
          <div className="details">
            <h1 style={{fontSize: '16px'}}>{user.name}</h1>
            <p>Chilling</p>
          </div>
        </AvatarBox>
        <ChannelsView/>
      </ChannelSidebar>
      <TabGrid tabs={tabs.map(x => ({
        id: x.id, name: x.name,
          component: () => <MessagesView serverUrl="http://localhost:5000" channelId={x.id}/>
      }))}/>
    </Container>
  );
}