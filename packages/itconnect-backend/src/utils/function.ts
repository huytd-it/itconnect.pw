import {SelectQueryBuilder} from "typeorm";

export function Id(id: number) {
    return id ? { id } : null;
}

let uid: number = 0;
/**
 * Add Query
 *  parent where .... and exists (child)
 *
 * Fix error replace params
 *
 * @param parent
 * @param child
 * @param action
 */
export function queryExists<T, V>(parent:  SelectQueryBuilder<T>, child:  SelectQueryBuilder<V>, action: keyof SelectQueryBuilder<T> = 'andWhere') {
    let query = child.getQuery();
    const params = child.getParameters();
    const newParams = {};
    if (uid > 10000) {
        uid = 0;
    }
    Object.keys(params).forEach(key => {
        const newKey = key + '_v_' + (uid++).toString();
        newParams[newKey] = params[key];
        query = query.replace(new RegExp(':' + key, 'g'), ':' + newKey);
    })
    return (parent[action] as any)(`exists (${query})`, newParams);
}