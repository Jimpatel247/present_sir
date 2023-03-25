import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const { classID } = router.query;
  const a = 5;
  return <div>{classID}</div>;
}

export default Index;
