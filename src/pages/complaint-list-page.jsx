import React, { useState } from 'react'
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'

const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([])
  const [municipalityId, setMunicipalityId] = useState('crested-butte-co') // crested-butte-co

  const municipalities = [
    'crested-butte-co',
    'garden-city-ut',
    'mountain-village-co',
  ]

  // let's create a function that converts the municipalityId to a human-readable name
  // it will replace the '-' with a space and capitalize the first letter of each word
  // the last part after the final '-' will be the state abbreviation and there will be a comma and space after the city name and the state abbreviation will be all uppercase
  const formatMunicipalityId = (municipalityId) => {
    const parts = municipalityId.split('-')
    const city = parts.slice(0, -1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    const state = parts.slice(-1)[0].toUpperCase()
    return `${city}, ${state}`
  }


  const fetchComplaints = async () => {
    const url = `https://api.us-east.aws.tinybird.co/v0/pipes/complaint_table_dev_list.json?municipality_id=${municipalityId}&token=${import.meta.env.VITE_REACT_APP_TINYBIRD_API_KEY}`
    console.log(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setComplaints(data.data || [])
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  return (
    <Box>
      <Box position="sticky" top={0} bgcolor="background.default" p={3} zIndex={1}>
        <FormControl variant="outlined" style={{ marginRight: '10px' }}>
          <InputLabel id="municipality-select-label">Municipality</InputLabel>
          <Select
            labelId="municipality-select-label"
            value={municipalityId}
            onChange={(e) => setMunicipalityId(e.target.value)}
            label="Municipality"
          >
            {/* <MenuItem value="crested-butte-co">Crested Butte, CO</MenuItem>
            <MenuItem value="garden-city-ut">Garden City, UT</MenuItem> */}
            {municipalities.map(municipality => (
              <MenuItem key={municipality} value={municipality}>
                {formatMunicipalityId(municipality)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          onClick={fetchComplaints}
        >
          Get Complaints
        </Button>
      </Box>

      <Box p={3}>
        {complaints.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>System Number</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Incident Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint, index) => (
                  <TableRow key={complaint.system_number || index}>
                    <TableCell>{complaint.system_number}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.incident_date}</TableCell>
                    <TableCell>{complaint.incident_location}</TableCell>
                    <TableCell>{complaint.incident_type}</TableCell>
                    <TableCell>{complaint.created_by_email}</TableCell>
                    <TableCell>{complaint.status}</TableCell>
                    <TableCell>{complaint.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  )
}

export default ComplaintListPage
