import { useEffect, useState } from "preact/hooks";

const randomColorString = () => {
	const digits = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
	];
	const color = new Array(6)
		.fill("")
		.map(() => digits[Math.floor(Math.random() * digits.length)])
		.join("");

	return `#${color}`;
};

enum resultEnum {
	corret,
	wrong,
}

const Landing = () => {
	const [color, setColor] = useState<string>("");
	const [answers, setAnswer] = useState<string[]>([]);
	const [result, setResult] = useState<resultEnum | undefined>();
	const [resultTrack, setResultTrack] = useState<{
		correct: number;
		wrong: number;
	}>({
		correct: 0,
		wrong: 0,
	});

	const pickColor = async () => {
		const actualColor = randomColorString();
		setColor(actualColor);
		const suffleArray = [
			actualColor,
			randomColorString(),
			randomColorString(),
		].sort(() => 0.5 - Math.random());
		setAnswer(suffleArray);
	};

	useEffect(() => {
		pickColor();
	}, []);

	const handleChooseAnswer = (c: string) => {
		if (c === color) {
			setResult(resultEnum.corret);
			setResultTrack({
				...resultTrack,
				correct: resultTrack.correct + 1,
			});
			pickColor();
		}

		if (c !== color) {
			setResult(resultEnum.wrong);
			setResultTrack({
				...resultTrack,
				wrong: resultTrack.wrong + 1,
			});
			pickColor();
		}
	};

	return (
		<div class="w-full min-h-screen flex justify-center items-center flex-col">
			<h1 class="font-semibold text-2xl">Guess Color</h1>
			<div
				class="w-96 mt-6 h-48  rounded-lg"
				style={{ backgroundColor: color }}
			></div>
			<div class="space-x-5 mt-5">
				{answers.map((b) => (
					<button
						key={b}
						onClick={() => handleChooseAnswer(b)}
						class="bg-zinc-200 px-4 py-2 border rounded-md border-black border-opacity-20"
					>
						{b}
					</button>
				))}
			</div>
			<h1
				class="mt-3"
				style={{
					color: result === resultEnum.corret ? "green" : "red",
				}}
			>
				{result === resultEnum.corret && "Correct Answer"}
				{result === resultEnum.wrong && "Wrong Answer"}
			</h1>
			<div class="flex space-x-5 mt-6">
				<p>Total: {resultTrack.correct + resultTrack.wrong}</p>
				<p>Correct: {resultTrack.correct}</p>
				<p>Wrong: {resultTrack.wrong}</p>
			</div>
		</div>
	);
};

export default Landing;
