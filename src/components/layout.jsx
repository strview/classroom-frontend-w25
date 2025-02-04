import { Box, Grid, Tabs, Tab } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ComplaintListPage from '../pages/complaint-list-page'
import DwellingUnitPage from '../pages/dwelling-unit-page'
// import NoMuni from '../pages/public/no-muni'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation
} from "react-router-dom"

// Create a wrapper component for the tabs functionality
const TabNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState(0)

    // Update tab value when location changes
    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/complaint-list') {
            setValue(0)
        } else if (location.pathname === '/dwelling-unit-page') {
            setValue(1)
        }
    }, [location])

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (newValue === 0) {
            navigate('/complaint-list')
        } else if (newValue === 1) {
            navigate('/dwelling-unit-page')
        }
    }

    return (
        <Box sx={{ 
            width: '100%', 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                bgcolor: 'background.paper',
                position: 'sticky',
                top: 0,
                zIndex: 1
            }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Complaint List" />
                    <Tab label="Dwelling Unit" />
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Routes>
                    <Route path="/" element={<ComplaintListPage />} />
                    <Route path="/complaint-list" element={<ComplaintListPage />} />
                    <Route path="/dwelling-unit-page" element={<DwellingUnitPage />} />
                </Routes>
            </Box>
        </Box>
    )
}

const Layout = () => {
    return (
        <Router>
            <TabNavigation />
        </Router>
    )
}

export default Layout
