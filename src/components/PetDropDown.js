import React, { useState } from "react";

const PetDropDown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
        {
            id: 1,
            name: "강아지",
            imgSrc: "/assets/images/petDogIcon.svg",
        },
        {
            id: 2,
            name: "고양이",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        onSelect(item.name); // 선택된 항목을 부모 컴포넌트로 전달
    };

    return (
        <div className="dropdown w-full">
            {/* tg s  */}
            <div
                className={`flex justify-between cursor-pointer px-2 py-3 border-b border-gray-500  ${isOpen ? "border border-primary-200 rounded-lg" : "border-gray-500"}`}
                onClick={toggleDropdown}
            >
                <p className="subtitle1 text-primary-300">종</p>
                <p className="flex gap-2">
                    {selectedItem ? (
                        <span className="flex gap-2 body2 text-sub-100">
                            <img
                                src={selectedItem.imgSrc}
                                alt={selectedItem.name}
                            />
                            {selectedItem.name}
                        </span>
                    ) : (
                        <span className="body2 text-sub-100">목록</span>
                    )}
                    <img
                        className="w-5 h-5"
                        src={
                            isOpen
                                ? "/assets/images/arrow_up.svg"
                                : "/assets/images/arrow_down.svg"
                        }
                        alt={isOpen ? "위쪽 화살표 열림" : "아래쪽 화살표 닫힘"}
                    />
                </p>
            </div>
            {/* tg e  */}

            {/* list s  */}
            {isOpen && (
                <ul className="border border-t-0 border-gray-100">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={`flex gap-2 px-2 py-3 w-full justify-between items-center cursor-pointer ${selectedItem && selectedItem.id === item.id ? "bg-blue-300" : "bg-white"}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <span className="check w-6">
                                {selectedItem &&
                                    selectedItem.id === item.id &&
                                    "✓"}
                            </span>
                            <div className="flex items-center gap-2 ml-auto">
                                <img src={item.imgSrc} alt={item.name} />
                                <span className="body2 text-sub-100">
                                    {item.name}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* list e  */}
        </div>
    );
};

export default PetDropDown;
