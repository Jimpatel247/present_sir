import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { classID } = router.query;
  return <div>{classID}</div>;
}

export default index;
