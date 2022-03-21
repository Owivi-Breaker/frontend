interface LeagueIdPointsTableResponseItem {
    id: number;
    名称: string;
    胜: number;
    平: number;
    负: number;
    胜球: number;
    输球: number;
    净胜球: number;
    积分: number;
}
export interface LeagueIdPointsTableResponse extends Array<LeagueIdPointsTableResponseItem> {
}
