import { NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/mapa', label: 'Mapa' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-marca">Indupark SAS</span>
      <div className="navbar-links">
        {enlaces.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `link-texto navbar-link${isActive ? ' navbar-link-activo' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
