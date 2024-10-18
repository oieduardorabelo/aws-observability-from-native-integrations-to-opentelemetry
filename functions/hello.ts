import xray from "aws-xray-sdk-core";

export const handler = async (event, context) => {
  const segment = xray.getSegment();
  const customSegment = segment.addNewSubsegment("custom-segment");
  xray.setSegment(customSegment);
  console.log(JSON.stringify(event, null, 2));
  console.log(JSON.stringify(context, null, 2));
  console.log(JSON.stringify(process.env, null, 2));
  await new Promise((resolve) => setTimeout(resolve, 3000));
  customSegment.close();
};
