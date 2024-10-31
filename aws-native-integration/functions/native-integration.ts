import xray from "aws-xray-sdk-core";

export const handler = async (event, context) => {
	const segment = xray.getSegment();

	const myDatabaseQuery = segment.addNewSubsegment("myDatabaseQuery");

	xray.setSegment(myDatabaseQuery);

	console.log(JSON.stringify(event, null, 2));
	console.log(JSON.stringify(context, null, 2));
	console.log(JSON.stringify(process.env, null, 2));

	await new Promise((resolve) => setTimeout(resolve, 3000));

	myDatabaseQuery.close();
};
