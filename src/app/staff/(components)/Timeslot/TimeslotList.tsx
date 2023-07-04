"use client";

import { Datagrid, List, TextField } from "react-admin";

export const TimeslotList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="startTime" />
      <TextField source="endTime" />
    </Datagrid>
  </List>
);
