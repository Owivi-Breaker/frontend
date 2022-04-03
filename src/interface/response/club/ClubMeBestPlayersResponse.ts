import {PlayerShow} from "@/interface/schemas";

export interface ClubMeBestPlayersResponse {
    [key: string]: any;
    最佳射手: PlayerShow;
    进球: number;
    平均评分最高: PlayerShow;
    评分: number;
    助攻最多: PlayerShow;
    助攻: number;
    传球成功率最高: PlayerShow;
    传球成功率: number;
    拦截成功率最高: PlayerShow;
    拦截成功率: number;
    过人成功率最高: PlayerShow;
    过人成功率: number;
}
