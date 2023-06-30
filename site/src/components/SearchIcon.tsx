import SearchIcon from "@mui/icons-material/Search";
import type { MouseEventHandler } from "react";
import { useState } from "react";

const SearchIco = (props: {
    toggleSearch: MouseEventHandler<SVGSVGElement> | undefined;
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <SearchIcon
            sx={{
                color: "white",
                fontSize: "3rem",
                zIndex: 1000,
                cursor: "pointer",
                display: windowWidth > 770 ? "none" : "block",
            }}
            onClick={props.toggleSearch}
        />
    );
};

export default SearchIco;
