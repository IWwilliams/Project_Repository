import { Container } from "@mui/system";
import movieGrid from "../components/ui/movieGrid";

export default function movies(props) {
  return <Container>{props.children}</Container>;
}
