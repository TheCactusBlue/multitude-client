import styled from "styled-components";
import React, {useState} from "react";
import {Message} from "../../models";
import {Popover} from "react-tiny-popover";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Box = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 16px;
  padding: 8px 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06)
  }
`;

const MessageInner = styled.div`
  padding-top: 4px;
  h2 {
    font-size: 14px;
    margin-right: 8px;
  }
  p {
    margin-bottom: 8px;
  }
  pre {
    padding: 16px;
    background-color: #29292b;
    border-radius: 4px;
  }
  a {
    color: #00AFF4;
    &:not(:hover) {
      text-decoration: none;
    }
  }
  img {
    max-width: 400px;
  }
`;

const Avatar = styled.img`
  margin-top: 4px;
  width: 40px;
  border-radius: 8px;
`;

const Timestamp = styled.div`
  color: #9f9e9e;
  font-size: 12px;
`;

const NameBox = styled.div`
  display: flex;
  margin-bottom: 4px;
  & > * {
    align-self: flex-end;
  }
`;

interface MessageProps {
  content: string;
}

function padTime(n: number) {
  return String(n).padStart(2, '0')
}
const dateFormat = new Intl.DateTimeFormat('en', {day: 'numeric', month: 'long', year: 'numeric'});

const UserPopover = styled.div`
  width: 300px;
  height: 300px;
  background-color: #292B2F;
  border-radius: 8px;
`;

const components = {

};

export function MessageElement({ message }: {message: Message}) {
  const time = new Date(message.timestamp);
  const [userPopover, setUserPopover] = useState(false);

  return (
    <Box>
      <Popover isOpen={userPopover} content={<UserPopover> test popover </UserPopover>}
         positions={['right']} align="start" padding={16}
      >
        <Avatar src={`http://localhost:6001/avatar/${message.author.id}`}
          onClick={() => setUserPopover(!userPopover)}
        />
      </Popover>
      <MessageInner>
        <NameBox>
          <h2>{message.author.name}</h2>
          <Timestamp>
            {dateFormat.format(time)} {padTime(time.getHours())}:{padTime(time.getMinutes())}
          </Timestamp>
        </NameBox>
        <ReactMarkdown plugins={[gfm]}>{message.content}</ReactMarkdown>
      </MessageInner>
    </Box>
  )
}