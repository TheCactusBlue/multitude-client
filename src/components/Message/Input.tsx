import React, {MutableRefObject} from "react";
import styled, { css } from "styled-components";

const useFocus = (ref: MutableRefObject<any>, defaultState = false) => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {

    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    ref.current.addEventListener('focus', onFocus);
    ref.current.addEventListener('blur', onBlur);

    return () => {
      ref.current.removeEventListener('focus', onFocus);
      ref.current.removeEventListener('blur', onBlur);
    };

  }, []);
  return state;
};

const sharedCss = css`
  resize: none;
  max-height: 300px;
  font-size: 14px;
  border: none;
  padding: 16px;
  overflow-y: auto;
  word-wrap: break-word;
  &:focus {
    outline: none;
  }
  border-radius: 8px;
  
  grid-area: 1 / 1 / 2 / 2;
`;

const AutoGrow = styled.div`
  margin-top: 8px;
  display: grid;
`;

const MessageInputDouble = styled.span`
  ${sharedCss};
  white-space: pre-line;
  visibility: hidden;
;
`;

const Outer = styled.div`
  margin: 0 16px 0;
`;

const Typing = styled.div`
  margin: 2px;
  font-size: 12px;
  height: 16px;
`;

const MessageInputBox = styled.textarea`
  ${sharedCss};
  color: #dcddde;
  background-color: #40444B;
`;

interface MessageProps {
  onMessageSend: ((text: string) => void);
}

// the input box for messages.
export function MessageInput(props: MessageProps) {
  const ref = React.useRef<any>();
  const [text, setText] = React.useState('');

  const typing: string[] = []; // todo: implement typing states

  return (
    <Outer>
      <AutoGrow>
        <MessageInputBox placeholder="Message..." rows={1} ref={ref}
         value={text} onChange={x => setText(x.target.value)}
         onKeyDown={x => {
           if (x.keyCode === 13) {
             props.onMessageSend(text);
             setText('');
             x.preventDefault();
           }
         }}/>
        <MessageInputDouble>{text}</MessageInputDouble>
      </AutoGrow>
      <Typing>
        {(typing.length !== 0) && <div>
          {typing.join(', ')} {typing.length === 1 ? 'is': 'are'} typing...
        </div>}
      </Typing>
    </Outer>
  )
}