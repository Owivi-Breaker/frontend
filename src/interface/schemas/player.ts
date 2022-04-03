export interface PlayerAvatar {
    topType: string;
    hairColor: string;
    accessoriesType: string;
    facialHairType: string;
    clotheType: string;
    clotheColor: string;
    eyebrowType: string;
    eyeType: string;
    mouthType: string;
    skinColor: string;
    facialHairColor: string;
    topColor: string;
}

export interface LocationNum {
    ST_num: 18,
    CM_num: number;
    LW_num: number;
    RW_num: number;
    CB_num: number;
    LB_num: number;
    RB_num: number;
    GK_num: number;
    CAM_num: number;
    LM_num: number;
    RM_num: number;
    CDM_num: number;
}

export interface Capa {
    shooting: number;
    passing: number;
    dribbling: number;
    interception: number;
    pace: number;
    strength: number;
    aggression: number;
    anticipation: number;
    free_kick: number;
    stamina: number;
    goalkeeping: number;
}
export interface LocationCapa{
    ST: number;
    CAM:number;
    CB:number;
    LW:number;
    RW: number;
    CM:number;
    LM:number;
    RM: number;
    CDM: number;
    LB: number;
    RB:number;
    GK: number;
}

export interface PlayerShow {
    id: number;
    club_id: number;
    club_name: string;
    translated_name: string;
    translated_nationality: string;
    age: number;
    height: number;
    weight: number;
    birth_date: string;
    wages: number;
    values: number;
    number: number;
    avatar: PlayerAvatar;
    real_stamina: number;
    location_num: LocationNum;
    capa: Capa;
    top_capa: number;
    top_location: string;
    superior_location: Array<string>;
    location_capa: LocationCapa;
    style_tag: Array<string>;
    talent_tag: Array<string>;
    recent_ratings: Array<number>;
    on_sale: boolean;
}
