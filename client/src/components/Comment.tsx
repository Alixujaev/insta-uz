import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { formatDate } from "@/lib/utils";

const Comment = ({
  text,
  authorImage,
  authorName,
  createdAt,
}: {
  text: string;
  authorImage: string;
  authorName: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex gap-2 mb-5 ">
      <Avatar src={authorImage} size="xs" />
      <div className="">
        <p className="text-sm">
          <Link to={`/${authorName}`} className="text-sm font-semibold mr-2">
            {authorName}
          </Link>
          {text}
        </p>
        <p className="text-[#8E8E8E] text-xs">{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default Comment;
