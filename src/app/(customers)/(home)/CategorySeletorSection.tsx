"use client"

import { Box, Stack, Typography, SvgIcon } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function CategorySeletorSection({categoryList} : {
  categoryList :
    {
      categoryId : number,
      categoryIconUrl : string,
      name: string,
    } []
}) {



  return (
    <Box className="category-wrapper">
      <Box className="category-section-container">
          <Typography variant='h3' className="category-title">Category</Typography>
          <Box className="category-list">
            {categoryList.map((category) => (
              <Box className="category-container" key={category.categoryId}>
                <Box className="category-icon-container">
                  <img src={'/homepage/category/' + category.categoryIconUrl} alt={category.name}></img>
                </Box>
                <Typography variant='h5'>{category.name}</Typography>
            </Box>
            ))}
          </Box>
        
      </Box>
    </Box>
  )
}

export default CategorySeletorSection