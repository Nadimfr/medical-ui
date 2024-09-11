import Button from "@/components/Button";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ModalCmp from "@/components/ModalCmp";
import Table from "@/components/Table";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const columns = [
  { Header: "ID", accessor: "_id" },
  { Header: "Fracture Confidence", accessor: "confidence" },
  { Header: "Duration", accessor: "duration" },
];

const fractures = ({ userData, userFracturesData }) => {
  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [fractureData, setFractureData] = useState({});

  const getFractureData = async (id) => {
    setShowLoadingPage(true);
    const fracture = await fetch(
      `http://localhost:8080/api/fractures/fractures/${id}`
    );
    const fractureData = await fracture.json();
    console.log(id);
    setFractureData(fractureData);
    setShowLoadingPage(false);
    setResultModal(true);
  };

  useEffect(() => {
    !userFracturesData && setShowLoadingPage(true);
  }, [userFracturesData]);

  return (
    <>
      <Loading show={showLoadingPage} />

      <main
        className={`flex min-h-screen flex-col items-center justify-between overflow-x-hidden ${montserrat.className}`}
      >
        <Header user={userData} />

        <div className="mt-[150px] mb-[45px] bg-white flex items-center justify-between w-full px-8 lg:px-[70px]">
          <Table
            columns={columns}
            data={userFracturesData}
            resultApi={(e) => getFractureData(e)}
          />
        </div>
      </main>

      {resultModal && (
        <div>
          <ModalCmp
            onClose={() => setResultModal(false)}
            onOutsideCLick={() => setResultModal(false)}
            title="Results"
          >
            <div className={`font-semibold text-xl mb-5`}>
              Here are our recommendations for the next {fractureData?.duration}
              weeks to get better the soonest!
            </div>

            <div className="flex lg:flex-row flex-col items-start gap-4">
              <img
                className="lg:h-[500px] lg:w-fit h-[250px] w-full"
                src={fractureData?.image}
              />

              <div>
                <div className="text-xl">
                  <span className="font-bold text-xl">9 A.M : </span>
                  {fractureData?.solutions[0]?.solution}
                </div>
                <div className="text-xl">
                  <span className="font-bold text-xl">3 P.M : </span>
                  {fractureData?.solutions[1]?.solution}
                </div>
                <div className="text-xl">
                  <span className="font-bold text-xl">6 P.M : </span>
                  {fractureData?.solutions[2]?.solution}
                </div>
              </div>
            </div>
          </ModalCmp>
        </div>
      )}
    </>
  );
};

export default fractures;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const userId = cookies.id;
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/", // Redirect to the home page
        permanent: false,
      },
    };
  }

  const user = await fetch(`http://localhost:8080/api/users/${userId}`);
  const userData = await user.json();
  const userFractures = await fetch(
    `http://localhost:8080/api/fractures/${userId}`
  );
  const userFracturesData = await userFractures.json();

  // Pass the data to the page via props
  return {
    props: {
      userData,
      userFracturesData,
    },
  };
}
