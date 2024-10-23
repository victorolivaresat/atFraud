import { RiFileTextFill, RiAlarmWarningFill } from "react-icons/ri";
import {
  getCasesInEvaluation,
  getEvaluationsAttended,
  getEvaluationsPending,
} from "../../api/caseApi";
import DataTableBase from "../../utils/DataTable";
import { useState, useEffect } from "react";
import { MdApps } from "react-icons/md";

const Home = () => {
  const urlBase = import.meta.env.VITE_URL_BASE;
  const [caseData, setCaseData] = useState([]);
  const [attendedCount, setAttendedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const [searchTerm, setSearchTerm] = useState("");

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

    const fetchEvaluationCounts = async () => {
      try {
        const attendedData = await getEvaluationsAttended(userId);
        const pendingData = await getEvaluationsPending(userId);
        setAttendedCount(attendedData.attendedCount);
        setPendingCount(pendingData.pendingCount);
      } catch (error) {
        console.error("Error fetching evaluation counts:", error);
      }
    };

    fetchCaseData();
    fetchEvaluationCounts();
  }, [userId]);

  const columns = [
    {
      cell: () => <MdApps style={{ fill: "#43a047" }} />,
      width: "10px",
      style: {
        // marginBottom: "-1px",
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
      selector: (row) => row.Dias,
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

  // Filtro de datos basado en el término de búsqueda
  const filteredData = caseData.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase())||
      item.caseId.toLowerCase().includes(searchTerm.toLowerCase())||
      item.externalId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {/* Section 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
        {/* Card 1 */}
        <div className="bg-yellow-500 p-8 rounded-xl text-gray-700 flex flex-col gap-6">
          <RiFileTextFill className="text-5xl" />
          <h4 className="text-2xl">Eval Pendientes</h4>
          <span className="text-5xl">{pendingCount}</span>
        </div>

        {/* Card 2 */}
        <div className="bg-green-500 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiAlarmWarningFill className="text-5xl" />
          <h4 className="text-2xl">Atendidas</h4>
          <span className="text-5xl text-white">{attendedCount}</span>
        </div>
      </section>

      {/* Section 2 */}

      <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
        <div className="relative overflow-x-auto rounded-xl">
          <div className="overflow-x-auto relative shadow-md py-3 px-5">
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-1/3 " 
              />
            </div>

            <DataTableBase
              columns={columns}
              data={filteredData}
              pagination
              paginationPerPage={10}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
