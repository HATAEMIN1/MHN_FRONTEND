import React from "react";

function DoctorRegisterPending() {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="text-center px-4 max-w-full">
                <p>가입 요청이 완료되었습니다!👏🏻🥰</p>
                <p>
                    가입 <span className="font-bold">요청하신 이메일 주소</span>
                    를 통해
                </p>
                <p className="title bg-blue-300 font-bold inline-block px-2 py-1 rounded-[4px]">
                    chpet1120@naver.com
                </p>
                <p>
                    해당 이메일 주소로 재직중인 병원의{" "}
                    <span className="font-bold">사업자등록증</span>
                </p>
                <p>
                    혹은 <span className="font-bold">의사 면허증</span>을
                    제출해주시면
                </p>
                <p>확인 후 가입승인 해드리겠습니다.🥰💕</p>
                <p>멍햄냥과 함께 해주셔서 감사합니다👏🏻🥰💕</p>
                <p className="mini text-gray-300">
                    가입 승인은 약 하루정도 소요됩니다.
                </p>
            </div>
            {/* 버튼 추가해서 멍햄냥둘러보기 ? 메인페이지로 넘어가게 할지 고민중. */}
        </div>
    );
}

export default DoctorRegisterPending;
