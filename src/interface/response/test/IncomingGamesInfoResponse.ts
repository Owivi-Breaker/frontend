interface IncomingGamesInfoResponseItem {
    date: string;
    game_name: string;
    club1_name: string;
    club2_name: string;
}

export interface IncomingGamesInfoResponse extends Array<IncomingGamesInfoResponseItem> {
    [index: number]: IncomingGamesInfoResponseItem;
}
