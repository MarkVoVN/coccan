import {
  useRecordContext,
  Show,
  SimpleShowLayout,
  useGetOne,
} from "react-admin";

export const SessionRepresentation = () => {
  const record = useRecordContext();
  // if (!record) return null;
  const { data: location } = useGetOne("locations", { id: record.locationId });
  const { data: timeslot } = useGetOne("timeslots", { id: record.timeSlotId });

  return (
    <span>
      {`${timeslot.startTime}-${timeslot.endTime} ${location.fullname}`}
    </span>
  );
};
