import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define the props type
interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ ...props }) => {
          return (
            <Image
              src={props.src as string}
              alt={props.alt || "Markdown image"}
              width={900}
              height={600}
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
