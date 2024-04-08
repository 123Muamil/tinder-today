import React, { useState, useRef } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path, Circle, G, Text } from 'react-native-svg';
const CircularSlider = ({ width, height, value, meterColor, textColor, onValueChange }) => {
  const [cx, setCx] = useState(width / 2); 
  const [cy, setCy] = useState(height / 2);
  const [r, setR] = useState((Math.min(width, height) / 2) * 0.85);
  console.log(value)
  const polarToCartesian = (angle) => {
    const a = (angle - 270) * Math.PI / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));
    return { x, y };
  };

  const cartesianToPolar = (x, y) => {
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI); 
let result = angle >= 0 ? angle : 360 + angle; 
return Math.round(result);

  };

  const handlePanResponderMove = ({ nativeEvent: { locationX, locationY } }) => {
    onValueChange(cartesianToPolar(locationX, locationY));
  };

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove
    })
  ).current;

  const startCoord = polarToCartesian(0);
  const endCoord = polarToCartesian(value);

  return (
    <View>
     <View>
      <Svg width={width} height={height}>
      <Circle cx={cx} cy={cy} r={r} stroke='rgba(27, 30, 67, 0.20)' strokeWidth={17} fill='none' />
      <Path
        stroke={meterColor}
        strokeWidth={17}
        fill='none'
        d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
      />
      <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
        <Circle cx={7.5} cy={7.5} r={15} fill="#FFF" {..._panResponder.panHandlers} />
      </G>
    </Svg>
     </View>
   
    </View>
  );
};

export default CircularSlider;
