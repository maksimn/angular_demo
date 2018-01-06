export default interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    page?: number; // номер страницы, на которой расположено это фото
}