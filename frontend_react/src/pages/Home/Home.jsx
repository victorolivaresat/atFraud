import { RiFileTextFill, RiAlarmWarningFill } from "react-icons/ri";
import { getCasesInEvaluation } from "../../api/caseApi";
import DataTableBase from "../../utils/DataTable";
import { useState, useEffect } from "react";
import { MdApps } from "react-icons/md";

const Home = () => {
  const urlBase = import.meta.env.VITE_URL_BASE;
  const [caseData, setCaseData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const data = await getCasesInEvaluation(userId);
        console.log(data); 
        setCaseData(data);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };
    fetchCaseData();
  }, [userId]);

  const columns = [
    {
      cell: () => <MdApps style={{ fill: "#43a047" }} />,
      width: "50px",
      style: {
        marginBottom: "-1px",
      },
    },
    {
      name: "ID CASO",
      selector: (row) => (
        <a
          className="font-medium text-red-600 hover:underline hover:text-red-400"
          href={urlBase + "evaluation/" + row.caseId}
        >
          {row.caseId}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Cod. Cliente",
      selector: (row) => row.externalId,
      sortable: true,
    },
    {
      name: "Nom. Cliente",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Dias",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Fecha Registro",
      selector: (row) => row.fecGeneration,
      sortable: true,
    },
    {
      name: "Monto",
      selector: (row) => `S/. ${row.amount}`,
      sortable: true,
    },
  ];

  return (
    <div>
      {/* Section 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-8">
        {/* Card 1 */}
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiFileTextFill className="text-5xl" />
          <h4 className="text-2xl">Eval Pendientes</h4>
          <span className="text-5xl text-white">59</span>
        </div>

        {/* Card 2 */}
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiAlarmWarningFill className="text-5xl" />
          <h4 className="text-2xl">Atendidas</h4>
          <span className="text-5xl text-white">235</span>
        </div>
      </section>
      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
        <div className="relative overflow-x-auto rounded-xl">
          <div className="overflow-x-auto relative shadow-md">
            <DataTableBase
              columns={columns}
              data={caseData}
              pagination
              selectableRows
              paginationPerPage={10}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;