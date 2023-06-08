"use client"

import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { ArrowForward, HelpOutline } from '@mui/icons-material'

function CallToActionSection() {
  return (
    <Box className='cta-container flex flex-row justify-center' >
        <Box className='cta'>
            <Typography variant='h2' sx={{fontWeight: 600, color: '#EA5857'}}>
                Hungry?
            </Typography>
            <Typography variant='h2' sx={{fontWeight: 600}}>
                We&apos;ve got you covered.
            </Typography>
            <Typography variant='h5' sx={{fontWeight: 300}} className='cta-subtitle'>
                You are ordering from FPT Q9 Campus
            </Typography>
            <Stack direction='row' className='cta-btn-container'>
                <Button className='cta-btn-order' variant='contained' size='large' endIcon={<ArrowForward></ArrowForward>}>
                    Order now
                </Button>
                <Button className='cta-btn-guide' variant='outlined' size='large' endIcon={<HelpOutline></HelpOutline>}>
                    How to use
                </Button>
            </Stack>
        </Box>
    </Box>
  )
}

export default CallToActionSection