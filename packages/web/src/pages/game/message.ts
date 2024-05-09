export enum SocketRequest {
    JoinMatchRequest = 'JoinMatchRequest',
    JoinRoomRequest = 'JoinRoomRequest',
    MakeRoomRequest = 'MakeRoomRequest',
    LeaveMatchRequest = 'LeaveMatchRequest',
    ReadyRequest = 'ReadyRequest',
    TurnPlayerRequest = 'TurnPlayerRequest',
    TurnAudienceRequest = 'TurnAudienceRequest'
}

export enum SocketResponse {
    JoinMatchErrorResponse = 'JoinMatchErrorResponse',
    JoinRoomErrorResponse = 'JoinRoomErrorResponse',
    MakeRoomResponse = 'MakeRoomResponse',
    MakeRoomErrorResponse = 'MakeRoomErrorResponse',
    SyncRoomResponse = 'SyncRoomResponse',
}

export enum NetworkRequest {
    ReadyRequest = 'NetworkReadyRequest',
}

export enum NetworkResponse {
    ReadyResponse = 'NetworkReadyResponse',
}

export enum NetworkControlRequest {
    Step = 'NetworkControlStepRequest',
}
