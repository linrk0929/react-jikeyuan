import { http } from "@/utils";

//获取频道列表
export function getChannelAPI() { 
    return http({
        url: 'channels',
        method:'GET'
    })
}

//新增文章

export function createAriticleAPI(data) { 
    return http({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

//获取文章列表
export function getArticleListAPI(params) { 
    return http({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

export function DeleteArticleListAPI(data) { 
    return http({
        url: `/mp/articles/${data.id}`,
        method: 'DELETE',
        data
    })
}

//获取文章详情
export function getArticleById(articleId) { 
    return http({
        url: `/mp/articles/${articleId}`,
        method:'GET'
    })
}


export function updateArticleAPI(data) { 
    return http({
        url:  `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}