import { PortableText as BasePortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-300 pl-5 text-gray-500 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline hover:text-gray-900 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

interface Props {
  value: unknown[];
  className?: string;
}

export default function PortableText({ value, className }: Props) {
  return (
    <div className={className}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
