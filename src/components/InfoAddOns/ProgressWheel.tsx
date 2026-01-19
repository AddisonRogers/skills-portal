import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

type ProgressWheelProps = {
	progress: number;
	size?: number;
	strokeWidth?: number;
	colour?: string;
	trackColour?: string;
};

const PercentageText = ({
	progress,
	size,
}: {
	progress: number;
	size: number;
}) => {
	const fontSize = size * 0.22;
	const textStyle: React.CSSProperties = {
		fontSize: fontSize,
		fontWeight: "middle",
		dominantBaseline: "middle",
		textAnchor: "middle",
		fill: "#000000",
	};
	return (
		<text x="52%" y="52%" style={textStyle}>
			{`${progress}%`}
		</text>
	);
};

const ProgressWheel: React.FC<ProgressWheelProps> = ({
	progress,
	size = 75,
	strokeWidth = 8,
	colour = "#00b3ad",
	trackColour = "#e6e6e6",
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<svg width={size} height={size}>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={trackColour}
				strokeWidth={strokeWidth}
				fill="none"
			/>

			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={colour}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinecap="round"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
				style={{ transition: "stroke-dashoffset 0.5s ease" }}
			/>

			<PercentageText progress={progress} size={size} />
			{`${progress}%`}
		</svg>
	);
};

export default ProgressWheel;
