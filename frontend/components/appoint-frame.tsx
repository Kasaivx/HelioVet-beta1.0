/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAppointments } from "@/hooks/hooks/appointments";
import { Appointment, AppointmentStatus, Props } from "@/types/appointments";
import style from "./appoint.module.css";

function dateFormatter(isoString: string) {
  if (!isoString) {
    return "no date";
  }

  const isoDate = new Date(isoString);
  if (Number.isNaN(isoDate.getTime())) return "invalid date";

  let date = isoDate.toLocaleString("en-DZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/algiers",
  });
  date = date.replace(".", "");
  return date;
}

export default function AppointmentsPage({
  search,
  setSearch,
}: Readonly<Props>) {
  const { data: appointments, isLoading } = useAppointments(search);

  if (isLoading) {
    return <p>LOADING. . . .</p>;
  }

  console.log(appointments);

  const statusStyles: Record<AppointmentStatus, string> = {
    PENDING: style.pending,
    CONFIRMED: style.confirmed,
    INPROGRESS: style.inprogress,
    COMPLETED: style.completed,
    CANCELLED: style.cancelled,
  };

  return (
    <div>
      <table className={style.appointtb}>
        <thead>
          <tr>
            <th className={style.appointthst}>Date</th>
            <th className={style.appointth}>Patient</th>
            <th className={style.appointth}>Owner</th>
            <th className={style.appointth}>Reason</th>
            <th className={style.appointth}>Vet</th>
            <th className={style.appointthest}>status</th>
          </tr>
        </thead>

        <tbody className={style.tbody}>
          {appointments?.map((appointment: Appointment) => (
            <tr key={appointment.id} className={style.appointholder}>
              <td className={style.appointtd}>
                {dateFormatter(appointment.date)}
              </td>
              <td className={style.appointtd}>{appointment.patient.PetName}</td>
              <td className={style.appointtd}>
                {appointment.patient.owner.name}
              </td>
              <td className={style.appointtd}>{appointment.reason}</td>
              <td className={style.appointtd}>
                DR.{appointment.vet.fullName}{" "}
              </td>
              <td className={style.appointtd}>
                <span
                  className={`${style.status} ${statusStyles[appointment.status]}`}
                >
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
