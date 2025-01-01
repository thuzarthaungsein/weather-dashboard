export default function CompassSVG({ degree }: { degree: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-safari"
      style={{
        transform: `rotate(${degree}deg)`,
        transition: "transform 0.5s ease",
        color: "#ccc",
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </svg>
  );
}
