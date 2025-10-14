import { Stage, Layer, Rect, Text, Label, Arrow } from "react-konva";
import { ARROW } from "../../../Data/numerology";
const ArrowNumb = ({ wRightPanel, arr, typeArrow, stroke }) => {
  const widthWindow = window.innerWidth;
  let wMatrix =
    widthWindow < 576
      ? wRightPanel * 0.6
      : widthWindow >= 576 && widthWindow < 992
      ? wRightPanel * 0.6
      : widthWindow >= 992 && widthWindow < 1200
      ? wRightPanel * 0.68
      : widthWindow >= 1200 && widthWindow < 1400
      ? wRightPanel * 0.6
      : wRightPanel * 0.5;
  const hMatrix = wMatrix;
  let hMatrixStage = widthWindow < 768 ? hMatrix * 0.3 : hMatrix * 0.3;
  const x0 = 10;
  const y0 = 20;
  const arrW = wMatrix * 0.95;
  return (
    <div className="mt-2">
      <Stage width={wMatrix + 20} height={hMatrixStage}>
        <Layer>
          <Text
            x={x0 * 2}
            y="10"
            width={arrW * 0.5}
            align="left"
            text={ARROW[arr][typeArrow].TEN}
            fontStyle="bold"
            fontSize={arrW * 0.05}
          />
          {[...Array(3)].map((_, iNum) => {
            return (
              <Label
                key={`empNum${iNum}`}
                x={x0 + arrW * 0.5 + (arrW / 6) * iNum}
                y={y0 * 0.15 + 10}
              >
                <Text
                  width={arrW / 6}
                  align="center"
                  text={arr[iNum]}
                  fontStyle="bold"
                  fontSize={arrW * 0.05}
                />
              </Label>
            );
          })}
          <Arrow
            points={[
              x0 + (wMatrix * 0.05) / 2,
              y0 + 25,
              x0 + hMatrix * 0.95 + 10,
              y0 + 25,
            ]}
            stroke={stroke}
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ArrowNumb;
