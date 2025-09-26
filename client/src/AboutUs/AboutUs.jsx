import styles from './AboutUs.module.css';

function AboutUs(){
    return(
        <>
            <section id="nosotros" className={styles.sobreNosotros}>
                <h2>Sobre Nosotros</h2>
                <p>
                    En <strong>Hermanos Jota</strong> creemos que un mueble es mucho más que un objeto: 
                    es un legado que acompaña tu vida y cuenta una historia. Nuestro trabajo es el 
                    redescubrimiento de un arte que parecía olvidado: crear piezas que no solo cumplen 
                    una función, sino que también alimentan el alma.
                </p>
                <p>
                    Cada diseño nace en el cruce entre la herencia y la innovación, donde la calidez 
                    del optimismo de los años 60 se une con la conciencia sustentable del presente. 
                    Utilizamos materiales nobles y prácticas responsables, cuidando tanto la belleza 
                    de cada detalle como el futuro que compartimos.
                </p>
                <p>
                    Queremos que al elegir Hermanos Jota sientas la calidez de un tesoro familiar, 
                    la seguridad de la calidad artesanal y la emoción de llevar a tu hogar una pieza 
                    con carácter propio. Nuestros muebles no son solo compras: son parte de tu historia 
                    cotidiana y de la de quienes vendrán después.
                </p>
            </section>
        </>
    )
}

export default AboutUs