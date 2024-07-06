// BoardView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";

function BoardView({ posts }) {
    const { bdId } = useParams();
    const post = posts[bdId];

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Header title={post.title} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div>작성자: {post.userName}</div>
                <div>작성 시간: {post.createdAt}</div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                }}
            >
                {post.images.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`uploaded ${index}`}
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                    />
                ))}
            </div>
            <div>{post.content}</div>
        </div>
    );
}

export default BoardView;
