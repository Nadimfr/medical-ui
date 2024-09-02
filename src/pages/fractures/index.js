import Header from "@/components/Header";
import Loading from "@/components/Loading";
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
          <Table columns={columns} data={userFracturesData} />
        </div>
      </main>
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
