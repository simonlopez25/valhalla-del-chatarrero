import './HistorySection.css';
import wasteland from '../../assets/img/Wasteland.webp';
import seal from '../../assets/img/seal.png';
function HistorySection() {
  return (
    <section className="historyComp">
      <h1>NUESTRA HISTORIA</h1>
      <p className="historyDate">50 AÑOS DE SANGRE, SUDOR Y ÓXIDO</p>

      <p className="historyText">
        El colapso no fue un evento único, fue un desgarro lento y doloroso.
        Las fábricas se silenciaron, los cielos se tiñeron del color de la
        sangre seca, y la producción, tal como la conocíamos, cesó. En el
        Valhalla del Chatarrero, no lloramos por el mundo perdido;
        reconstruimos sobre sus cadáveres de acero. Hace cinco décadas, los
        primeros Recolectores entendieron una verdad fundamental: la
        supervivencia no está en crear, sino en recuperar.
      </p>

      <p className="historyText">
        Nuestra filosofía es brutalmente simple. Cada pieza de engranaje,
        cada máscara de gas filtrada, cada bota de cuero reseco tiene un
        linaje. Han sobrevivido al fuego, a las tormentas ácidas y al
        tiempo. Nosotros no fabricamos; nosotros rescatamos, reparamos y
        reforzamos. El óxido no es deterioro, es una cicatriz de honor.
      </p>
<figure className="archiveImage">
  <span className="archiveCorner archiveCornerTopLeft"></span>
  <span className="archiveCorner archiveCornerTopRight"></span>
  <span className="archiveCorner archiveCornerBottomLeft"></span>
  <span className="archiveCorner archiveCornerBottomRight"></span>
  <img src={wasteland} alt="Primeras rutas de recolección" />
  <div className="archiveImageLabel">ARCHIVE 091 - THE JUNK ROAD</div>
  <figcaption>SECTOR 4: LAS PRIMERAS RUTAS DE RECOLECCIÓN (AÑO 12)</figcaption>
</figure>

  <blockquote className="historyQuote">
  <p>
    "No confiamos en lo nuevo. Lo nuevo se rompe. Confiamos en lo que
    ya ha sobrevivido al fin del mundo."
  </p>
  <span className="historyQuoteAuthor">— EL FUNDADOR, AÑO 05</span>
</blockquote>

      <p className="historyText">
        Detrás de cada artículo en nuestra vitrina hay una historia forjada
        en la crudeza del páramo. El cuero endurecido lleva la memoria de
        mil pasos por tierra agrietada. Los filtros de carbono aún guardan
        el polvo de las Grandes Tormentas. Aquí, en el Valhalla, creemos que
        lo que está roto puede ser letalmente hermoso de nuevo. Somos los
        custodios del remanente.
      </p>

      <p className="historyText">
        Nuestros usuarios no son clientes; son supervivientes. Únete a la
        cadena de recuperación. Porque mientras haya chatarra, habrá
        esperanza.
      </p>
       <img src={seal} alt="Sello de aprobado" className="approvalSeal" />
    </section>
  );
}

export default HistorySection;