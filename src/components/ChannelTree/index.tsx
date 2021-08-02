import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import {useAppDispatch, useAppSelector} from "../../store";
import {addTab, setChannels, switchTab} from "../../store/channel";
import {getAPIFromPool} from "../../api";

const ChannelTreeOuter = styled.div`
  margin-top: 8px;
`

const ChannelBox = styled.div<{iconColor?: string, depth: number, active?: boolean}>`
  user-select: none;
  margin: 1px 8px;
  border-radius: 4px;
  padding: 6px 0 6px ${props => props.depth * 12 + 12}px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    margin-right: 10px;
    color: ${props => props.iconColor || props.theme.colors.primary};
  }

  color: ${p => p.active ? '#dcddde' : '#8e9297'};
  ${p => p.active ? 'background-color: rgba(0, 0, 0, 0.1) !important;' : ''}
  font-size: 14px;
`;

interface ChannelProps {
  name: string;
  id: string;
  depth: number;
}


interface ChannelFolderProps extends ChannelProps {
  children: { name: string, id: string }[];
}

export function ChannelElement(props: ChannelProps) {
  const tabs = useAppSelector(x => x.channel.tabs);
  const tabIndex = useAppSelector(x => x.channel.tabIndex);
  const dispatch = useAppDispatch();

  return (
    <ChannelBox depth={props.depth} onClick={evt => {
      // console.log(evt.ctrlKey);
      console.log(tabs);
      if (tabs.find(x => x.id === props.id) === undefined) {
        dispatch(addTab({ id: props.id, name: props.name }));
        dispatch(switchTab(tabs.length));
        return;
      }
      dispatch(switchTab(tabs.findIndex(x => x.id === props.id)));
    }} active={tabs[tabIndex]?.id === props.id} >
      <FontAwesomeIcon fixedWidth icon={faHashtag}/>
      {props.name}
    </ChannelBox>
  );
}

function ChannelFolder(props: ChannelFolderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <ChannelBox iconColor='#8e9297' depth={props.depth} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon fixedWidth icon={isOpen ? faFolderOpen : faFolder}/>
        {props.name}
      </ChannelBox>
      {isOpen && <div>
        {props.children.map(x => <ChannelElement id={x.id} name={x.name} key={x.name} depth={props.depth + 1}/>)}
      </div>}
    </>
  );
}

// the tree of sidebar.
export function ChannelsView() {
  const channels = useAppSelector(x => x.channel.channels);
  const dispatch = useAppDispatch();
  const api = getAPIFromPool('http://localhost:5000');
  React.useEffect(() => {
    api.getChannels()
      .then(ch => {
        dispatch(setChannels(ch));
      });
  }, []);
  return (
    <ChannelTreeOuter>
      <ChannelFolder name='general' id='' children={channels} depth={0}/>
    </ChannelTreeOuter>
  )
}