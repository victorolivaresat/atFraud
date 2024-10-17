import { useParams } from "react-router-dom";
import { getCaseById } from "../../api/caseApi";
import { getAllStatuses } from "../../api/statusApi";
import { getAllFraudMotives } from "../../api/fraudMotiveApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  let { idCase } = useParams();
  const [caseData, setCaseData] = useState({
    companyName: "",
    analystName: "",
    externalId: "",
    firstName: "",
    lastName: "",
    fecGeneration: "",
    fecStartEvaluation: "",
    motiveFraudName: "",
    statusName: "",
    commentAnalyst: "",
    amount: "",
  });
  const [statuses, setStatuses] = useState([]);
  const [fraudMotives, setFraudMotives] = useState([]);
  const urlBase = import.meta.env.VITE_URL_BASE;
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate( urlBase + 'home');
  };

  const handleCommentChange = (e) => {
    setCaseData({ ...caseData, commentAnalyst: e.target.value });
  };

  const handleStatusChange = (e) => {
    setCaseData({ ...caseData, statusName: e.target.value });
  };

  const handleAmountChange = (e) => {
    setCaseData({ ...caseData, amount: e.target.value });
  };

  const fetchCaseData = async (idCase) => {
    const data = await getCaseById(idCase);
    console.log(data);
    setCaseData(data);
  };

  const fetchStatusesData = async () => {
    const data = await getAllStatuses();
    console.log(data);
    setStatuses(data);
  };

  const fetchFraudMotivesData = async () => {
    const data = await getAllFraudMotives();
    console.log(data);
    setFraudMotives(data);
  };

  useEffect(() => {
    fetchCaseData(idCase);
    fetchStatusesData();
    fetchFraudMotivesData();
  }, [idCase]);

  return (
    <div className="mt-5">
      <div className="w-full ">
        <div className="flex flex-col  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-1xl md:text-4xl font-bold dark:text-gray-100">
            Evaluación | #Caso{" "}
            <span className="text-primary-100">{idCase}</span>
          </h1>

          <form className="my-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-empresa"
                >
                  Empresa
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-empresa"
                  type="text"
                  placeholder="Selecciona la empresa"
                  value={caseData.companyName || ""}
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-Analista"
                >
                  Analista
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-Analista"
                  type="text"
                  placeholder="Analista"
                  autoComplete="false"
                  value={caseData.analystName || ""}
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-codCliente"
                >
                  Codigo Cliente
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-codCliente"
                  type="text"
                  value={caseData.externalId || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-nomCliente"
                >
                  Nombre Cliente
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-nomCliente"
                  type="text"
                  value={`${caseData.firstName || ""} ${
                    caseData.lastName || ""
                  }`}
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-fecGeneracion"
                >
                  Fecha Generacion
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-fecGeneracion"
                  type="text"
                  value={caseData.fecGeneration || ""}
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-fecIniEval"
                >
                  Fecha Ini Evaluacion
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-fecIniEval"
                  type="text"
                  value={caseData.fecStartEvaluation || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-amount"
                >
                  Monto
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-amount"
                  type="text"
                  value={caseData.amount || ""}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-motivoFraude"
                >
                  Motivo de Fraude
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-motivoFraude"
                  value={caseData.motiveFraudName || ""}
                  onChange={handleStatusChange}
                >
                  {fraudMotives.map((fraudMotive) => (
                    <option
                      key={fraudMotive.motiveFraudId}
                      value={fraudMotive.motiveFraudName}
                    >
                      {fraudMotive.motiveFraudName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-status"
                >
                  Status
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-status"
                  value={caseData.statusName || ""}
                  onChange={handleStatusChange}
                >
                  {statuses.map((status) => (
                    <option key={status.statusId} value={status.statusName}>
                      {status.statusName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-ComentarioAnalista"
                >
                  Comentario Analista
                </label>
                <textarea
                  className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                  id="grid-ComentarioAnalista"
                  type="text"
                  value={caseData.commentAnalyst || ""}
                  onChange={handleCommentChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <button
                type="submit"
                className="w-full md:w-1/6 mt-5 text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelClick}
                className="w-full ml-4 md:w-1/6 mt-5 text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
