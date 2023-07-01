import SearchIcon from "@mui/icons-material/Search";

import React from "react";

const SearchIco = (props: {
    toggleSearch: React.MouseEventHandler<SVGSVGElement> | undefined;
}) => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
