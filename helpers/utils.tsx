import { FaDiscord, FaGithub } from "react-icons/fa";

export const createIconJsx = (providerId: string) => {
  switch (providerId) {
    case "github":
      return <FaGithub />;
    case "discord":
      return <FaDiscord />;
    default:
      return;
  }
};
