import { useState } from 'react'
import { motion } from 'framer-motion'

const CENTRO = { x: 190, y: 320 }

const destinos = [
  {
    id: 'aguilares',
    nombre: 'Aguilares',
    km: 6,
    x: 255,
    y: 232,
    curva: 'M190,320 C195,285 218,256 246,240',
    relleno: false,
  },
  {
    id: 'alberdi',
    nombre: 'Alberdi',
    km: 7,
    x: 265,
    y: 395,
    curva: 'M190,320 C202,352 228,378 256,390',
    relleno: false,
  },
  {
    id: 'concepcion',
    nombre: 'Concepción',
    km: 16,
    x: 250,
    y: 165,
    curva: 'M190,320 C182,252 206,200 240,174',
    relleno: true,
  },
  {
    id: 'lacocha',
    nombre: 'La Cocha',
    km: 27,
    x: 265,
    y: 455,
    curva: 'M190,320 C186,378 216,428 256,449',
    relleno: false,
  },
  {
    id: 'tucuman',
    nombre: 'Tucumán',
    km: 90,
    x: 400,
    y: 75,
    aeropuerto: true,
    curva: 'M190,320 C292,286 366,190 396,90',
    relleno: true,
  },
  {
    id: 'lastermas',
    nombre: 'Las Termas',
    km: 100,
    x: 430,
    y: 310,
    aeropuerto: true,
    curva: 'M190,320 C268,338 348,328 420,312',
    relleno: true,
  },
  {
    id: 'catamarca',
    nombre: 'Catamarca',
    km: 120,
    x: 215,
    y: 555,
    aeropuerto: true,
    curva: 'M190,320 C156,412 168,498 210,544',
    relleno: true,
  },
  {
    id: 'santiago',
    nombre: 'Santiago',
    km: null,
    x: 500,
    y: 480,
    aeropuerto: true,
    curva: 'M190,320 C288,388 392,446 490,473',
    relleno: true,
  },
]

// Pin tipo gota con la punta en el origen del grupo
const FORMA_PIN = 'M0,0 C-2,-7 -8,-8.5 -8,-14 A8,8 0 1,1 8,-14 C8,-8.5 2,-7 0,0 Z'

function Pin({ relleno }) {
  if (relleno) {
    return (
      <>
        <path d={FORMA_PIN} fill="#ffffff" />
        <circle cx="0" cy="-14" r="3" fill="var(--color-fondo)" />
      </>
    )
  }
  return (
    <>
      <path d={FORMA_PIN} fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="0" cy="-14" r="2.5" fill="#ffffff" />
    </>
  )
}

function MapaDistancias() {
  const [activo, setActivo] = useState(null)

  return (
    <svg
      className="mapa-distancias"
      viewBox="0 0 720 620"
      role="group"
      aria-label="Distancias desde Indupark a las ciudades cercanas"
    >
      {/* Rutas punteadas de base */}
      {destinos.map(({ id, curva }) => (
        <path
          key={`base-${id}`}
          d={curva}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.6"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
      ))}

      {/* Ruta resaltada al hacer hover */}
      {destinos.map(({ id, curva }) => (
        <motion.path
          key={`ruta-${id}`}
          d={curva}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: activo === id ? 1 : 0, opacity: activo === id ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      ))}

      {/* Centro: Indupark */}
      <g>
        <motion.circle
          cx={CENTRO.x}
          cy={CENTRO.y}
          r="16"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <circle cx={CENTRO.x} cy={CENTRO.y} r="16" fill="#ffffff" />
        <circle cx={CENTRO.x} cy={CENTRO.y} r="6" fill="var(--color-fondo)" />
        <text className="mapa-centro-nombre" x={CENTRO.x} y={CENTRO.y + 44} textAnchor="middle">
          Indupark
        </text>
      </g>

      {/* Destinos */}
      {destinos.map((destino) => {
        const { id, nombre, km, x, y, aeropuerto, relleno } = destino
        const esActivo = activo === id
        const textoBadge = km !== null ? `${km} km` : 'Aeropuerto'
        const anchoBadge = textoBadge.length * 9 + 26

        return (
          <motion.g
            key={id}
            className="mapa-lugar"
            tabIndex={0}
            role="img"
            aria-label={km !== null ? `${nombre}: a ${km} km de Indupark` : `${nombre}: aeropuerto`}
            onPointerEnter={() => setActivo(id)}
            onPointerLeave={() => setActivo(null)}
            onFocus={() => setActivo(id)}
            onBlur={() => setActivo(null)}
            animate={{ opacity: activo && !esActivo ? 0.35 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.g
              transform={`translate(${x}, ${y})`}
              animate={{ scale: esActivo ? 1.18 : 1 }}
              transition={{ duration: 0.25 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
            >
              <Pin relleno={relleno} />
            </motion.g>

            <text className="mapa-lugar-nombre" x={x + 17} y={y - 10} dominantBaseline="middle">
              {nombre}
              {aeropuerto && <tspan dx="9">✈</tspan>}
            </text>

            {/* Badge con la distancia */}
            <motion.g
              initial={false}
              animate={{ opacity: esActivo ? 1 : 0, y: esActivo ? 0 : 8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ pointerEvents: 'none' }}
            >
              <rect
                x={x - anchoBadge / 2}
                y={y - 66}
                width={anchoBadge}
                height="28"
                rx="14"
                fill="#ffffff"
              />
              <text
                className="mapa-badge-texto"
                x={x}
                y={y - 47}
                textAnchor="middle"
              >
                {textoBadge}
              </text>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}

export default MapaDistancias
