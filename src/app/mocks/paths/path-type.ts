export interface Path {
    routePath?: string,
    linkPath?: string,
    /* TODO to provide a translations handler here  */
    i18n?: string,
};

/**
 * TODO to move to server-side, normally, most of menu items are received in a json from the server.
 */
export interface Paths {
    pages: {
        home:{
            path: Path,
            children?:{},
        },
        movies: {
            path: Path,
            /* for future extension&breadcrumbs, if required, */
            children?: {
                list: {
                    path: Path,
                    /* for future extension&breadcrumbs, if required, */
                    children?: {},
                },
                detail: {
                    path: Path,
                    /* for future extension&breadcrumbs, if required, */
                    children?: {},
                }
            },
        },

    },
    api: {
        getMovies: Path,
        getGenres: Path,
        searchMovies: Path,
    }
};