import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Application } from "./utils/types";
import { Button } from "../base-ui/button";
import Link from "next/link";

interface Props {
  application: Application;
}

function AppRow({ application }: Props) {
  return (
    <tr className="border-t border-gray-300 text-base">
      <td className="px-4 py-2 border-r border-gray-300 truncate">
        {application.type}
      </td>
      <td className=" px-4 py-2 font-semibold border-r border-gray-300 truncate">
        {application.status}
      </td>
      <td className="px-4 py-2 border-r border-gray-300 truncate">
        {application.lastUpdated.substring(0, 10)}
      </td>
      <td className="flex flex-nowrap">
        <div className="border-r border-gray-300">
          <Link href={`/apply/${application.type.toLowerCase()}`}>
            <Button variant="link" title="View your application">
              <FontAwesomeIcon
                icon={faEye}
                className="text-gray-600 w-5 h-5 py-2 hover:text-navSecondary"
              />
            </Button>
          </Link>
        </div>
        <Link href={`/apply/${application.type.toLowerCase()}`}>
          <Button variant="link" title="Edit your application">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-gray-600 w-5 h-5 py-2 hover:text-navSecondary"
            />
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export default AppRow;
