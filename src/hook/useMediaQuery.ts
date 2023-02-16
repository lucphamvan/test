import React from "react";

/**
 * function detect if the screen size is match the query or not
 * @param query string
 * @returns boolean
 * @example
 * const isSmall = useMediaQuery("(max-width: 30em)");
 * */
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches);

    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query, matches]);

    return matches;
};
export default useMediaQuery;

// write example code in App.tsx
// import useMedia from "./hook/useMediaQuery";
// const isSmall = useMediaQuery("(max-width: 30em)");
// const isMedium = useMediaQuery("(max-width: 48em)");
// const isLarge = useMediaQuery("(max-width: 62em)");
// const isXLarge = useMediaQuery("(max-width: 80em)");
// const isXXLarge = useMediaQuery("(max-width: 96em)");
