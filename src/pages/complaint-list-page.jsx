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
  Paper 
} from '@mui/material'

const ComplaintListPage = () => {
  const [complaints, setComplaints] = useState([])
  const [municipalityId] = useState('garden-city-ut')

  const fetchComplaints = async () => {
    const url = `https://api.us-east.aws.tinybird.co/v0/pipes/complaint_table_dev_list.json?municipality_id=${municipalityId}&token=${import.meta.env.VITE_REACT_APP_TINYBIRD_API_KEY}`
    console.log(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setComplaints(data.data || [])
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  return (
    <Box>
      <Box position="sticky" top={0} bgcolor="background.default" p={3} zIndex={1}>
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
