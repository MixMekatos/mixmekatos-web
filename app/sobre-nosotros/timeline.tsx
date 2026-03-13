import Image from "next/image";

interface Hito {
    year?: string;
    title: string;
    description?: string;
    image?: string;
}
const hitos: Hito[] = [
    {
        year: "2015",
        title: "El inicio en la cocina de casa",
        description: "Con una pequeña mesa y el sueño de compartir el sabor auténtico de la abuela, comenzamos a freír las primeras empanadas que conquistarían a los vecinos.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYB0eGrVE-6FwOnVKcXKAA2MnTzht8kcpngoLZSQeLqIaB8Q2UvvTRGM0Wa_HIdAxEldLQY_knEd1lTvqS4tQpgSG6GUhoDOGJllgi0woRLD1ACdlVOXWraUd_EDFHO_OhU80-aDlIPGHKPtZjd0-d2sGUI-9PvCKH3ERGKpuqGgUwO8eIX9qnHWYhZOwNgtb8I1qOIFLP722rhgbUDLzu2_ZeBRf1gcm5KtiSWb6TNfI3ADg0r_bz104gJJMcxv7CcTpEm3U__ZH",
    },
    {
        year: "2018",
        title: "Nuestra primera sede física",
        description: "Abrimos las puertas de nuestro primer local en el corazón de Medellín. Un espacio diseñado para honrar nuestras raíces y recibir a la familia MixMekatos.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaxWVZ7c7tlIgmv2d22BhKxl83Kpt0I5ApVaZ1EVOon-SMQf8nJxiQNlJj9GpfyKp1RPhbyZ_yVqSdDTBrpPSF_d_z8_-ijvnRFHUiujZo8hq3SAfx2RlWyttRYoVgqDfvTZ9PmVXQqKjuE0ONpPXwS_mIwDO230IiKISGjfmGx9-JVGAplUppV7Zh4WGceP4QdsoETCYf6tlSgxuqh3GnF3wxqsqdHXD6c8x7_Oq1sqE9ZVGLJvVTGBzKoN67ylqkJm7gwqHthPiS",
    },
    {
        year: "2021",
        title: "Expansión a tres ciudades",
        description: "La receta viajó a Medellín, Cali y Barranquilla. El sabor de la abuela ahora es de todos.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9eMWZ7owy0io3T7kHlXGA7gXLTkd29-VsotW_SNGDmtwbp_MyTEN0g_dgb0WbALQO5Y8ynzKwYw5F8V_p7CNhKFzmiWAxE2QH0s0my0ImXcA3FT8YyESRHsK5QZbHi4H_TOEDuP82DR-b_63XL-hRr9QA25VSzKNvNDmoAczsyClWECkI4RZN12Rs3iLiPjcjExKjgqKA7BZ6VC_JJ1SEEOgjQsoQuFDwZ8odN4a1ubjByBpmsrer0Fc181LoUE7-yWG3d6wzw7rw",
    },
    {
        year: "2024",
        title: "Más allá de Medellín",
        description: "Con un equipo sólido y procesos perfeccionados, llevamos nuestra tradición a nuevos horizontes, manteniendo siempre la calidad que nos define.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoGqaP7hkx0YjqVgvA0v-T9cIKCQz1UAzJtvwuals07AmROhXJ-kMJRPDvQYni9Dt7jg1n_gaYMdpDTCAwXwZqSXOT6DBtmb6rMU5iPaakPezoe1pKDDIjsUKSdPIGAwYUxbBhlbjLf-LnvAqQIynTRJeKQx2RYoOn3afq6di06RikEYd6lV4eGqbxDrfN7wj9TgMyYOMXjXshvgz0PhTeoNzL5AHySTB91wHpqdDjR1q59-az9hIGAVGvD5ovR-IDsIYPXDnk7DTu",
    },
];

export default function Timeline() {
    return (
        <div className="max-w-4xl mx-auto text-center pt-40 px-4">
            <h1 className="text-3xl">Un camino de sabor</h1>

            <div className="mt-16 flex flex-col">
                {hitos.map((hito, i) => {
                    const esImpar = i % 2 === 0;

                    return (
                        <div key={hito.year} className="grid grid-cols-[1fr_48px_1fr] items-start">

                            {/* Columna izquierda */}
                            <div className="flex pr-6 pb-12 h-full items-center">
                                {esImpar ? (
                                    <Card year={hito.year} title={hito.title} description={hito.description} />
                                ) : (
                                    <Imagen title={hito.title} image={hito.image} />
                                )}
                            </div>

                            {/* Línea central */}
                            <div className="flex flex-col items-center h-full">
                                <div className="w-px flex-1 bg-slate-200 min-h-6" />
                                <div className="w-3 h-3 rounded-full bg-accent border-2 border-white ring-1 ring-bar mt-4 shrink-0" />
                                <div className="w-px flex-1 bg-slate-200 min-h-16" />
                            </div>

                            {/* Columna derecha */}
                            <div className="flex pl-6 pb-12 h-full items-center">
                                {esImpar ? (
                                    <Imagen title={hito.title} image={hito.image} />
                                ) : (
                                    <Card year={hito.year} title={hito.title} description={hito.description} />
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Card({ year, title, description }: Hito) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-left">
            <p className="text-bar font-semibold text-2xl mb-1">{year}</p>
            <h2 className="font-semibold text-lg mb-2">{title}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
    );
}

function Imagen({ title, image }: Hito) {
    return (
        <Image
            src={image}
            alt={title}
            width={400}
            height={240}
            className="rounded-xl object-cover w-full h-65 shadow-sm"
        />
    );
}