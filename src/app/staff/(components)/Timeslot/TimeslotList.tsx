"use client";

import { Datagrid, EditButton, List, ShowButton, TextField } from "react-admin";

export const TimeslotList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="startTime" />
      <TextField source="endTime" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
