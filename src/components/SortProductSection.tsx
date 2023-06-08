import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

function SortProductSection({sortMetricList, sortMetricId, handleChange} : {
  sortMetricList :
    {
      id : number,
      iconUrl : string,
      name: string,
    } [],
    sortMetricId: string,
    handleChange: (e: SelectChangeEvent) => void,
} ) 
{
  return (
    <div>
      <Select className='selector'
        value={sortMetricId}
        label="Sort by"
        labelId='sort-by-label-id'
        onChange={handleChange}
        autoWidth
        >
          {
            sortMetricList.map((item) => 
            (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
          )}
      </Select>
    </div>
  )
}

export default SortProductSection;