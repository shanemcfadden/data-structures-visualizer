export const ArrowHead = () => (
  <marker
    id={ARROW_HEAD_DEF_ID}
    viewBox={`0 0 ${ARROW_VIEWBOX_WIDTH} ${ARROW_VIEWBOX_WIDTH}`}
    refX={(ARROW_VIEWBOX_WIDTH / 2).toString()}
    refY={(ARROW_VIEWBOX_WIDTH / 2).toString()}
    markerWidth={ARROW_MARKER_WIDTH.toString()}
    markerHeight={ARROW_MARKER_WIDTH.toString()}
    orient="auto-start-reverse"
  >
    <path
      className="fill-black stroke-black"
      d={[
        "M 0 0",
        `L ${ARROW_VIEWBOX_WIDTH} ${ARROW_VIEWBOX_WIDTH / 2}`,
        `L 0 ${ARROW_VIEWBOX_WIDTH}`,
        "z",
      ].join(" ")}
    />
  </marker>
);

export const ARROW_HEAD_DEF_ID = "arrow";
export const ARROW_HEAD_REF = `url(#${ARROW_HEAD_DEF_ID})`;

const ARROW_VIEWBOX_WIDTH = 16;
const ARROW_MARKER_WIDTH = ARROW_VIEWBOX_WIDTH / 4;

export const getArrowHeadLength = (strokeWidth: number) =>
  (strokeWidth * ARROW_MARKER_WIDTH) / 2;
