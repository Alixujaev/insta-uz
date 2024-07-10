import { Link } from "react-router-dom";

const Links = () => {
  const links = [
    {
      name: "Meta",
      path: "/",
    },
    {
      name: "Информация",
      path: "/",
    },
    {
      name: "Блог",
      path: "/",
    },
    {
      name: "Вакансии",
      path: "/",
    },
    {
      name: "Помощь",
      path: "/",
    },
    {
      name: "API",
      path: "/",
    },
    {
      name: "Конфиденциальность",
      path: "/",
    },
    {
      name: "Условия",
      path: "/",
    },
    {
      name: "Места",
      path: "/",
    },
    {
      name: "Instagram Lite",
      path: "/",
    },
    {
      name: "Threads",
      path: "/",
    },
    {
      name: "Загрузка контактов и лица, не являющиеся пользователями",
      path: "/",
    },
    {
      name: "Meta Verified",
      path: "/",
    },
  ];
  return (
    <div className="container px-32">
      <div className="flex gap-4 mb-5 flex-wrap justify-center">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-xs text-[#8e8e8e] hover:text-black whitespace-nowrap"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <p className="text-sm text-center mb-16 text-[#8e8e8e]">
        © {new Date().getFullYear()} Alixujaev
      </p>
    </div>
  );
};

export default Links;
