export type EventData = {
    name: string;
    time: string;
    [key: string]: string;
}

export type EventProps = {
    event_data: EventData
};