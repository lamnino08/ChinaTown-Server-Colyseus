export default class CardDealResult
{
    public tile : number;
    public isChossen : boolean;

    constructor(tile : number, isChossen : boolean)
    {
        this.tile = tile;
        this.isChossen = isChossen;
    } 
}
