import React from "react";
import QrReader from "react-qr-reader";
import Page from "../components/Page";

function QR(props) {
  const handleScan = (data) => {
    if (data) {
      props.onScan(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Page>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </Page>
  );
}

export default QR;
