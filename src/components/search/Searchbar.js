import React, { useState } from "react";

function Searchbar({ onSearch }) {
    const [search, setSearch] = useState("");

    function handleSearch(e) {
        if (e.key === "Enter" || e.type === "click") {
            onSearch(search); // 페이지에서 전달받은 검색 로직 실행
            setSearch("");
        }
    }

    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
    };

    const iconStyle = {
        position: "absolute",
        left: "10px",
        width: "20px",
        height: "20px",
        cursor: "pointer",
    };

    const inputStyle = {
        flexGrow: 1,
        height: "100%",
        padding: "0 10px 0 35px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxSizing: "border-box",
        textAlign: "center",
        outline: "none",
    };

    return (
        <div style={containerStyle}>
            <img
                src="/assets/images/searchIcon.svg"
                alt="search icon"
                style={iconStyle}
                onClick={handleSearch}
            />
            <input
                type="text"
                placeholder="검색어"
                style={inputStyle}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                value={search}
            />
        </div>
    );
}

export default Searchbar;
