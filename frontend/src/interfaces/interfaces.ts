export interface Coordinates {
    x: number;
    y: number;
}

export interface LocationData {
    name: string;
    coordinates: Coordinates;
    compassOffset: number;
    imageUrl: string;
}

export interface GameData {
    mode: string;
    map: string;
    round: number;
    player1: string;
    scorePlayer1: number;
    player2?: string;
    scorePlayer2?: number;
    currentLocation: LocationData;
}

export interface RoundResultsData {
    mode: string;
    map: string;
    currentLocation: LocationData;
    player1: string;
    pointsPlayer1: number;
    scorePlayer1: number;
    coordinatesPlayer1: Coordinates;
    player2?: string;
    pointsPlayer2?: number;
    scorePlayer2?: number;
    coordinatesPlayer2?: Coordinates;
}
// probably shoud go with player1 and player2 id and then GET their info from database 1 time per game
