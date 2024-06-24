import { Link } from "react-router-dom";

const ProfileLinks = () => {
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
    <div>
      <div className="flex gap-2 flex-wrap mb-2 ml-3">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-xs text-[#8e8e8e8e] hover:text-black whitespace-nowrap"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <p className="text-sm mb-16 text-[#8e8e8e8e] ml-3">© 2024 Alixujaev</p>
    </div>
  );
};

export default ProfileLinks;
