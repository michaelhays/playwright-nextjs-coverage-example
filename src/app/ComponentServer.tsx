async function getData() {
	return { hello: "world" };
}

export default async function PageComponentServer() {
	const data = await getData();

	if (data.hello === "hello") {
		console.log("reached");
	}

	if (data.hello === "foo") {
		console.log("never reached");
	}

	return <p>{data.hello}</p>;
}
