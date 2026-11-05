import React from "react";

interface Block {
  type: string;
  children?: Array<{
    type?: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }>;
  level?: number;
  format?: string;
}

interface StrapiBlocksRendererProps {
  content: Block[];
}

const StrapiBlocksRenderer: React.FC<StrapiBlocksRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderText = (child: any) => {
    let text = child.text || "";
    
    if (child.bold) {
      text = <strong key={Math.random()}>{text}</strong>;
    }
    if (child.italic) {
      text = <em key={Math.random()}>{text}</em>;
    }
    if (child.underline) {
      text = <u key={Math.random()}>{text}</u>;
    }
    if (child.strikethrough) {
      text = <del key={Math.random()}>{text}</del>;
    }
    if (child.code) {
      text = <code key={Math.random()}>{text}</code>;
    }
    
    return text;
  };

  const renderBlock = (block: Block, index: number) => {
    const children = block.children?.map((child, idx) => (
      <React.Fragment key={idx}>{renderText(child)}</React.Fragment>
    ));

    switch (block.type) {
      case "paragraph":
        return <p key={index} className="mb-4">{children}</p>;
      
      case "heading":
        const level = block.level || 1;
        const headingClasses = {
          1: "text-3xl font-bold mb-4",
          2: "text-2xl font-bold mb-3",
          3: "text-xl font-semibold mb-3",
          4: "text-lg font-semibold mb-2",
          5: "text-base font-semibold mb-2",
          6: "text-sm font-semibold mb-2",
        };
        const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[1];
        
        switch (level) {
          case 1:
            return <h1 key={index} className={className}>{children}</h1>;
          case 2:
            return <h2 key={index} className={className}>{children}</h2>;
          case 3:
            return <h3 key={index} className={className}>{children}</h3>;
          case 4:
            return <h4 key={index} className={className}>{children}</h4>;
          case 5:
            return <h5 key={index} className={className}>{children}</h5>;
          case 6:
            return <h6 key={index} className={className}>{children}</h6>;
          default:
            return <h1 key={index} className={className}>{children}</h1>;
        }
      
      case "list":
        const ListTag = block.format === "ordered" ? "ol" : "ul";
        const listClass = block.format === "ordered" ? "list-decimal" : "list-disc";
        return (
          <ListTag key={index} className={`${listClass} ml-6 mb-4`}>
            {block.children?.map((item, idx) => (
              <li key={idx} className="mb-1">{renderText(item)}</li>
            ))}
          </ListTag>
        );
      
      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {children}
          </blockquote>
        );
      
      case "code":
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            <code>{children}</code>
          </pre>
        );
      
      default:
        return <p key={index} className="mb-4">{children}</p>;
    }
  };

  return (
    <div className="prose max-w-none">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default StrapiBlocksRenderer;
