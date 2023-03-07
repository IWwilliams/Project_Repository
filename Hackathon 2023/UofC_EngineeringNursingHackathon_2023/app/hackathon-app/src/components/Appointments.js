export default function Appointments(props) {
  return (
    <div>
      <h2>Appointments</h2>
      {props.content.map((appointment) => {
        console.log(appointment);
        return <h4>{appointment.date.toString()}</h4>;
      })}
    </div>
  );
}
