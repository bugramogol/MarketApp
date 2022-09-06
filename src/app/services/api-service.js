import environment from "../../environments/environment.json";

const getUrl = service => {
    const url = environment.host + '/' + service;
    return url;
};

/* Gets product list by page and querys */
export const getItemsByPage = async (page, pageSize, orderByQuery = '', itemTypeQuery = '', brandQuery = '', tagQuery = '') => {
    const url = getUrl(
        'items?_page='
        + page
        + '&_limit='
        + pageSize
        + orderByQuery
        + itemTypeQuery
        + brandQuery
        + tagQuery
    );
    const header = { method: "GET" };
    //console.log(url)
    return fetch(url, header).then(res => res.json());
};

/* Gets product list by querys */
export const getItems = async (orderByQuery = '', itemTypeQuery = '', brandQuery = '', tagQuery = '') => {
    const url = getUrl(
        'items?'
        + orderByQuery
        + itemTypeQuery
        + brandQuery
        + tagQuery);
    const header = { method: "GET" };
    //console.log(url)
    return fetch(url, header).then(res => res.json());
};