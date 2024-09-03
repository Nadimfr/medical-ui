import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const fracturePage = ({ fractureData }) => {
  const router = useRouter();
  const [showLoadingPage, setShowLoadingPage] = useState(false);

  useEffect(() => {
    !fractureData && setShowLoadingPage(true);
  }, []);

  return (
    <>
      <Loading show={showLoadingPage} />

      <Layout cn={`${montserrat.className} mt-0`}>
        <div className={`font-semibold text-xl mb-5`}>
          Here are our recommendations for the next {fractureData.duration}weeks
          to get better the soonest!
        </div>

        <div className="flex items-start gap-4">
          <img src={fractureData.image} />

          <div>
            <div>
              <span className="font-bold text-md">9 A.M : </span>
              {fractureData?.solutions[0].solution}
            </div>
            <div>
              <span className="font-bold text-md">3 P.M : </span>
              {fractureData?.solutions[1].solution}
            </div>
            <div>
              <span className="font-bold text-md">6 P.M : </span>
              {fractureData?.solutions[2].solution}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 mt-2">
          <Button
            onClick={() => router.push("/")}
            secondary
            title="Go Back to Home Page"
          />
          <Button
            onClick={() => router.push("/fractures")}
            primary
            title="Check my fractures"
          />
        </div>
      </Layout>
    </>
  );
};

export default fracturePage;

export async function getServerSideProps(context, req, res) {
  const { id } = context.params;

  // Fetch data from an external API or database
  const fracture = await fetch(
    `http://localhost:8080/api/fractures/fractures/${id}`
  );
  const fractureData = await fracture.json();

  // Pass the data to the page via props
  return {
    props: {
      fractureData, // will be passed to the page component as props
    },
  };
}
