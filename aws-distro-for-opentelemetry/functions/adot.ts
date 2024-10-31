import opentelemetry from "@opentelemetry/api";

const tracer = opentelemetry.trace.getTracer(
	process.env.AWS_LAMBDA_FUNCTION_NAME as string,
);

exports.handler = async (event, context) => {
	const myDatabaseQuery = tracer.startSpan("myDatabaseQuery");

	console.log(JSON.stringify(event, null, 2));
	console.log(JSON.stringify(context, null, 2));
	console.log(JSON.stringify(process.env, null, 2));

	await new Promise((resolve) => setTimeout(resolve, 3000));

	myDatabaseQuery.end();
};
