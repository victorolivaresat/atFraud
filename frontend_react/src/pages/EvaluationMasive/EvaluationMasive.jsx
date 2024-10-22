import { getCasesInEvaluation, updateCasesEvaluationMasive } from "../../api/caseApi";
import { getAllFraudMotives } from "../../api/fraudMotiveApi";
import { getAllStatuses } from "../../api/statusApi";
import { getAllAnalysts,getAnalyst } from "../../api/analystAPI";
import DataTableBase from "../../utils/DataTable";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdApps } from "react-icons/md";
import Editor from 'react-simple-wysiwyg';
import { toast } from "react-toastify";

const EvaluationMasive = () => {
  const urlBase = import.meta.env.VITE_URL_BASE;
  const [caseData, setCaseData] = useState([]);
  const userId = localStorage.getItem("userId");
  // const navigate = useNavigate();

  const [casesId, setCasesId] = useState([]);
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState("");
  const [fraudMotives, setFraudMotives] = useState([]);
  const [fraudMotive, setFraudMotive] = useState("");
  const [analysts, setAnalysts] = useState([]);
  const [analyst, setAnalyst] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancelClick = () => {
    // navigate(urlBase + "home");
    setAmount("") 
    setFraudMotive("")
    setStatus("")
    setComment("")
    getAnalystData()
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
  };

  const handleFraudMotiveChange = (e) => {
    setFraudMotive(e.target.value);    
  };

  const handleAnalystChange = (e) => {
    setAnalyst(e.target.value);    
  };
  const getAnalystData = async () => {
    const user = await getAnalyst(userId);
    setAnalyst(user.name);     
  };

  const fetchAnalystsData = async () => {
    const data = await getAllAnalysts();
    setAnalysts(data);     
  };

  const fetchStatusesData = async () => {
    const data = await getAllStatuses();    
    setStatuses(data);
  };
 
  const fetchFraudMotivesData = async () => {
    const data = await getAllFraudMotives();    
    setFraudMotives(data);
  };
  const fetchCaseData = async (userId) => {
    try {
      const data = await getCasesInEvaluation(userId);      
      setCaseData(data);
    } catch (error) {
      console.error("Error fetching case data:", error);
    }
  };

  useEffect(() => {   
    fetchCaseData(userId);
    fetchStatusesData();
    fetchFraudMotivesData(); 
    fetchAnalystsData();
    getAnalystData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (casesId.length === 0) {
      toast.error("Debe seleccionar al menos un caso");
      return;
    }

    try {
      console.log(casesId);
      console.log("Comentario",comment);
      let parseAmount = parseFloat(amount.replace(/[^\d.-]/g, ''))

      console.log({
        casesId: typeof casesId,
        comment: typeof comment,
        parseAmount: typeof parseAmount,
        fraudMotive: typeof fraudMotive,
        status: typeof status,
        analyst: typeof analyst,
      });


      const updatedCase = await updateCasesEvaluationMasive(
        casesId.join(","),
        comment,
        parseAmount,
        fraudMotives.find(
          (motive) => motive.motiveFraudName === fraudMotive
        )?.motiveFraudId,
        statuses.find((s) => s.statusName === status)
          ?.statusId,
        analysts.find((a) => a.name === analyst)?.analystId 
      );
      toast.success("Todos los casos fueron actualizados exitosamente");
      console.log("Casos Masivos actualizados:", updatedCase);
      // navigate(urlBase + "home");
    } catch (error) {
      console.error("Error actualizando los casos seleccionados:", error);
    }
  };

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
      selector: (row) => <a
      className="font-medium text-red-600 hover:underline hover:text-red-400"
      href={urlBase + "evaluation/" + row.caseId}
      target="_blank"
    >
      {row.caseId}
    </a>,
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

  // Filtro de datos basado en el término de búsqueda
  const filteredData = caseData.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase())||
      item.caseId.toLowerCase().includes(searchTerm.toLowerCase())||
      item.externalId.toLowerCase().includes(searchTerm.toLowerCase())||
      item.numCase.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleChange = ({ selectedRows }) => {
    // console.log("Selected Rows: ", selectedRows);
    const cases = selectedRows.map((row) => row.caseId);
    setCasesId(cases);
    console.log("Casos Seleccionados: ", cases);
    return cases;
  };

  return (
    <div>
      <form className="my-1" onSubmit={handleSubmit}>
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
                    placeholder="Agregar Monto"
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
                    <option key="-1" value="">
                      Seleccione un motivo
                    </option>
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
                    <option key="-1" value="" >
                      Seleccione un motivo
                    </option>
                    {statuses.map((s) => (
                      <option key={s.statusId}
                        value={s.statusName}
                      >
                        {s.statusName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Status */}
                <div className="w-full md:w-1/3 px-3 mt-4">
                  <label
                    className="block uppercase tracking-wide dark:text-gray-50 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-status"
                  >
                    Analistas
                  </label>
                  <select
                    className="appearance-none block w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-status"
                    value={analyst || ""}
                    onChange={handleAnalystChange}
                  >
                    {analysts.map((a) => (
                      <option key={a.analystId}
                        value={a.name}
                      >
                        {a.name}
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
                  Limpiar
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
                selectableRows
                paginationPerPage={10}
                onSelectedRowsChange={handleChange}
              />
            </div>
          </div>
        </section>

      </form>
    </div>
  );
};

export default EvaluationMasive;