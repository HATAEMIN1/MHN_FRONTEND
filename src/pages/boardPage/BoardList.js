import React from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Searchbar from "../../components/search/Searchbar";
import FilterModal from "../../components/modal/FilterModal";
import ModalManager from "../../components/modal/ModalManager";

function BoardList({ posts }) {
    return (
        <div>
            <Header title="자유게시판" write="boards/new" />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Searchbar />
                <ModalManager
                    modalContent={({ closeModal }) => (
                        <FilterModal closeModal={closeModal} />
                    )}
                >
                    {({ openModal }) => (
                        <button
                            onClick={openModal}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                marginLeft: "10px",
                            }}
                        >
                            <img
                                src="/assets/images/filterIcon.svg"
                                alt="Filter Icon"
                            />
                        </button>
                    )}
                </ModalManager>
            </div>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <Link to={`/boards/${index}`} state={{ post }}>
                            {post.title}
                        </Link>
                        {post.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoardList;
