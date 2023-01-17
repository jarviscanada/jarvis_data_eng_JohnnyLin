export interface QuoteApi {
    ticker: string;
    last_price: number;
    bid_price: number;
    bid_size: number;
    ask_size: number;
    ask_price: number;
    createdAt: number;
    updatedAt:number;
}