import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import userCheck from "./userCheck";

const privateAdminRoute = ()=>{

  const isLogin = userCheck();
  //null이면 로그인 안함, true면 관리자계정, false면 일반유저

  //로그인을 안했으면 첫 페이지로 이동
  if(isLogin != null && isLogin === true) {
    return <Navigate replace to="/" />;
  }
  
  //로그인을 했다면 그대로
  return <Outlet />;
}

export default privateAdminRoute;