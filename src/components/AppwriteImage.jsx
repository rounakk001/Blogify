import React from "react";
import Service from "../appwrite/config";

export function getFeaturedImageId(source) {
    if (!source) return null;
    if (typeof source === "string") return source;

    return (
        source.featuredImage ??
        source.featuredimage ??
        source.FeaturedImage ??
        source.image ??
        null
    );
}

export default function AppwriteImage({
    fileId,
    alt = "",
    className = "",
    detail = false,
}) {
    const resolvedFileId = getFeaturedImageId(fileId) ?? fileId;

    if (!resolvedFileId) return null;

    const src = Service.getFilePreview(resolvedFileId);

    if (!detail) {
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                loading="lazy"
            />
        );
    }

    return (
        <div className={`group relative w-full h-[420px] overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                style={{ backgroundImage: `url(${src})` }}
                aria-hidden="true"
            />
            <div className="relative z-[1] flex h-full w-full items-center justify-center p-6">
                <img
                    src={src}
                    alt={alt}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
