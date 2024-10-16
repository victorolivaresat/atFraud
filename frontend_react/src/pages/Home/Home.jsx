import { RiFileTextFill,RiAlarmWarningFill } from "react-icons/ri";
import 'flowbite';

const Home = () => {
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
        
        {/* Card 1 */}
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiAlarmWarningFill className="text-5xl" />
          <h4 className="text-2xl">Atendidas</h4>
          <span className="text-5xl text-white">235</span>
        </div>
      </section>
      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-1 mt-10 gap-8">
        
      
<div className="relative overflow-x-auto rounded-xl">
    
<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table id="search-table" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-2 py-1">
          <span className="flex items-center"></span>
        </th>
        <th scope="col" className="px-1 py-3">
          <span className="flex items-center">IDCASO</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="flex items-center">Codigo Cliente</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="flex items-center">Nombre Cliente</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="flex items-center">Dias</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="flex items-center">Fecha Registro</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="flex items-center">Control</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">1234</a></td>
        <td className="px-6 py-4">1001482860</td>
        <td className="px-6 py-4">Bernardino Elmer</td>
        <td className="px-6 py-4">2</td>
        <td className="px-6 py-4">2024-02-14 15:00</td>
        <td className="px-6 py-4">Concentracion IP - Registros</td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">7568</a></td>
        <td className="px-6 py-4">1001482862</td>
        <td className="px-6 py-4">Pedro Alexis</td>
        <td className="px-6 py-4">4</td>
        <td className="px-6 py-4">2024-02-14 15:03</td>
        <td className="px-6 py-4">DNI Correlativos</td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">6845</a></td>
        <td className="px-6 py-4">1001482863</td>
        <td className="px-6 py-4">Ysabel</td>
        <td className="px-6 py-4">72</td>
        <td className="px-6 py-4">2024-02-14 15:04</td>
        <td className="px-6 py-4">Concentracion IP - Registros</td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">1245</a></td>
        <td className="px-6 py-4">1001482864</td>
        <td className="px-6 py-4">Marco Antonio</td>
        <td className="px-6 py-4">1</td>
        <td className="px-6 py-4">2021-04-15 03:58</td>
        <td className="px-6 py-4">DNI Correlativos</td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">6987</a></td>
        <td className="px-6 py-4">1001482865</td>
        <td className="px-6 py-4">Jeniffer Sibel</td>
        <td className="px-6 py-4">8</td>
        <td className="px-6 py-4">2021-03-31 00:23</td>
        <td className="px-6 py-4">Concentracion IP - Login Error</td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4"><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
        <td className="px-1 py-4"><a className="font-medium text-red-600 hover:underline hover:text-red-400" href="/evaluacion">4567</a></td>
        <td className="px-6 py-4">1001482866</td>
        <td className="px-6 py-4">Lida Emelda</td>
        <td className="px-6 py-4">11</td>
        <td className="px-6 py-4">2023-08-21 23:45</td>
        <td className="px-6 py-4">DNI Correlativos</td>
      </tr>
    </tbody>
  </table>
</div>




</div>

      </section>
    </div>
  );
};

export default Home;
