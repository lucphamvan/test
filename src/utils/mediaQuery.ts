export const BREAKPOINT = {
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
    "2xl": "96em"
};

export const MEDIA_QUERY = {
    sm: `@media (min-width: ${BREAKPOINT.sm})`,
    md: `@media (min-width: ${BREAKPOINT.md})`,
    lg: `@media (min-width: ${BREAKPOINT.lg})`,
    xl: `@media (min-width: ${BREAKPOINT.xl})`,
    "2xl": `@media (min-width: ${BREAKPOINT["2xl"]})`
};

export const MEDIA_QUERY_STRING = {
    sm: `(min-width: ${BREAKPOINT.sm})`,
    md: `(min-width: ${BREAKPOINT.md})`,
    lg: `(min-width: ${BREAKPOINT.lg})`,
    xl: `(min-width: ${BREAKPOINT.xl})`,
    "2xl": `(min-width: ${BREAKPOINT["2xl"]})`
};
