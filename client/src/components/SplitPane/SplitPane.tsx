import {
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import {Button} from 'antd'
import DropdownQuestion from "../DropdownQuestion/DropdownQuestion";
import SplitPaneContext from "./SplitPaneContext"
  
function SplitPane({ children, ...props }) {
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const yDividerPos: any = useRef(null);
  const xDividerPos: any = useRef(null);

  const onMouseHoldDown = (e: MouseEventInit): void => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e: MouseEventInit) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export function Divider(props: any) {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export function SplitPaneTop(props: any) {
  const topRef = useRef(0);
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  return (
    <div {...props} className="split-pane-top" ref={topRef}>
        <DropdownQuestion setQuestion={props.setQuestion} questionsList={props.questionsList}/>
        <h2>{props.question && props.question.title}</h2>
        {props.question && props.question.question}
    </div>
  );
};

export function SplitPaneBottom(props: any)  {
  
  return (
    <div {...props} className="split-pane-bottom">
      <h2>Test cases</h2>
      {props.question && props.question.test_case.map((testCase, index) => (
      <div>
        <b><u>Input {index+1}:</u></b> {testCase}
        <br />
        <b><u>Expected output:</u></b> {props.question.expected_output[index]}
        <br /><br />
      </div>
      ))}

      <div>
        <input form='codeEditor' className='runCodeButton' type='submit' value='Run' onClick={props.handleRunCode}/>
        <Button>Run Test</Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export function SplitPaneLeft(props: any) {
  const topRef = useRef(0);
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};

export function SplitPaneRight(props: any) {
  // const { quotes, currQuote } = useContext(QuoteContext);
  // const quote = quotes.find((el) => el.id === currQuote);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default SplitPane;