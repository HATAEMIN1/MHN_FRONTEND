// // 페이지에 좋아요버튼 로그인유저에게만
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Header from "../../layouts/header/Header";
// import NavBar from "../../layouts/nav/NavBar";
// import axiosInstance from "../../utils/axios";
// import BoardComment from "./BoardComment";
// import { useSelector } from "react-redux";
// import ModalManager from "../../components/modal/ModalManager";
// import ButtonClear from "../../components/button/ButtonClear";

// function timeAgo(date) {
//     const now = new Date();
//     const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

//     if (secondsPast < 60) {
//         return `${Math.floor(secondsPast)}초 전`;
//     }
//     if (secondsPast < 3600) {
//         return `${Math.floor(secondsPast / 60)}분 전`;
//     }
//     if (secondsPast < 86400) {
//         return `${Math.floor(secondsPast / 3600)}시간 전`;
//     }
//     if (secondsPast < 2592000) {
//         return `${Math.floor(secondsPast / 86400)}일 전`;
//     }
//     if (secondsPast < 31536000) {
//         return `${Math.floor(secondsPast / 2592000)}개월 전`;
//     }
//     return `${Math.floor(secondsPast / 31536000)}년 전`;
// }

// function BoardView() {
//     const { bdId } = useParams();
//     const navigate = useNavigate();
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [likes, setLikes] = useState(0);
//     const [liked, setLiked] = useState(false);
//     const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
//     const memberId = useSelector((state) => state.userSlice.id); // Redux 스토어에서 사용자 ID 가져오기
//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const params = { freeBoardId: bdId };
//                 if (memberId) {
//                     params.memberId = memberId;
//                 }
//                 const response = await axiosInstance.get("/boards/view", {
//                     params,
//                 });
//                 const postData = response.data.data;
//                 setPost(postData);
//                 setLikes(postData.likeCount || 0); // likes 값이 없으면 0으로 초기화
//                 setLiked(postData.likedByCurrentUser); // 서버에서 가져오는 값으로 설정
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching post:", error); // 에러 디버깅을 위해 추가
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [bdId, memberId]);

//     const handleCommentsUpdate = (newCommentCount) => {
//         setPost((prevPost) => ({ ...prevPost, commentCount: newCommentCount }));
//     };

//     const handleLike = () => {
//         if (!memberId) {
//             alert("로그인한 유저만 좋아요를 누를 수 있습니다.");
//             return;
//         }

//         const url = liked ? "/boards/unlike" : "/boards/like";
//         axiosInstance
//             .post(url, null, { params: { freeBoardId: bdId, memberId } })
//             .then(() => {
//                 setLikes((prevLikes) =>
//                     liked ? prevLikes - 1 : prevLikes + 1
//                 );
//                 setLiked(!liked);
//             })
//             .catch((error) => {
//                 console.error(
//                     "There was an error updating the like status:",
//                     error
//                 );
//             });
//     };

//     const handleDelete = () => {
//         axiosInstance
//             .delete(`/boards/view`, { params: { freeBoardId: bdId, memberId } })
//             .then(() => {
//                 navigate("/boards"); // 삭제 후 게시판 목록으로 리디렉션
//             })
//             .catch((error) => {
//                 console.error("There was an error deleting the post:", error);
//             });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     if (!post || !post.member) {
//         return <div>게시물을 가져오는 데 문제가 발생했습니다.</div>;
//     }

//     const handleReport = async () => {
//         // e.preventDefault();
//         const body = {
//             memberId: memberId,
//             freeBoardId: bdId,
//         };

//         try {
//             await axiosInstance.post(`/boards/report`, body);
//         } catch (error) {
//             console.error("에러 발생:", error);
//         }
//     };

//     return (
//         <div className="pt-[2px] pb-8">
//             <Header title="자유게시판" />
//             <div className="flex justify-between">
//                 <div className="flex items-center mb-5 pt-[16px]">
//                     <div className="subtitle1 text-primary-300">
//                         {post.member.nickName}
//                     </div>
//                     <div
//                         className="body2 text-sub-100"
//                         style={{ marginLeft: "10px" }}
//                     >
//                         {timeAgo(post.createDate)}
//                     </div>
//                 </div>
//                 <div className="flex items-center">
//                     <ModalManager
//                         modalContent={({ closeModal }) => (
//                             <div>
//                                 <p className="mb-[8px]">
//                                     해당 게시글을 신고할까요?
//                                 </p>

