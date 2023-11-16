import { Link } from "react-router-dom";

function PageNotFound() {
  return <>
  <Link to='/'>Back to home</Link>
  <div>Opps! The page you are looking for does not exist</div>;
  </>
}

export default PageNotFound;
