import { Tooltip, TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useOnlineStatus } from "./hooks/useOnlineStatus";

export const NetworkStatus = () => {
  const isOnline = useOnlineStatus();

  const circleSize = 15;
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: isOnline ? "green" : "red",
    marginRight: 10,
    border: "2px solid white",
  };

  return (
    <TooltipComponent content={isOnline ? "Network:Online" : "Network:Offline"}>
      <div style={circleStyle} />
    </TooltipComponent>
  );
};
