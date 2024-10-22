import { getCasesInEvaluation } from "../../api/caseApi";
import { getAllFraudMotives } from "../../api/fraudMotiveApi";
import { getAllStatuses } from "../../api/statusApi";
import DataTableBase from "../../utils/DataTable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdApps } from "react-icons/md";
import Editor from 'react-simple-wysiwyg';

const EvaluationMasive = () => {
  const urlBase = import.meta.env.VITE_URL_BASE;
  const [caseData, setCaseData] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState("");
  const [fraudMotives, setFraudMotives] = useState([]);
  const [fraudMotive, setFraudMotive] = useState("");

  

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancelClick = () => {
    navigate(urlBase + "home");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAmountChange = (e) => {
    let inputValue = e.target.value;

    // Eliminar cualquier carácter que no sea numérico
    //inputValue = inputValue.replace(/\D/g, "");

    // Formatear para añadir la coma de miles y el punto decimal
    inputValue = inputValue
      .replace(/\D/g, "")
      .replace(/([0-9])([0-9]{2})$/, '$1.$2')  // Añadir el punto decimal para los centavos
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");  // Añadir la coma de miles

      setAmount(`S/${inputValue}`); 
  };  

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleFraudMotiveChange = (e) => {
    setFraudMotive(e.target.value);
    console.log(e.target.value);
  };


  const fetchStatusesData = async () => {
    const data = await getAllStatuses();
    // console.log(data);
    setStatuses(data);
  };
 
  const fetchFraudMotivesData = async () => {
    const data = await getAllFraudMotives();
    console.log(data);
    setFraudMotives(data);
  };
  const fetchCaseData = async (userId) => {
    try {
      const data = await getCasesInEvaluation(userId);
      console.log("Data:")
      // console.log(data);
      setCaseData(data);
    } catch (error) {
      console.error("Error fetching case data:", error);
    }
  };

  useEffect(() => {   
    fetchCaseData(userId);
    fetchStatusesData();
    fetchFraudMotivesData(); 
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
      selector: (row) => row.caseId,
      sortable: true,
    },
    {
      name: "NUMCASO",
      selector: (row) => row.numCase,
      sortable: true,
    },
    {
      name: "Cod. Cliente",
      selector: (row) => row.externalId,
      sortable: true,
    },
    {
      name: "NumDoc",
      selector: (row) => row.documentNumber,
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

  return (
    <div>
      <form className="my-1"
      // onSubmit={handleSubmit}
      >
        {/* #1 */}

        <div className=" flex flex-row gap-x-4">
          {/* #1.1 */}
          <div className="flex flex-col w-1/2 mt-5  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 ">
            <h1 className="text-1xl mb-3 md:text-4xl font-bold dark:text-gray-100">
              Evaluación Masiva
            </h1>

            <div>
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
                    value={amount  || ""}
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
                    value={fraudMotive  || ""}
                    onChange={handleFraudMotiveChange}
                  >
                    {fraudMotives.map((f) => (
                      <option
                        key={f.motiveFraudId}
                        value={f.motiveFraudName}
                      >
                        {f.motiveFraudName}
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
                    value={status || ""}
                    onChange={handleStatusChange}
                  >
                    {statuses.map((s) => (
                      <option key={s.statusId}
                        value={s.statusName}
                      >
                        {s.statusName}
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
                  <Editor containerProps={{ style: { resize: 'vertical', height: '200px', overflow: 'auto' } }}
                    value={comment || ""}
                    onChange={handleCommentChange} />
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

            {/* #2.1 Documentos*/}
            <div className="mt-5 h-full  p-8 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700  ">
              <h5 className="text-1xl mb-3 md:text-2xl font-bold dark:text-gray-100">
                Documentos
              </h5>

              <div className="flex flex-wrap -mx-3 mb-6  ">
                <div
                  {...getRootProps()}
                  className={`p-6 border-2 text-center cursor-pointer w-full border-dashed rounded-md transition-colors ${isDragActive
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
              </div>
            </div>
          </div>
        </div>
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

      </form>
    </div>
  );
};

export default EvaluationMasive;