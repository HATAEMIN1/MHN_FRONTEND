import React from "react";
import { Link } from "react-router-dom";

function PlusButton() {
    return (
        // <>
        //     <Link to="/" className="fixed bottom-[20px] right-[20px] z-50">
        //         <img src="/assets/images/plusIcon.svg" />
        //     </Link>
        // </>
        <div className="w-full ">
            {/* <div className="flex justify-end fixed bottom-[75px] z-50  "> */}
            <div className="flex justify-end absolute bottom-[75px] right-[20px] z-50 max-w-full">
                <Link to="/chatboards/new">
                    <img src="/assets/images/plusIcon.svg" />
                </Link>
            </div>
        </div>
    );
}

export default PlusButton;
