

export function formatFollowers(followers: number) {

    switch (true) {
        case (followers >= 1000 && followers < 1000 * 1000):
            return `${Math.floor(followers / 1000).toFixed(1)}k followers`;
            break;
        case (followers > 1000 * 1000):
            return `${(followers / (1000 * 1000)).toFixed(1)}M followers`;
            break;
        default:
            return `${followers.toString()} followers`;
    }
}


export function formatDescription(description: string) {
    return description.length > 60 ? `${description}...` : description;
}
