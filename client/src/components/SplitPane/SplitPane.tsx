import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import CodeContext from "./CodeContext";
import SplitPaneContext from "./SplitPaneContext"
  
const SplitPane = ({ children, ...props }) => {
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

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = (props) => {
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
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
      <h1>Question</h1>
    </div>
  );
};

export const SplitPaneBottom = (props) => {
  // const { currQuote } = useContext(QuoteContext);
  return (
    <div {...props} className="split-pane-bottom">
      <div>Test case:</div>
    </div>
  );
};

export const SplitPaneLeft = (props) => {
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

export const SplitPaneRight = (props) => {
  // const { quotes, currQuote } = useContext(QuoteContext);
  // const quote = quotes.find((el) => el.id === currQuote);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default SplitPane;