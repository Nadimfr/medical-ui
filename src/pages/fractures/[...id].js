import React from 'react'

const fracturePage = ({fractureData}) => {

    console.log(fractureData)
    
  return (
    <div>{fractureData.duration}</div>
  )
}

export default fracturePage;

export async function getServerSideProps(context, req, res) {

    const { id } = context.params;

    // Fetch data from an external API or database
    const fracture = await fetch(`http://localhost:8080/api/fractures/fractures/${id}`);
    const fractureData = await fracture.json();


    // Pass the data to the page via props
    return {
      props: {
        fractureData, // will be passed to the page component as props
      },
    };
  }
  