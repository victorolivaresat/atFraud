import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import LoaderDataTable from "./LoaderDataTable";



const DataTableBase = (props) => {
  const sortIcon = <IoIosArrowDown />;
  const [pending, setPending] = useState(true);

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DataTable
      sortIcon={sortIcon}
      highlightOnHover
      pointerOnHover
      responsive
      progressPending={pending}
      progressComponent={<LoaderDataTable />}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
      {...props}
    />
  );
}

export default DataTableBase;
