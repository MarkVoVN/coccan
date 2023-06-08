"use client"

import { Box, Select, MenuItem, SelectChangeEvent, Menu } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function SessionSeletorSection() {
  const sessionList = [
    {id: '0', 
     title: '9:15AM',
    },
    {id: '1', 
      title: '11:45AM',
     },
     {id: '2', 
      title: '2:45PM',
     },
     {id: '3', 
      title: '5:15PM',
     }
  ]

  const [selectedSessionId, setSelectedSessionId] = useState('0');

  const handleSessionChange = (e: SelectChangeEvent) => {
    setSelectedSessionId(e.target.value);
  }
  return (
    <Box className='session-selector-container'>
      <Box sx={{width: '80vw'}}>
        <Select
          value={selectedSessionId}
          label="Session"
          onChange={handleSessionChange}
          autoWidth
          >
            {sessionList.map(session => (
              <MenuItem key={session.id} value={session.id}>{session.title}</MenuItem>
            ))}
        </Select>
      </Box>
    </Box>
  )
}

export default SessionSeletorSection