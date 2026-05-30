import React from 'react'
import AppwriteImage from './AppwriteImage'
import { Link } from 'react-router-dom'

function PostCard(props) {
  const { $id, title } = props;

  return (
    <Link to={`/post/${$id}`} className='block h-full'>
      <div className='h-full rounded-xl border border-gray-300 bg-white p-3 shadow-sm transition-shadow hover:shadow-md'>
        <div className='group mb-3 h-48 w-full overflow-hidden rounded-lg bg-gray-100'>
          <AppwriteImage
            fileId={props}
            alt={title}
            className='h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105'
          />
        </div>
        <h2 className='truncate text-lg font-semibold text-gray-900'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
