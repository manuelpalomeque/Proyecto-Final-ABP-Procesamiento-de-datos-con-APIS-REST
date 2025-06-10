import React from "react";

function Paginacion({ page, setPage, total, limite }) {
  const fin = page * limite;
  return (
    <section className="mb-4 ml-35">
    <div>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded">
        Anterior
      </button>
      <span className="mx-4 font-bold text-lg text-sky-500">Página {page}</span>
      <button disabled={fin >= total} onClick={() => setPage(page + 1)} className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded">
        Siguiente
      </button>
    </div>
    </section>
  );
}

export default Paginacion;