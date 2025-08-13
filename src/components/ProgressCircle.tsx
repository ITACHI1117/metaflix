export const ProgressCircle = ({ progress }) => {
  const radius = 20; // circle radius
  const stroke = 4; // circle thickness
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="rotate-[-90deg]" // start from top
    >
      {/* Background circle */}
      <circle
        stroke="black"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress circle */}
      <circle
        stroke="currentColor"
        className="text-primary"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Text */}
      {/* <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-sm fill-current"
      >
        {progress}%
      </text> */}
    </svg>
  );
};
