import React from "react";
import { Alert, Button, Space } from "antd";

const ErrorMessage: React.FC<any> = function errorMessage({ network }: any) {
  let errorDescription;
  if (!network) {
    errorDescription = "Please, check Your Internet connection";
  } else {
    errorDescription = "Please, refresh this page or wait for some time";
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert
        message="Oops, something went wrong :("
        showIcon
        description={errorDescription}
        type="error"
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button size="small" danger>
            Detail
          </Button>
        }
      />
    </Space>
  );
};
export default ErrorMessage;
