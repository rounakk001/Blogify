import React from 'react'
import AppwriteImage from './AppwriteImage'
import { Link } from 'react-router-dom'

function PostCard(props) {
  const { $id, title, featured, $createdAt, content } = props;

  // Derive an excerpt or mock it if not available
  const excerpt = "A deep dive into the underlying architecture and practical examples to elevate your engineering workflow."

  const formattedDate = new Date($createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const plainText = content
    ? content.replace(/<[^>]*>/g, "")
    : "";

  const readingTime = Math.max(
    1,
    Math.ceil(plainText.split(/\s+/).length / 200)
  );

  if (featured) {
    return (
      <Link to={`/post/${$id}`} className='group grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
        <div className='md:col-span-1 w-full aspect-video md:aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 border border-theme-border'>
          <AppwriteImage
            fileId={props}
            alt={title}
            className='h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
          />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center h-full">
          <div className="text-sm font-semibold text-theme-accent mb-2 uppercase tracking-wide">Engineering</div>
          <h2 className='text-2xl md:text-3xl font-serif font-bold text-theme-text mb-3 leading-tight group-hover:text-theme-accent transition-colors'>{title}</h2>
          <p className="text-theme-secondary text-base leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">{excerpt}</p>
          <div className="flex items-center text-sm text-theme-secondary font-medium">
            <span>{formattedDate}</span>
            <span className="mx-2">·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/post/${$id}`} className='group flex flex-col h-full'>
      <div className='w-full aspect-video overflow-hidden rounded-lg bg-gray-100 border border-theme-border mb-4'>
        <AppwriteImage
          fileId={props}
          alt={title}
          className='h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
        />
      </div>
      <div className="text-xs font-semibold text-theme-accent mb-2 uppercase tracking-wide">Product</div>
      <h2 className='text-xl font-serif font-bold text-theme-text mb-2 leading-tight group-hover:text-theme-accent transition-colors'>{title}</h2>
      <p className="text-theme-secondary text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{excerpt}</p>
      <div className="flex items-center text-xs text-theme-secondary font-medium mt-auto">
        <span>{formattedDate}</span>
        <span className="mx-2">·</span>
        <span>{readingTime} min read</span>
      </div>
    </Link>
  )
}

export default PostCard
