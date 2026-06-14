import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  const [index, setIndex] = useState(-1);

  const slides = photos.map((p) => ({
    src: `${p.url}?w=1920&fit=max&auto=format&q=85`,
    width: p.width,
    height: p.height
  }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setIndex(i)}
            className="aspect-square overflow-hidden group"
          >
            <img
              src={`${photo.url}?w=500&h=500&fit=crop&auto=format&q=80`}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        slides={slides}
        close={() => setIndex(-1)}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </>
  );
}
