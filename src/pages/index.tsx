import type { NextPage } from "next";
import Head from "next/head";
import { Currency } from "../modules/currency";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Currency Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Currency />
    </div>
  );
};

export default IndexPage;
