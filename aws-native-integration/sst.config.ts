/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "aws-native-integration",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const AWS_REGION = process.env.AWS_REGION;

		new sst.aws.Function("NativeIntegration", {
			handler: "functions/native-integration.handler",
			architecture: "x86_64",
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
