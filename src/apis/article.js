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