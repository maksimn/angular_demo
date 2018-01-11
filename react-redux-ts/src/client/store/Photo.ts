export default interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    appUrlToPhoto: string; // ссылка на большое фото в этом приложении,
                           // например, /photos/somePage/photoId/somePhotoId или
                           // /photos/searching/rep/somePage/photoId/somePhotoId
}