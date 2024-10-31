/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "aws-distro-for-opentelemetry",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const AWS_REGION = process.env.AWS_REGION;

		new sst.aws.Function("Adot", {
			handler: "functions/adot.handler",
			architecture: "x86_64",
			layers: [
				`arn:aws:lambda:${AWS_REGION}:901920570463:layer:aws-otel-nodejs-amd64-ver-1-18-1:4`,
			],
			environment: {
				AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
			},
			nodejs: {
				format: "cjs",
				esbuild: {
					external: ["@opentelemetry/api"],
				},
			},
			transform: {
				function: {
					tracingConfig: {
						mode: "Active",
					},
				},
				role: {
					managedPolicyArns: [
						"arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
						"arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess",
					],
				},
			},
		});
	},
});
