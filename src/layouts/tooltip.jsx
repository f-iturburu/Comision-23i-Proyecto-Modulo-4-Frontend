import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function TooltipQuestionmark({ message, item }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="auto"
      delay={{ show: 3, hide: 3 }}
      overlay={renderTooltip}
    >
      {item}
    </OverlayTrigger>
  );
}

export default TooltipQuestionmark;
