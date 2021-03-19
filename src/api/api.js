import {get, post} from "./axios";

export default {
    // 文章相关接口
    getEssayListPage(params) {
        return get("/essay/list", params);
    },
    getEssayDetail(params) {
        return get("/essay/detail", params);
    },
    getNewestBlogEssay(params) {
        return get("/essay/newest", params);
    },
    getHottestBlogEssay(params) {
        return get("/essay/hottest", params);
    },
    getEssayTitleCloud(params) {
        return get("/essay/cloud", params);
    },
    getBlogOverview(params) {
        return get("/essay/overview", params);
    },
    updateEssayView(params) {
        return post("/essay/view", params);
    },
    // 评论相关接口
    getCommentListPage(params) {
        return get("/comment/list", params);
    },
    saveComment(params) {
        return post("/comment/save", params);
    },
    // 登录
    login(params) {
        return post("/login", params, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
    },
    getMenuList(params){
        return get("/manage/nav/list",params);
    }
};