"use client";

import { useState } from "react";

type Props = {
	buttonText: string;
};

export default function PageComponentClient({ buttonText }: Props) {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);

	if (count1 > 1) {
		console.log("reached");
	}

	if (count1 > 100) {
		console.log("never reached");
	}

	return (
		<div>
			<button type="button" onClick={() => setCount1(count1 + 1)}>
				{buttonText} {count1}
			</button>

			<button type="button" onClick={() => setCount2(count2 + 1)}>
				{buttonText} {count2}
			</button>
		</div>
	);
}
