// import React, {useContext} from "react";
// import { Routes, Route } from "react-router-dom";
// import MainPage from "./pages/MainPage/MainPage";
// import AuthPage from "./pages/AuthPage/AuthPage";
// import { MyContext } from "./context/my-context/my-context";

// export const UseRoutes = () => {
//   const {token} = useContext(MyContext);
//   const isLogin = !!token

//   if (isLogin) {
//     return (
//       <Routes>
//         <Route path="/" exact component={MainPage} />
//       </Routes>
//     );
//   }
//   return (
//     <Routes>
//       <Route path="/login" exact component={AuthPage} />
//     </Routes>
//   );
// };