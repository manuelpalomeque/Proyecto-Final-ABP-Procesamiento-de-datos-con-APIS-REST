// Puedes pegar este componente en un archivo, por ejemplo Content.jsx

function Content() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <img
              alt="baner ISPC"
              className="object-cover object-center h-full w-full"
              src="\public\banner.png"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full overflow-hidden inline-flex items-center justify-center">
                <img
                    alt="Foto"
                    className="w-full h-full object-cover"
                    src="\public\foto.jpg"
                    />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-white text-lg">
                  Palomeque Jonathan Manuel
                </h2>
                <div className="w-12 h-1 bg-sky-500 rounded mt-2 mb-4"></div>
                <a href="https://github.com/manuelpalomeque" target="_blank" >
                    Github
                    </a>
                <p className="text-base text-gray-400">
                    Año: 2025    
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1 className= " text-3xl text-blue-600 font-bold"> Evidencia n° 1 - Proyecto Integrador</h1>
              <p className="leading-relaxed text-lg mb-4">
                Instituto Superior Politecnico Córdoba <br/>
                Profesor: Garcia, Hector
                </p>
        
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;