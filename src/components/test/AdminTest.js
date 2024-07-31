// import React from "react";
// import Header from "../../layouts/header/Header";
// import AdminNav from "../../layouts/nav/AdminNav";
// import { useSelector } from "react-redux";

// function AdminTest() {
//     const loginState = useSelector((state) => {
//         console.log(state.userSlice);
//         console.log(state.userSlice.id);
//     });
//     return (
//         {loginState && loginState.memberTypeList[0]=="ADMIN"?(  <>
//             <Header title="관리자 페이지 테스트" />
//             <AdminNav />
//         </>):(null)}

//     );
// }

// export default AdminTest;
import React from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminTest() {
    const loginState = useSelector((state) => state.userSlice);

    return (
        <>
            {loginState &&
            loginState.memberTypeList &&
            loginState.memberTypeList[0] === "ADMIN" ? (
                <>
                    <Header title="관리자 페이지" />
                    <AdminNav />
                </>
            ) : (
                <>
                    <p>잘못된접근입니다</p>
                    <Link to="/users/login">
                        <button>로그인 페이지로</button>
                    </Link>
                </>
            )}
        </>
    );
}

export default AdminTest;
