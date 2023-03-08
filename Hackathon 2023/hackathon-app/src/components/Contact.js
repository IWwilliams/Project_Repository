export default function Contact(props) {
  return (
    <div>
      <div>
        <h2>{"Patient "}</h2>
        <h3>{props.content.name}</h3>
      </div>
      <div>
        <p>{props.content.phone}</p>
      </div>
      <h2>{"Care Team"}</h2>
      {props.content.careTeam.map((member) => {
        console.log(member);
        return (
          <div>
            <h3>{member.name}</h3>
            <p>{member.phone}</p>
          </div>
        );
      })}
    </div>
  );
}
