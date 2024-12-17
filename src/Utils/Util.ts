export class Util {
    /**
     * Returns the number of tile cards based on the year and number of players.
     * @param year The current year (as a number).
     * @param numberPlayer The number of players in the game.
     * @returns Number of tile cards.
     */
    public static numberTileCard(year: number, numberPlayer: number): number {
        numberPlayer = numberPlayer < 3 ? 3 : numberPlayer;

        switch (numberPlayer) {
            case 3:
                return year === 1 ? 7 : 6;
            case 4:
                return year === 1 ? 6 : 5;
            case 5:
                return year < 4 ? 5 : 4;
            default:
                return 5;
        }
    }

    /**
     * Returns the number of store cards based on the year and number of players.
     * @param year The current year (as a number).
     * @param numberPlayer The number of players in the game.
     * @returns Number of store cards.
     */
    public static numberStoreCard(year: number, numberPlayer: number): number {
        switch (numberPlayer) {
            case 3:
                return year === 1 ? 7 : 4;
            case 4:
                return year === 1 ? 6 : 3;
            case 5:
                if (year === 1) return 5;
                if (year === 2 || year === 3) return 3;
                return 2;
            default:
                return 5;
        }
    }
}
