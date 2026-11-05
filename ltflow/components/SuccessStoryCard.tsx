import Image from "next/image";
import React from "react";

interface SuccessStoryCardProps {
  image: string;
  logo: string;
  category: string;
  date: string;
  title: string;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  image,
  logo,
  category,
  date,
  title,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
      <div className="relative rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full object-cover"
        />
        <div className="absolute -bottom-6 left-4 bg-white rounded-lg shadow-md p-2">
          <Image src={logo} alt="logo" width={120} height={40} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-blue-600 text-sm">{category}</span>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>

      <h3 className="mt-2 text-gray-800 font-semibold leading-snug">
        {title}
      </h3>
    </div>
  );
};

export default SuccessStoryCard;
