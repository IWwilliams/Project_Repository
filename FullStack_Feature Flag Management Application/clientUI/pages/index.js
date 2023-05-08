import React, { useMemo } from "react";
import handler from "./api/fetchHandler";

import DataTable from "../components/Table/DataTable";
function HomePage(props) {
  let featureData = props.data.status && props.data.data;

  return (
    <React.Fragment>
      <DataTable data={props.data.data} />
    </React.Fragment>
  );
}
export default HomePage;

export async function getStaticProps() {
  const response = await handler({
    url: "http://localhost:3001/featureflags",
    method: "GET",
  });
  if (response.status) {
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  } else {
    console.log(response.statusText);
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  }
}
