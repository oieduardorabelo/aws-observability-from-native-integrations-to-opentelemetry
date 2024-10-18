/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-lambda-native-integration",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Function("MyFunction", {
      handler: "functions/hello.handler",
      transform: {
        function: {
          tracingConfig: {
            mode: "Active",
          },
        },
        role: {
          managedPolicyArns: ["arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess"],
        },
      },
    });
  },
});
