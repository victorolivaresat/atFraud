import { getCaseById, updateCaseEvaluation } from "../../api/caseApi";
import { getAllFraudMotives } from "../../api/fraudMotiveApi";
import { useState, useEffect, useCallback } from "react";
import { getAllStatuses } from "../../api/statusApi";
import { getAlertsByCaseId } from "../../api/alertApi";
import { getDocumentsByCaseId } from "../../api/documentApi";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DataTableBase from "../../utils/DataTable";
import { MdApps } from "react-icons/md";
import Editor from 'react-simple-wysiwyg';

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
  const [alerts, setAlerts] = useState([]);
  const [documents, setDocuments] = useState([]);
  const urlBase = import.meta.env.VITE_URL_BASE;
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancelClick = () => {
    navigate(urlBase + "home");
  };

  const handleCommentChange = (e) => {
    setCaseData({ ...caseData, commentAnalyst: e.target.value });
  };

  const hanldeFraudMotiveChange = (e) => {
    setCaseData({ ...caseData, motiveFraudName: e.target.value });
  };

  const handleStatusChange = (e) => {
    setCaseData({ ...caseData, statusName: e.target.value });
  };

  const handleAmountChange = (e) => {
    setCaseData({ ...caseData, amount: e.target.value });
  };

  const fetchAlertData = async (idCase) => {
    const data = await getAlertsByCaseId(idCase);
    console.log(data);
    setAlerts(data);
  };

  const fetchDocumentData = async (idCase) => {
    const data = await getDocumentsByCaseId(idCase);
    console.log(data);
    setDocuments(data);
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
    fetchAlertData(idCase);
    fetchDocumentData(idCase);

  }, [idCase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCase = await updateCaseEvaluation(
        idCase,
        caseData.commentAnalyst,
        parseFloat(caseData.amount),
        fraudMotives.find(
          (motive) => motive.motiveFraudName === caseData.motiveFraudName
        )?.motiveFraudId,
        statuses.find((status) => status.statusName === caseData.statusName)
          ?.statusId
      );
      toast.success("Evaluación actualizada exitosamente");
      console.log("Actualización exitosa:", updatedCase);
      navigate(urlBase + "home");
    } catch (error) {
      console.error("Error actualizando la evaluación del caso:", error);
    }
  };

  const columnsControles = [
    {
      cell: () => <MdApps style={{ fill: "#43a047" }} />,
      width: "50px",
      style: {
        marginBottom: "-1px",
      },
    },
    {
      name: "Familia",
      selector: (row) => row.familyName,
      sortable: true,
    },
    {
      name: "codControl",
      selector: (row) => row.controlCode,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.controlName,
      sortable: true,
    },
    {
      name: "FecRegistro",
      selector: (row) => row.fecRegister,
      sortable: true,
    },
  ];
  const columnsDocuments = [
    {
      cell: () => <MdApps style={{ fill: "#43a047" }} />,
      width: "50px",
      style: {
        marginBottom: "-1px",
      },
    },
    {
      name: "Documento",
      selector: (row) => row.documentName,
      sortable: true,
    },
    {
      name: "Analista",
      selector: (row) => row.analystName,
      sortable: true,
    },
    {
      name: "FecRegistro",
      selector: (row) => row.fecRegistro,
      sortable: true,
    },
  ];

  return (
    <div className="mt-1">
      <form className="my-1" onSubmit={handleSubmit}>
        {/* #1 */}

        <div className=" flex flex-row gap-x-4">
          {/* #1.1 */}
          <div className="flex flex-col w-1/2 mt-5  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 ">
            <h1 className="text-1xl mb-3 md:text-4xl font-bold dark:text-gray-100">
              Evaluación | #Caso{" "}
              <span className="text-primary-100">{idCase}</span>
            </h1>

            <div>
              <div className="flex flex-wrap -mx-3 mb-6">
                {/* Empresa */}
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
                {/* Analista */}
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
                {/* Codigo Cliente */}
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
                {/* Nombre Cliente */}
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
                {/* Fecha Generacion */}
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
                {/* Fecha Ini Evaluacion */}
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
                {/* Monto */}
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-amount"
                  >
                    Monto
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-amount"
                    type="text"
                    value={caseData.amount || ""}
                    onChange={handleAmountChange}
                  />
                </div>
                {/* Motivo de Fraude */}
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-motivoFraude"
                  >
                    Motivo de Fraude
                  </label>
                  <select
                    className="appearance-none block w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-motivoFraude"
                    value={caseData.motiveFraudName || ""}
                    onChange={hanldeFraudMotiveChange}
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
                {/* Status */}
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-status"
                  >
                    Status
                  </label>
                  <select
                    className="appearance-none block w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                {/* Comentario Analista */}
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-ComentarioAnalista"
                  >
                    Comentario Analista
                  </label>
                  {/* <textarea
                    className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                    id="grid-ComentarioAnalista"
                    type="text"
                    // value={caseData.commentAnalyst || ""}{html}
                    onChange={handleCommentChange}
                  /> */}
                  <Editor containerProps={{ style: { resize: 'vertical' } }} value={caseData.commentAnalyst || ""} onChange={handleCommentChange} />
                </div>
              </div>
              {/* Botones */}
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
            </div>
          </div>
          {/* #2 */}
          <div className="flex flex-col w-1/2">
            {/* #1.2           */}
            <div className="mt-5 h-full  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700  ">
              <h1 className="text-1xl mb-3 md:text-2xl font-bold dark:text-gray-100">
                Controles
              </h1>

              <div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  
                  <DataTableBase
                  columns={columnsControles}
                  data={alerts}
                  paginationPerPage={10}
                />
                </div>
              </div>
            </div>

            {/* #2.1 */}
            <div className="mt-5 h-full  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700  ">
              <h5 className="text-1xl mb-3 md:text-2xl font-bold dark:text-gray-100">
                Documentos
              </h5>

              <div className="flex flex-wrap -mx-3 mb-6  ">
                <div
                  {...getRootProps()}
                  className={`p-6 border-2 text-center cursor-pointer w-full border-dashed rounded-md transition-colors ${
                    isDragActive
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 bg-gray-50 "
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-blue-600">Suelta los archivos aquí...</p>
                  ) : (
                    <p className="text-gray-600">
                      Arrastra y suelta archivos aquí, o haz clic para
                      seleccionar archivos
                    </p>
                  )}
                </div>
                <div className="w-full  mt-5 bg-white rounded-lg shadow-lg mb-5 ">
                  

                  <DataTableBase
                  columns={columnsDocuments}
                  data={documents}
                  selectableRows
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Evaluation;
