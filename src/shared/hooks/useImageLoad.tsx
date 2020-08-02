import { useState, useEffect } from 'react';

export const useImageLoad = (imageSrcString: string, onErrorImage: string) => {
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        const imageToLoad = new Image();
        imageToLoad.src = imageSrcString;
        imageToLoad.onload = () => {
            setLoading(false);
            setImageSrc(imageSrcString);
        };
        imageToLoad.onerror = () => {
            setLoading(false);
            setImageSrc(onErrorImage);
        };
    });

    return { loading, imageSrc };
};
