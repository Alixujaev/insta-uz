import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center h-[80vh]">
      <h3 className="text-2xl my-8 font-bold">
        К сожалению, эта страница недоступна.
      </h3>
      <p>
        Возможно, вы воспользовались недействительной ссылкой или страница была
        удалена. <Link to="/">Назад в Instagram.</Link>
      </p>
    </div>
  );
};

export default NotFound;
