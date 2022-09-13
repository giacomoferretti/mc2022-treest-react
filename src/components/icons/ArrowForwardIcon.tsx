import Svg, { Path, SvgProps } from "react-native-svg";

const ArrowForwardIcon = (props: SvgProps) => (
  <Svg height={48} width={48} viewBox="0 0 48 48" {...props}>
    <Path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
  </Svg>
);

export default ArrowForwardIcon;
