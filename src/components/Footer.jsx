function Footer() {
  return (
    <footer className="footer">
      <div className="seccion-contenido seccion-contenido-ancha">
        <div className="footer-identidad">
          <span className="footer-marca">Indupark SAS</span>
          <p className="footer-tagline">
            Parque logístico y comercial — Ruta 38, Río Chico, Tucumán
          </p>
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} Indupark SAS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
