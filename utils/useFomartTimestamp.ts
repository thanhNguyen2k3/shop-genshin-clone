export const useFomartTimeCreatedAt = (createdAd: string) => {
    let timestamp = new Date(createdAd).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).toLocaleString('default', { month: 'narrow' });
    let Year = new Date(timestamp).getFullYear();
    let Time = new Date(timestamp).toLocaleTimeString();
    let NewDateFomart = `${Day}/${Month}/${Year} - ${Time}`;

    return NewDateFomart;
};
