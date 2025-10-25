export const ArrowHead = () => (
  <marker
    id={ARROW_HEAD_DEF_ID}
    viewBox={`0 0 ${ARROW_HEAD_LENGTH} ${ARROW_HEAD_LENGTH}`}
    refX={(ARROW_HEAD_LENGTH / 2).toString()}
    refY={(ARROW_HEAD_LENGTH / 2).toString()}
    markerWidth={(ARROW_HEAD_LENGTH / 2).toString()}
    markerHeight={(ARROW_HEAD_LENGTH / 2).toString()}
    orient="auto-start-reverse"
  >
    <path
      className="fill-black stroke-black"
      d={[
        "M 0 0",
        `L ${ARROW_HEAD_LENGTH} ${ARROW_HEAD_LENGTH / 2}`,
        `L 0 ${ARROW_HEAD_LENGTH}`,
        "z",
      ].join(" ")}
    />
  </marker>
);

export const ARROW_HEAD_DEF_ID = "arrow";
export const ARROW_HEAD_REF = `url(#${ARROW_HEAD_DEF_ID})`;

export const ARROW_HEAD_LENGTH = 6;
