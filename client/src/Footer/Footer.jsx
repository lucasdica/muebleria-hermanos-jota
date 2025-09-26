import styles from './footer.module.css';

function Footer(){
    return(
        <>
            <footer>
                <div className={styles.footerContainer}>
                    {/* <!-- Info principal --> */}
                    <div className={styles.footerSection}>
                        <h3>Hermanos Jota — Casa Taller</h3>
                        <p>Av. San Juan 2847</p>
                        <p>C1232AAB — Barrio de San Cristóbal</p>
                        <p>Ciudad Autónoma de Buenos Aires, Argentina</p>

                        <h4>Horarios</h4>
                        <p>Lunes a Viernes: 10:00 - 19:00</p>
                        <p>Sábados: 10:00 - 14:00</p>
                    </div>

                    {/* <!-- Contacto --> */}
                    <div id="contacto" className={styles.footerSection}>
                        <h3>Contacto</h3>
                        <p>WhatsApp: <a href="https://wa.me/541145678900" target="_blank">+54 11 4567-8900</a></p>
                        <p>Email general: <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a></p>
                        <p>Ventas: <a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a></p>
                        <p>Sitio web: <a href="https://www.hermanosjota.com.ar" target="_blank">www.hermanosjota.com.ar</a></p>
                        <p>Instagram: <a href="https://instagram.com/hermanosjota_ba" target="_blank">@hermanosjota_ba</a></p>
                    </div>
                </div>
                <p className={styles.copyright}>© 2025 Hermanos Jota. Todos los derechos reservados.</p>
            </footer>
        </>
    )
}

export default Footer