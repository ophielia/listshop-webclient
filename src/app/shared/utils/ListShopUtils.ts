

export default class ListShopUtils {
    private static STRING_LENGTH = 255;

public static cleanInputForServer(toCap: string) : string {
    if (toCap == null) {
        return toCap;
    }
    let cap = Math.min(toCap.length, this.STRING_LENGTH);
    return toCap.substring(0,cap);
}
}