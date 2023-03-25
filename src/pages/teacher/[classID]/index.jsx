import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const { classID } = router.query;
  return <div>{classID}</div>;
}

export default Index;
