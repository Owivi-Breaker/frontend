interface LeagueIdClubRankError {
    status: "club don't match league";
}

export interface LeagueIdClubRankResponse extends LeagueIdClubRankError,Number {
}
