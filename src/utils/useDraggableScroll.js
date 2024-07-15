import { useRef, useEffect } from "react";

export function useDraggableScroll() {
    const ref = useRef(null);

    useEffect(() => {
        const ele = ref.current;
        if (!ele) return;

        let pos = { top: 0, left: 0, x: 0, y: 0 };

        const mouseMoveHandler = (e) => {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);

            ele.style.cursor = "grab";
            ele.style.removeProperty("user-select");
        };

        const mouseDownHandler = (e) => {
            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);

            ele.style.cursor = "grabbing";
            ele.style.userSelect = "none";
        };

        ele.addEventListener("mousedown", mouseDownHandler);

        return () => {
            ele.removeEventListener("mousedown", mouseDownHandler);
        };
    }, []);

    return ref;
}
