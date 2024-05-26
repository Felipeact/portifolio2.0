
interface VideoUrl {
    fields: {
        description: string;
        title: string;
        file: {
            url: string;
            fileName: string;
            contentType: string;
        }
    }

}

interface VideosDetails {
    fields: {
        title: string;
        file: {
            contentType: string;
            url: string;
        }
    }

}



export interface Video {
    fields: {
        title: string;
        description: string;
        videoUrl: VideoUrl;
        videosDetails: VideosDetails[];
    },
    sys: {
        id: string;
    }

}
