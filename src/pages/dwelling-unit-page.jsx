import React, { useState } from 'react'

const DwellingUnitPage = () => {
  const [municipalityId, setMunicipalityId] = useState('crested-butte-co')

  const fetchComplaints = async () => {
    const url = `https://api.us-east.aws.tinybird.co/v0/pipes/dwelling_unit_table_dev_list.json?municipality_id=${municipalityId}&token=${import.meta.env.VITE_REACT_APP_TINYBIRD_API_KEY}`
    console.log(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      // setComplaints(data.data || [])
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  return (
    <div>
      <button onClick={fetchComplaints}>Fetch Dwelling Units</button>
      <h1>Dwelling Unit Page</h1> 
    </div>
  )
}

export default DwellingUnitPage