//                                 <ButtonClear
//                                     text1="네"
//                                     text2="아니요"
//                                     handleClick={() => {
//                                         handleReport();
//                                         closeModal();
//                                         setIsSecondModalOpen(true); // 두 번째 모달 열기
//                                     }}
//                                     handleClick2={closeModal}
//                                 />
//                             </div>
//                         )}
//                     >
//                         {({ openModal }) => (
//                             <button type="button" onClick={openModal}>
//                                 <img
//                                     src="/assets/images/reportIcon.svg"
//                                     alt="신고"
//                                 />
//                             </button>
//                         )}
//                     </ModalManager>

//                     {/* 안내용 두번째 모달 */}
//                     <ModalManager
//                         isModalOpen={isSecondModalOpen}
//                         modalContent={({ closeModal }) => (
//                             <div>
//                                 <p className="mb-[8px]">
//                                     신고가 접수되었습니다.
//                                 </p>

//                                 <ButtonClear
//                                     text1="확인"
//                                     handleClick={() => {
//                                         closeModal();
//                                         setIsSecondModalOpen(false);
//                                     }}
//                                 />
//                             </div>
//                         )}
//                     >
//                         {({ openModal }) => (
//                             <div style={{ display: "none" }}></div>
//                         )}
//                     </ModalManager>
//                 </div>
//             </div>
//             <div className="mb-5">
//                 <Slider
//                     dots={true}
//                     infinite={false}
//                     speed={500}
//                     slidesToShow={1}
//                     slidesToScroll={1}
//                 >
//                     {post.imageList && post.imageList.length > 0 ? (
//                         post.imageList.map((image, index) => (
//                             <div key={index}>
//                                 <img
//                                     src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${image.fileName}`}
//                                     alt={`uploaded ${index}`}
//                                     className="w-full h-96 object-cover"
//                                 />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
//                             <p className="text-gray-500">이미지가 없습니다</p>
//                         </div>
//                     )}
//                 </Slider>
//             </div>
//             <div className="mb-5 flex items-center justify-between">
//                 <div className="flex items-center">
//                     <button
//                         onClick={handleLike}
//                         className="flex items-center mr-2 border-none bg-transparent cursor-pointer text-primary-300 mini"
//                     >
//                         <img
//                             src={
//                                 liked
//                                     ? `${process.env.PUBLIC_URL}/assets/images/likeIcon_color.svg`
//                                     : `${process.env.PUBLIC_URL}/assets/images/likeIcon_black.svg`
//                             }
//                             alt="like"
//                             className="w-5 h-5 mr-1 "
//                         />
//                         좋아요 {liked ? "취소" : ""} {likes}
//                     </button>
//                     <div className="flex items-center text-primary-300 mini">
//                         <img
//                             src={`${process.env.PUBLIC_URL}/assets/images/commentIcon.svg`}
//                             alt="comment"
//                             className="w-5 h-5 mr-1"
//                         />
//                         댓글 {post.commentCount}
//                     </div>
//                 </div>
//                 {post.member.id === memberId && (
//                     <button
//                         onClick={handleDelete}
//                         className="flex items-center border-none bg-transparent cursor-pointer text-gray-200 mini"
//                     >
//                         삭제
//                     </button>
//                 )}
//             </div>
//             <div className="mb-5">
//                 <p className="subtitle1 text-primary-300">{post.title}</p>
//             </div>
//             <div className="body2 text-primary-300 border-b pb-[8px]">
//                 {post.content}
//             </div>

//             {/* BoardComment 컴포넌트를 추가하고 필요한 props 전달 */}
//             <BoardComment
//                 freeBoardId={post.id}
//                 memberId={memberId}
//                 onCommentsUpdate={handleCommentsUpdate}
//             />

//             <NavBar />
//         </div>
//     );
// }

// export default BoardView;
