import React, { useState } from "react";
import Icons from "../assets/Icons";

function PetDropDown() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            PetDropDown
            <button onClick={() => setOpen(!open)}>목록</button>
            <ul>
                <li>강아지</li>
                <li>고양이</li>
            </ul>
        </div>
    );
}

export default PetDropDown;
