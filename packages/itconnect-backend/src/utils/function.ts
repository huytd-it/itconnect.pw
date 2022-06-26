import {SelectQueryBuilder} from "typeorm";

export function Id(id: number) {
    return id ? { id } : null;
}

let uidQuery: number = 0;

export function genUidQuery() {
    if (uidQuery++ > 10000) {
        uidQuery = 0;
    }
    return `yuh_param_${uidQuery}`;
}

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
    Object.keys(params).forEach(key => {
        const newKey = genUidQuery();
        newParams[newKey] = params[key];
        query = query.replace(new RegExp(':' + key, 'g'), ':' + newKey);
    })
    return (parent[action] as any)(`exists (${query})`, newParams);
}

export function queryExistsMulti<T, V>(parent:  SelectQueryBuilder<T>, listChild:  SelectQueryBuilder<V>[], joinCod: 'or' | 'and' , action: keyof SelectQueryBuilder<T> = 'andWhere') {
    const allParams = {};
    const listQuery = listChild.map(child => {
        let query = child.getQuery();
        const params = child.getParameters();
        Object.keys(params).forEach(key => {
            const newKey = genUidQuery();
            allParams[newKey] = params[key];
            query = query.replace(new RegExp(':' + key, 'g'), ':' + newKey);
        })
        return `(exists (${query}))`;
    })
    const query = listQuery.join(` ${joinCod} `);
    return (parent[action] as any)(`(${query})`, allParams);
}

