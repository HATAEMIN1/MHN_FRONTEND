import React from "react";

function Header({ ...props }) {
    return (
        <>
            {/* <div className="bg-slate-400">{props.title}</div> */}
            <div className="bg-slate-400 top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute">
                테스트
            </div>
        </>
    );
}

export default Header;
