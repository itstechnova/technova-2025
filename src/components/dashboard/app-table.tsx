import ApplicationRow from "./app-row";
import { Application } from "./utils/types";

interface Props {
  applications: Application[];
}

function ApplicationTable({ applications }: Props) {
  return (
    <div className="w-full border border-gray-300 rounded-md shadow-sm overflow-x-auto">
      <table className="w-full text-left text-base">
        <thead className="bg-backgroundTertiary/15 justify-between">
          <tr>
            <th className="py-3 px-4 border-r border-gray-300 w-2/5">
              Type of Application
            </th>
            <th className="py-3 px-4 border-r border-gray-300">Status</th>
            <th className="py-3 px-4 border-r border-gray-300">Last Updated</th>
            <th className="py-3 px-4 border-r border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr className="border-t border-gray-300 text-base">
              <td colSpan={4} className="text-left p-4 italic text-gray-500">
                No applications yet — apply now!
              </td>
            </tr>
          ) : (
            applications.map((app, idx) => (
              <ApplicationRow key={idx} application={app} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;
