
import Main from "./components/Main";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, Outlet } from 'react-router-dom';
import RouteSearch from "./pages/route/RouteSearch";
import RouteMain from "./pages/route/RouteMain";
import RouteSelect from "./pages/route/RouteSelect";
import Friend from "./components/Friend";
import Settings from "./components/Settings";

import LoginPage from "./pages/account/LoginPage";
import TermsOfUse from "./pages/account/TermsOfUse";
import InsertMember from "./pages/account/InsertMember";
import Withdraw from "./components/Withdraw";
import Information from "./components/Information";
import Community from "./pages/community/Community";
import CommunityDetail from "./pages/community/CommunityDetail";
import LocationPicker from "./pages/community/LocationPicker";
import ReportForm from "./pages/community/ReportForm";
import ComplaintPage from "./pages/community/ComplaintPage";
import CustomComplaintPage from "./pages/community/CustomComplaintPage";
import AskPage from "./components/AskPage";
import Mypage from "./components/Mypage";
import InquiryList from "./components/InquiryList";
import SearchId from "./pages/account/SearchId";
import SearchPwd from "./pages/account/SearchPwd";
import AdminPost from "./pages/admin/AdminPost";
import AdminAsk from "./pages/admin/AdminAsk";
import CompleteInsert from "./pages/account/CompleteInsert";
import ChatList from "./pages/chat/ChatList";
import ChatRoom from "./pages/chat/ChatRoom";
import InquiryDetails from "./components/InquiryDetails";
import Check from "./components/Check";
import AdminComments from "./pages/admin/AdminComments";
import AdminAskList from "./pages/admin/AdminAskList";
import AdminHeader from "./components/AdminHeader";
import PrivateUserRoute from "./config/privateUserRoute";
import PrivateAdminoute from "./config/privateAdminRoute";
import ReportEditForm from "./pages/community/ReportEditForm";
import { Member } from "./type/user";
import { useEffect } from "react";

import AdminPage from "./pages/admin/AdminPage";
import AdminMember from "./pages/admin/AdminMember";
import AdminMemberDetail from "./pages/admin/AdminMemberDetail";

import AdminPostDetail from "./pages/admin/AdminPostDetail";

import SocialLogin from "./pages/account/SocialLogin";
import useUserCheck from "./config/userCheck";
import AdminCommentDetail from "./pages/admin/AdminCommentDetail";



function App() { 
  
  let userCheck = useUserCheck();
  
  useEffect(() => {
    if(sessionStorage.getItem('tokenDelete')==null){
      localStorage.removeItem('accessToken');

      userCheck = null;
    }
    sessionStorage.setItem('tokenDelete','true');
    //근데 이렇게 할꺼면 그냥 세션에다 저장하는게 낫지않나... 흠...
    //사실 유효시간 검사해서 지워버리는게 가장 좋은방법같은데
    //그렇게 할려면 모든 페이지에서 지속적으로 갱신을 해줘야하는데
    //그게 쉽지가 않네
    //새 탭 열때마다 로그인을 해야하는데
    //일단은 넘어가고 나중에 바꾸던가 해야겠음.
  }, []);

  return (
      <Routes>
      { 
        userCheck === null ?
          (
            <>
            {/* //로그인이 필요없는 애들   */}
            
            <Route path="/" element={<LoginPage/>} />
            <Route path="/search/Id" element={<SearchId/>} />
            <Route path="/search/Pwd" element={<SearchPwd/>} />
            <Route path="/join" element={<TermsOfUse/>}/>
            <Route path="/join/insert" element={<InsertMember />} />
            <Route path="/success" element={<SocialLogin/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
          
            </>
            )  : 
            userCheck == false ? 
            (
              <>
              <Route path="/" element={<RouteMain />} />
              <Route path="/main" element={<RouteMain />} />
              <Route path="/route/search" element={<RouteSearch />} />
              <Route path="/route/select" element={<RouteSelect />} />
                
              <Route path="/community" element={<Community />} />
              <Route path="/community/report" element={<ReportForm />} />
              <Route path="/community/edit/:postNo" element={<ReportEditForm />} />
              <Route path="/community/report/map" element={<LocationPicker />} />
              <Route path="/community/detail/:postNo" element={<CommunityDetail />} />
              <Route path="/Chat/ChatList" element={<ChatList />} />
              <Route path="/Chat/ChatRoom/:chatRoomNo" element={<ChatRoom/>} /> 
              <Route path="/Mypage" element={<Mypage />} />
              <Route path="/Mypage/Information" element={<Information />} />
              <Route path="/community/complain" element={<ComplaintPage />} />
              <Route path="/community/complain/custom" element={<CustomComplaintPage />} />

              <Route path="/Mypage/Check" element={<Check />} />
              <Route path="/Mypage/Withdraw" element={<Withdraw />} />
              <Route path="/Mypage/Friend" element={<Friend />} />
              <Route path="/Settings" element={<Settings />}/>
              <Route path="InquiryList" element={<InquiryList />}/>
              <Route path="InquiryList/AskPage" element={<AskPage />}/>
              <Route path="InquiryDetails/:inquireNo" element={<InquiryDetails />}/>
              <Route path="*" element={<Navigate to="/" />}/>
              </>
            ) :
            (
              <>
              <Route path="/" element={<AdminPage />} />
              <Route path="/main" element={<AdminPage />} />
              <Route path="/admin/AdminMember" element={<AdminMember />} />
              <Route path="/admin/AdminMember/:memberNo" element={<AdminMemberDetail />} />
              <Route path="/Mypage" element={<Mypage />} />
              <Route path="/Mypage/Check" element={<Check />} />
              <Route path="/Mypage/Withdraw" element={<Withdraw />} />
              <Route path="/Mypage/Friend" element={<Friend />} />
              <Route path="/Settings" element={<Settings />}/>
              {/* 문의 라우트 */}
              <Route path="/admin/AdminAskList" element={<AdminAskList />} /> 
              <Route path="/admin/AdminAsk/:id" element={<AdminAsk />} />  
              {/* 커뮤니티 라우트 */}
              <Route path="/admin/AdminPost" element={<AdminPost />} />  
              <Route path="/admin/AdminPost/:memberNo" element={<AdminPost />} />  
              <Route path="/community" element={<Community />} />
              <Route path="/community/report" element={<ReportForm />} />
              <Route path="/community/edit/:postNo" element={<ReportEditForm />} />
              <Route path="/community/report/map" element={<LocationPicker />} />
              <Route path="/community/detail/:postNo" element={<CommunityDetail />} />

              <Route path="/admin/AdminPostDetail/:postNo" element={<AdminPostDetail />} />              
              <Route path="/admin/AdminComments" element={<AdminComments />} /> 
              <Route path="/admin/AdminCommentDetail/:commentNo" element={<AdminCommentDetail />} /> 
              <Route path="*" element={<Navigate to="/"/>}/> 
              </>
            )
      }
    </Routes>
  );
}
export default App;

