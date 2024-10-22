import {
  getDocumentsByCaseId,
  addDocumentToCase,
  deleteDocumentById,
} from "../../api/documentApi";
import { getCaseById, updateCaseEvaluation } from "../../api/caseApi";
import { getAllFraudMotives } from "../../api/fraudMotiveApi";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAlertsByCaseId } from "../../api/alertApi";
import { getAllStatuses } from "../../api/statusApi";
import DataTableBase from "../../utils/DataTable";
import { useDropzone } from "react-dropzone";
import Editor from "react-simple-wysiwyg";
import { FaTrash } from "react-icons/fa";
import { MdApps } from "react-icons/md";
import { toast } from "react-toastify";

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

  const [fraudMotives, setFraudMotives] = useState([]);
  const [documents, setDocuments] = useState([]);
  const urlBase = import.meta.env.VITE_URL_BASE;
  const [statuses, setStatuses] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  const [idDocument, setIdDocument] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast.error("No se seleccionaron archivos.");
        return;
      }

      try {
        for (let i = 0; i < acceptedFiles.length; i++) {
          const formData = new FormData();

          formData.append("document", acceptedFiles[i]);
          formData.append("caseId", idCase);
          formData.append("flgEvaluation", true);
          formData.append("analystId", 1);

          console.log("formData caseId:", formData.get("caseId"));
          console.log("formData flgEvaluation:", formData.get("flgEvaluation"));
          console.log("formData analystId:", formData.get("analystId"));
          console.log("formData document:", acceptedFiles[i].name);

          const response = await addDocumentToCase(formData);
          console.log("Documento subido:", response.data);
        }

        toast.success("Todos los documentos se han subido exitosamente");

        fetchDocumentData(idCase);
      } catch (error) {
        toast.error("Error subiendo los documentos");
        console.error("Error subiendo los documentos:", error);
      }
    },
    [idCase]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancelClick = () => {
    navigate(urlBase + "home");
  };

  const handleCommentChange = (e) => {
    setCaseData({ ...caseData, commentAnalyst: e.target.value });
  };

  const handleFraudMotiveChange = (e) => {
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
    setAlerts(data);
  };

  const fetchDocumentData = async (idCase) => {
    const data = await getDocumentsByCaseId(idCase);
    setDocuments(data);
  };

  const fetchCaseData = async (idCase) => {
    const data = await getCaseById(idCase);
    setCaseData(data);
  };

  const fetchStatusesData = async () => {
    const data = await getAllStatuses();
    setStatuses(data);
  };

  const fetchFraudMotivesData = async () => {
    const data = await getAllFraudMotives();
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
      console.log("Caso actualizado:", updatedCase);
      navigate(urlBase + "home");
    } catch (error) {
      console.error("Error actualizando la evaluación del caso:", error);
    }
  };

  const columnsControls = [
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

  const handleChangeDocuments = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);

    const data = selectedRows.map((row) => row.documentId);
    console.log("Data: ", data);
    setIdDocument(data);
  };

  const handleDeleteDocuments = async (e, documentIds) => {
    e.preventDefault();

    console.log("Document IDs: ", documentIds);

    if (!(documentIds && documentIds.length > 0)) {
      toast.error("Selecciona al menos un documento para eliminar");
      return;
    }

    try {
      for (const documentId of documentIds) {
        await deleteDocumentById(documentId);
      }
      toast.success("Documentos eliminados exitosamente");

      if (typeof idCase !== "undefined") {
        fetchDocumentData(idCase);
      } else {
        console.warn("idCase no está definido");
      }
    } catch (error) {
      toast.error("Error eliminando los documentos");
      console.error("Error eliminando los documentos:", error);
    }
  };

  return (
    <div className="mt-1">
      <form className="my-1" onSubmit={handleSubmit}>
        <div className=" flex flex-row gap-x-4">
          <div className="flex flex-col w-1/2 mt-5  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 ">
            <h1 className="text-1xl mb-3 md:text-4xl font-bold dark:text-gray-100">
              Evaluación | #Caso{" "}
              <span className="text-primary-100 dark:text-blue-400">
                {idCase}
              </span>
            </h1>

            <div>
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
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-amount"
                    type="number"
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
                    className="appearance-none block w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-motivoFraude"
                    value={caseData.motiveFraudName || ""}
                    onChange={handleFraudMotiveChange}
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
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-ComentarioAnalista"
                  >
                    Comentario Analista
                  </label>
                  <Editor
                    containerProps={{
                      style: {
                        resize: "vertical",
                        height: "350px",
                        overflow: "auto",
                      },
                      className: "dark:text-gray-700 dark:bg-gray-100",
                    }}
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
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mt-5 h-full  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700  ">
              <h1 className="text-1xl mb-3 md:text-2xl font-bold dark:text-gray-100">
                Controles
              </h1>

              <div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <DataTableBase
                    columns={columnsControls}
                    data={alerts}
                    paginationPerPage={10}
                  />
                </div>
              </div>
            </div>

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
                <div className="w-full mt-5 bg-white rounded-lg shadow-lg mb-5">
                  <div className="flex justify-end p-6">
                    <button
                      className="text-red-400 hover:text-red-700 focus:outline-none"
                      onClick={(e) => {
                        handleDeleteDocuments(e, idDocument);
                      }}
                    >
                      <FaTrash size={24} />
                    </button>
                  </div>
                  <DataTableBase
                    columns={columnsDocuments}
                    data={documents}
                    selectableRows
                    onSelectedRowsChange={handleChangeDocuments}
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
