import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function middleWares(WrappedComponent) {
  const Wrapper = (props) => {
    const role = Cookies.get("role");
    const router = useRouter();
    useEffect(() => {
      const url = router.pathname;
      if (role !== "teacherRole" && url.includes("/Teacher")) {
        router.push("/auth/Login");
      } else if (role !== "adminRole24" && url.includes("/Admin")) {
        router.push("/auth/Login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
  return Wrapper;
}

export default middleWares;
